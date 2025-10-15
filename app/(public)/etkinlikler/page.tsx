/**
 * Events List Page
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Etkinlikler | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü etkinlikleri ve programlar.',
};

export default async function EtkinliklerPage() {
  const events = await prisma.event.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { startsAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      startsAt: true,
      endsAt: true,
      location: true,
    },
  });

  const now = new Date();
  const upcomingEvents = events.filter(
    (event: typeof events[number]) => new Date(event.startsAt) >= now
  );
  const pastEvents = events.filter(
    (event: typeof events[number]) => new Date(event.startsAt) < now
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-fg)] mb-2">
            Etkinlikler
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-fg)]/70">
            Psikoloji kulübü etkinlikleri ve programları
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-[var(--color-fg)] mb-6">
              Yaklaşan Etkinlikler
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event: typeof events[number]) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-[var(--color-accent)]"
                >
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={`/etkinlikler/${event.slug}`}
                        className="hover:text-[var(--color-accent)] transition-colors"
                      >
                        {event.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.description && (
                      <p className="text-sm text-[var(--color-fg)]/70 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]/70">
                      <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                      <span>
                        {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                          locale: tr,
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]/60">
                        <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-[var(--color-fg)] mb-6">
              Geçmiş Etkinlikler
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastEvents.map((event: typeof events[number]) => (
                <Card
                  key={event.id}
                  className="hover:shadow-lg transition-shadow duration-200 opacity-75"
                >
                  <CardHeader>
                    <CardTitle>
                      <Link
                        href={`/etkinlikler/${event.slug}`}
                        className="hover:text-[var(--color-accent)] transition-colors"
                      >
                        {event.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {event.description && (
                      <p className="text-sm text-[var(--color-fg)]/70 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]/70">
                      <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                      <span>
                        {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                          locale: tr,
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-[var(--color-fg)]/60">
                        <MapPin className="h-4 w-4 text-[var(--color-accent)]" />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* No Events Message */}
        {events.length === 0 && (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-[var(--color-fg)]/60">
                Henüz etkinlik bulunmuyor.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
