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
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-[var(--color-fg)]">Haberler</h1>
          <p className="text-[var(--color-fg)]/70">Haberleri yönetin</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>➕ Yeni Haber Ekle</Button>
        </Link>
      </div>

      {posts.length > 0 ? (
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
