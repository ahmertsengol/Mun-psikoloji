/**
 * Posts API Routes
 * GET - List all posts
 * POST - Create new post
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdminOrEditor } from '@/lib/utils/auth';
import { postFormSchema } from '@/lib/validations/post';
import { slugify } from '@/lib/utils/slugify';
import { createAuditLog } from '@/lib/utils/audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    const where: { status?: 'DRAFT' | 'PUBLISHED'; type?: 'NEWS' | 'ANNOUNCEMENT'; OR?: { title?: { contains: string; mode: 'insensitive' }; excerpt?: { contains: string; mode: 'insensitive' }; content?: { contains: string; mode: 'insensitive' } }[] } = {};

    if (status) {
      where.status = status as 'DRAFT' | 'PUBLISHED';
    }

    if (type) {
      where.type = type as 'NEWS' | 'ANNOUNCEMENT';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } },
      ];
    }

    const posts = await prisma.post.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('GET /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAdminOrEditor();

    const body = await request.json();
    const validatedData = postFormSchema.parse(body);

    // Generate slug from title
    const baseSlug = slugify(validatedData.title);
    const existingSlugs = await prisma.post.findMany({
      where: { slug: { startsWith: baseSlug } },
      select: { slug: true },
    });

    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.some((p: { slug: string }) => p.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create post
    const post = await prisma.post.create({
      data: {
        title: validatedData.title,
        slug,
        content: validatedData.content,
        excerpt: validatedData.excerpt,
        coverImage: validatedData.coverImage || null,
        type: validatedData.type || 'NEWS',
        status: validatedData.status,
        publishedAt:
          validatedData.status === 'PUBLISHED' ? new Date() : null,
        authorId: user.id,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'CREATE',
      entity: 'Post',
      entityId: post.id,
      metadata: { title: post.title, status: post.status },
    });

    return NextResponse.json(post, { status: 201 });
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
    console.error('POST /api/posts error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
