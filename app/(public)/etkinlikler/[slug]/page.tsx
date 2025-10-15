/**
 * Individual Event Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Separator } from '@/components/ui/Separator';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar, MapPin, AlertCircle } from 'lucide-react';
import Image from 'next/image';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-6 text-3xl sm:text-4xl font-bold text-[var(--color-fg)] leading-tight">
            {event.title}
          </h1>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-[var(--color-fg)]/70">
              <Calendar className="h-5 w-5 text-[var(--color-accent)] mt-0.5" />
              <div>
                <span className="font-semibold text-[var(--color-fg)]">Tarih: </span>
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
            </div>
            {event.location && (
              <div className="flex items-start gap-3 text-[var(--color-fg)]/70">
                <MapPin className="h-5 w-5 text-[var(--color-accent)] mt-0.5" />
                <div>
                  <span className="font-semibold text-[var(--color-fg)]">Konum: </span>
                  <span>{event.location}</span>
                </div>
              </div>
            )}
            {isPast && (
              <div className="mt-4 rounded-lg border-2 border-[var(--color-accent)]/30 bg-[var(--color-muted)] p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-[var(--color-accent)] mt-0.5" />
                  <p className="text-sm text-[var(--color-fg)]/80 font-medium">
                    Bu etkinlik geçmişte gerçekleştirildi.
                  </p>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {event.coverImage && (
          <div className="relative w-full h-64 sm:h-96 lg:h-[500px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-[var(--color-fg)]/80 leading-relaxed">
            {event.description}
          </div>
        </div>
      </article>
    </div>
  );
}
