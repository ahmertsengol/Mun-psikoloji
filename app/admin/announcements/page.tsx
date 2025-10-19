/**
 * Admin Announcements List Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DeletePostButton } from '@/components/admin/posts/DeletePostButton';

export const metadata = {
  title: 'Duyurular | Admin Panel',
  description: 'Duyuru yönetimi',
};

export default async function AdminAnnouncementsPage() {
  const announcements = await prisma.post.findMany({
    where: {
      type: 'ANNOUNCEMENT',
    },
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">Duyurular</h1>
          <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Duyuruları yönetin</p>
        </div>
        <Link href="/admin/announcements/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <span className="sm:hidden">Yeni Duyuru</span>
            <span className="hidden sm:inline">➕ Yeni Duyuru Ekle</span>
          </Button>
        </Link>
      </div>

      {announcements.length > 0 ? (
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
                          Yazar
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          Tarih
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase text-[var(--color-fg)]/70">
                          İşlemler
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {announcements.map((announcement: typeof announcements[number]) => (
                        <tr key={announcement.id} className="hover:bg-[var(--color-muted)]/50">
                          <td className="px-6 py-4">
                            <Link
                              href={`/admin/announcements/${announcement.id}`}
                              className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]"
                            >
                              {announcement.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                announcement.status === 'PUBLISHED'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              {announcement.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {announcement.author?.email || 'Bilinmiyor'}
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {format(new Date(announcement.updatedAt), 'dd MMM yyyy', {
                              locale: tr,
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/announcements/${announcement.id}`}>
                                <Button size="sm" variant="secondary">
                                  Düzenle
                                </Button>
                              </Link>
                              <DeletePostButton postId={announcement.id} />
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
            {announcements.map((announcement: typeof announcements[number]) => (
              <Card key={announcement.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/admin/announcements/${announcement.id}`}
                      className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)] flex-1 line-clamp-2"
                    >
                      {announcement.title}
                    </Link>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${
                        announcement.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {announcement.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-[var(--color-fg)]/70">
                    <span>{announcement.author?.email || 'Bilinmiyor'}</span>
                    <span>
                      {format(new Date(announcement.updatedAt), 'dd MMM yyyy', {
                        locale: tr,
                      })}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/announcements/${announcement.id}`} className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full">
                        Düzenle
                      </Button>
                    </Link>
                    <DeletePostButton postId={announcement.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-[var(--color-fg)]/70">Henüz duyuru yok</p>
            <Link href="/admin/announcements/new">
              <Button>İlk Duyuruyu Ekle</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

