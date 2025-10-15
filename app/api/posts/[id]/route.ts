/**
 * Individual Post API Routes
 * GET - Get post by ID
 * PUT - Update post
 * DELETE - Delete post
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdminOrEditor } from '@/lib/utils/auth';
import { postFormSchema } from '@/lib/validations/post';
import { slugify } from '@/lib/utils/slugify';
import { createAuditLog } from '@/lib/utils/audit';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('GET /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await requireAdminOrEditor();
    const { id } = await params;

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = postFormSchema.parse(body);

    // Generate new slug if title changed
    let slug = existingPost.slug;
    if (validatedData.title !== existingPost.title) {
      const baseSlug = slugify(validatedData.title);
      const existingSlugs = await prisma.post.findMany({
        where: {
          slug: { startsWith: baseSlug },
          id: { not: id },
        },
        select: { slug: true },
      });

      slug = baseSlug;
      let counter = 1;
      while (existingSlugs.some((p: { slug: string }) => p.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Determine if status changed to PUBLISHED
    const wasPublished = existingPost.status === 'PUBLISHED';
    const isNowPublished = validatedData.status === 'PUBLISHED';
    const shouldSetPublishedAt = !wasPublished && isNowPublished;

    const post = await prisma.post.update({
      where: { id },
      data: {
        title: validatedData.title,
        slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        status: validatedData.status,
        publishedAt: shouldSetPublishedAt
          ? new Date()
          : existingPost.publishedAt,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: shouldSetPublishedAt ? 'PUBLISH' : 'UPDATE',
      entity: 'Post',
      entityId: post.id,
      metadata: { title: post.title, status: post.status },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (
      error instanceof Error &&
      error.message.includes('Forbidden')
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('PUT /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const user = await requireAdminOrEditor();
    const { id } = await params;

    const existingPost = await prisma.post.findUnique({ where: { id } });
    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({ where: { id } });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'DELETE',
      entity: 'Post',
      entityId: id,
      metadata: { title: existingPost.title },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (
      error instanceof Error &&
      error.message.includes('Forbidden')
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error('DELETE /api/posts/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
