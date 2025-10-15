/**
 * Edit Event Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EventForm } from '@/components/admin/events/EventForm';
import { format } from 'date-fns';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
    select: { title: true },
  });

  return {
    title: event
      ? `${event.title} - Düzenle | Admin Panel`
      : 'Etkinlik Bulunamadı',
  };
}

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;
  const event = await prisma.event.findUnique({
    where: { id },
  });

  if (!event) {
    notFound();
  }

  const initialData = {
    id: event.id,
    title: event.title,
    description: event.description,
    startsAt: format(new Date(event.startsAt), "yyyy-MM-dd'T'HH:mm"),
    endsAt: event.endsAt
      ? format(new Date(event.endsAt), "yyyy-MM-dd'T'HH:mm")
      : '',
    location: event.location || '',
    coverImage: event.coverImage || '',
    status: event.status,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-fg)]">
          Etkinlik Düzenle
        </h1>
        <p className="text-[var(--color-fg)]/70">{event.title}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Etkinlik Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm mode="edit" initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  );
}
