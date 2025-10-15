/**
 * Individual Event Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, status: 'PUBLISHED' },
    select: { title: true, description: true },
  });

  if (!event) {
    return {
      title: 'Etkinlik Bulunamadı',
    };
  }

  return {
    title: `${event.title} | Munzur Psikoloji Kulübü`,
    description: event.description.slice(0, 160),
  };
}

export default async function EventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await prisma.event.findUnique({
    where: { slug, status: 'PUBLISHED' },
  });

  if (!event) {
    notFound();
  }

  const isPast = new Date(event.startsAt) < new Date();

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {event.title}
          </h1>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Tarih:</span>
              <time dateTime={event.startsAt.toISOString()}>
                {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                  locale: tr,
                })}
              </time>
              {event.endsAt && (
                <>
                  {' - '}
                  <time dateTime={event.endsAt.toISOString()}>
                    {format(new Date(event.endsAt), 'HH:mm', { locale: tr })}
                  </time>
                </>
              )}
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <span className="font-semibold">Konum:</span>
                <span>{event.location}</span>
              </div>
            )}
            {isPast && (
              <div className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-3">
                <p className="text-sm text-gray-700">
                  Bu etkinlik geçmişte gerçekleştirildi.
                </p>
              </div>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-800">
            {event.description}
          </div>
        </div>
      </article>
    </div>
  );
}
