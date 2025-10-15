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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Etkinlikler</h1>
          <p className="text-gray-600">Etkinlikleri yönetin</p>
        </div>
        <Link href="/admin/events/new">
          <Button>➕ Yeni Etkinlik Ekle</Button>
        </Link>
      </div>

      {events.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Başlık
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Başlangıç
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Konum
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {events.map((event: typeof events[number]) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/events/${event.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {event.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            event.status === 'PUBLISHED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {event.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {format(new Date(event.startsAt), 'dd MMM yyyy HH:mm', {
                          locale: tr,
                        })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
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
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-gray-500">Henüz etkinlik yok</p>
            <Link href="/admin/events/new">
              <Button>İlk Etkinliği Ekle</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
