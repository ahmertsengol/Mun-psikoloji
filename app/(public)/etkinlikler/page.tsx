/**
 * Events List Page
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

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
      startsAt: true,
      endsAt: true,
      location: true,
    },
  });

  const upcomingEvents = events.filter(
    (event: typeof events[number]) => new Date(event.startsAt) >= new Date()
  );
  const pastEvents = events.filter(
    (event: typeof events[number]) => new Date(event.startsAt) < new Date()
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Etkinlikler</h1>
        <p className="text-lg text-gray-600">
          Psikoloji kulübü etkinlikleri ve programları
        </p>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Yaklaşan Etkinlikler
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event: typeof events[number]) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/etkinlikler/${event.slug}`}
                      className="hover:text-blue-600"
                    >
                      {event.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-gray-600">
                    {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                      locale: tr,
                    })}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-500">{event.location}</p>
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
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Geçmiş Etkinlikler
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event: typeof events[number]) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/etkinlikler/${event.slug}`}
                      className="hover:text-blue-600"
                    >
                      {event.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2 text-sm text-gray-600">
                    {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                      locale: tr,
                    })}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-500">{event.location}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {events.length === 0 && (
        <Card>
          <CardContent>
            <p className="py-8 text-center text-gray-500">
              Henüz etkinlik bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
