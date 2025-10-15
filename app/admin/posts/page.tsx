/**
 * Admin Posts List Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Haberler</h1>
          <p className="text-gray-600">Haber ve duyuruları yönetin</p>
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
                <thead className="border-b bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Başlık
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Yazar
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {posts.map((post: typeof posts[number]) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="font-medium text-gray-900 hover:text-blue-600"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            post.status === 'PUBLISHED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {post.author?.email || 'Bilinmiyor'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
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
            <p className="mb-4 text-gray-500">Henüz haber yok</p>
            <Link href="/admin/posts/new">
              <Button>İlk Haberi Ekle</Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
