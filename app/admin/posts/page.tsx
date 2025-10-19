/**
 * Admin Posts List Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { DeletePostButton } from '@/components/admin/posts/DeletePostButton';

export const metadata = {
  title: 'Haberler | Admin Panel',
  description: 'Haber yönetimi',
};

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({
    where: {
      type: 'NEWS',
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
          <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">Haberler</h1>
          <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Haberleri yönetin</p>
        </div>
        <Link href="/admin/posts/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <span className="sm:hidden">Yeni Haber</span>
            <span className="hidden sm:inline">➕ Yeni Haber Ekle</span>
          </Button>
        </Link>
      </div>

      {posts.length > 0 ? (
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
                      {posts.map((post: typeof posts[number]) => (
                        <tr key={post.id} className="hover:bg-[var(--color-muted)]/50">
                          <td className="px-6 py-4">
                            <Link
                              href={`/admin/posts/${post.id}`}
                              className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)]"
                            >
                              {post.title}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                post.status === 'PUBLISHED'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {post.author?.email || 'Bilinmiyor'}
                          </td>
                          <td className="px-6 py-4 text-sm text-[var(--color-fg)]/70">
                            {format(new Date(post.updatedAt), 'dd MMM yyyy', {
                              locale: tr,
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link href={`/admin/posts/${post.id}`}>
                                <Button size="sm" variant="secondary">
                                  Düzenle
                                </Button>
                              </Link>
                              <DeletePostButton postId={post.id} />
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
            {posts.map((post: typeof posts[number]) => (
              <Card key={post.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="font-medium text-[var(--color-fg)] hover:text-[var(--color-accent)] flex-1 line-clamp-2"
                    >
                      {post.title}
                    </Link>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium whitespace-nowrap ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-[var(--color-fg)]/70">
                    <span>{post.author?.email || 'Bilinmiyor'}</span>
                    <span>
                      {format(new Date(post.updatedAt), 'dd MMM yyyy', {
                        locale: tr,
                      })}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Link href={`/admin/posts/${post.id}`} className="flex-1">
                      <Button size="sm" variant="secondary" className="w-full">
                        Düzenle
                      </Button>
                    </Link>
                    <DeletePostButton postId={post.id} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="mb-4 text-[var(--color-fg)]/70">Henüz haber yok</p>
            <Link href="/admin/posts/new">
              <Button>İlk Haberi Ekle</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
