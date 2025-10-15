/**
 * News/Posts List Page
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata = {
  title: 'Haberler | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü haberler ve duyurular.',
};

export default async function HaberlerPage() {
  const posts = await prisma.post.findMany({
    where: {
      type: 'NEWS',
      status: 'PUBLISHED'
    },
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-fg)] mb-2">
            Haberler
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-fg)]/70">
            Psikoloji kulübü haberleri ve duyuruları
          </p>
        </div>

        <Separator className="mb-8" />

        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: typeof posts[number]) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-shadow duration-200"
              >
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/haberler/${post.slug}`}
                      className="hover:text-[var(--color-accent)] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-[var(--color-fg)]/70 line-clamp-3">
                    {post.excerpt || 'Haber içeriğini görmek için tıklayın...'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-fg)]/60">
                    <span>
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                            locale: tr,
                          })
                        : 'Tarih belirtilmemiş'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12">
              <p className="text-center text-[var(--color-fg)]/60">
                Henüz haber bulunmuyor.
              </p>
            </CardContent>
          </Card>
        )}
    </div>
  );
}
