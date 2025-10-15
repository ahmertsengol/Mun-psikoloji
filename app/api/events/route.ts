/**
 * Events API Routes
 * GET - List all events
 * POST - Create new event
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { requireAdminOrEditor } from '@/lib/utils/auth';
import { eventFormSchema } from '@/lib/validations/event';
import { slugify } from '@/lib/utils/slugify';
import { createAuditLog } from '@/lib/utils/audit';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: { status?: 'DRAFT' | 'PUBLISHED'; OR?: { title?: { contains: string; mode: 'insensitive' }; description?: { contains: string; mode: 'insensitive' }; location?: { contains: string; mode: 'insensitive' } }[] } = {};

    if (status) {
      where.status = status as 'DRAFT' | 'PUBLISHED';
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startsAt: 'desc' },
    });

    return NextResponse.json({ events });
  } catch (error) {
    console.error('GET /api/events error:', error);
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
    const validatedData = eventFormSchema.parse(body);

    // Generate slug from title
    const baseSlug = slugify(validatedData.title);
    const existingSlugs = await prisma.event.findMany({
      where: { slug: { startsWith: baseSlug } },
      select: { slug: true },
    });

    let slug = baseSlug;
    let counter = 1;
    while (existingSlugs.some((e: { slug: string }) => e.slug === slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create event
    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        slug,
        description: validatedData.description,
        startsAt: new Date(validatedData.startsAt),
        endsAt: validatedData.endsAt ? new Date(validatedData.endsAt) : null,
        location: validatedData.location,
        coverImage: validatedData.coverImage || null,
        status: validatedData.status,
      },
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      action: 'CREATE',
      entity: 'Event',
      entityId: event.id,
      metadata: { title: event.title, status: event.status },
    });

    return NextResponse.json(event, { status: 201 });
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
    console.error('POST /api/events error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
