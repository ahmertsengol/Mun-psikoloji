/**
 * Individual Event API Routes
 * GET - Get event by ID
 * PUT - Update event
 * DELETE - Delete event
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdminOrEditor } from '@/lib/utils/auth';
import { eventFormSchema } from '@/lib/validations/event';
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
    const event = await prisma.event.findUnique({
      where: { id },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('GET /api/events/[id] error:', error);
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

    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    const body = await request.json();
    const validatedData = eventFormSchema.parse(body);

    // Generate new slug if title changed
    let slug = existingEvent.slug;
    if (validatedData.title !== existingEvent.title) {
      const baseSlug = slugify(validatedData.title);
      const existingSlugs = await prisma.event.findMany({
        where: {
          slug: { startsWith: baseSlug },
          id: { not: id },
        },
        select: { slug: true },
      });

      slug = baseSlug;
      let counter = 1;
      while (existingSlugs.some((e: { slug: string }) => e.slug === slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        title: validatedData.title,
        slug,
        description: validatedData.description,
        startsAt: new Date(validatedData.startsAt),
        endsAt: validatedData.endsAt ? new Date(validatedData.endsAt) : null,
        location: validatedData.location,
        status: validatedData.status,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action:
        existingEvent.status !== 'PUBLISHED' &&
        validatedData.status === 'PUBLISHED'
          ? 'PUBLISH'
          : 'UPDATE',
      entity: 'Event',
      entityId: event.id,
      metadata: { title: event.title, status: event.status },
    });

    return NextResponse.json(event);
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
    console.error('PUT /api/events/[id] error:', error);
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

    const existingEvent = await prisma.event.findUnique({ where: { id } });
    if (!existingEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    await prisma.event.delete({ where: { id } });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'DELETE',
      entity: 'Event',
      entityId: id,
      metadata: { title: existingEvent.title },
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
    console.error('DELETE /api/events/[id] error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
