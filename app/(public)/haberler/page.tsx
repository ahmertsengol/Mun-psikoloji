/**
 * News/Posts List Page
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata = {
  title: 'Haberler | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü haberler ve duyurular.',
};

export default async function HaberlerPage() {
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      author: {
        select: {
          email: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Haberler</h1>
        <p className="text-lg text-gray-600">
          Psikoloji kulübü haberleri ve duyuruları
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: typeof posts[number]) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>
                  <Link
                    href={`/haberler/${post.slug}`}
                    className="hover:text-blue-600"
                  >
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  {post.excerpt || 'Haber içeriğini görmek için tıklayın...'}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {post.publishedAt
                      ? format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                          locale: tr,
                        })
                      : ''}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <p className="py-8 text-center text-gray-500">
              Henüz haber bulunmuyor.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
