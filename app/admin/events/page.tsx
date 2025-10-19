/**
 * Admin Events List Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DeleteEventButton } from '@/components/admin/events/DeleteEventButton';

export const metadata = {
  title: 'Etkinlikler | Admin Panel',
  description: 'Etkinlik yönetimi',
};

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startsAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">Etkinlikler</h1>
          <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Etkinlikleri yönetin</p>
        </div>
        <Link href="/admin/events/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <span className="sm:hidden">Yeni Etkinlik</span>
            <span className="hidden sm:inline">➕ Yeni Etkinlik Ekle</span>
          </Button>
        </Link>
      </div>

      {events.length > 0 ? (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-[var(--color-border)] bg-[var(--color-muted)]">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          Başlık
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          Durum
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          Başlangıç
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          Konum
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {events.map((event: typeof events[number]) => (
                        <tr key={event.id} className="hover:bg-[var(--color-muted)]/50">
                          <td className="px-6 py-4">
                            <Link
                              href={`/admin/events/${event.id}`}
                              className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]"
                            >
                              {event.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                event.status === 'PUBLISHED'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              {event.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {format(new Date(event.startsAt), 'dd MMM yyyy HH:mm', {
                              locale: tr,
                            })}
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {event.location || '-'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/events/${event.id}`}>
                                <Button size="sm" variant="secondary">
                                  Düzenle
                                </Button>
                              </Link>
                              <DeleteEventButton eventId={event.id} />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {events.map((event: typeof events[number]) => (
              <Card key={event.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)] flex-1 line-clamp-2"
                    >
                      {event.title}
                    </Link>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${
                        event.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {event.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-[var(--color-fg)]/70">
                    <span>
                      {format(new Date(event.startsAt), 'dd MMM yyyy HH:mm', {
                        locale: tr,
                      })}
                    </span>
                    <span className="truncate max-w-[50%] text-right">{event.location || '-'}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/events/${event.id}`} className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full">
                        Düzenle
                      </Button>
                    </Link>
                    <DeleteEventButton eventId={event.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-[var(--color-fg)]/70">Henüz etkinlik yok</p>
            <Link href="/admin/events/new">
              <Button>İlk Etkinliği Ekle</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
