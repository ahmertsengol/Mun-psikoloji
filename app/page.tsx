/**
 * Home Page - Landing page
 */

import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata = {
  title: 'Anasayfa | Munzur Psikoloji Kulübü',
  description:
    'Munzur Üniversitesi Psikoloji Kulübü topluluk sitesi. Haberler, etkinlikler ve daha fazlası.',
};

export default async function Home() {
  // Fetch latest published posts
  const latestPosts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  // Fetch upcoming events
  const upcomingEvents = await prisma.event.findMany({
    where: {
      status: 'PUBLISHED',
      startsAt: { gte: new Date() },
    },
    orderBy: { startsAt: 'asc' },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      startsAt: true,
      location: true,
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 px-4 py-20 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container relative z-10 mx-auto">
          {/* Warning Banner */}
          <div className="mb-8 rounded-xl border-2 border-white/30 bg-white/20 p-4 backdrop-blur-sm">
            <p className="text-center text-sm font-medium text-white">
              ⚠️ Bu site resmi değildir; Munzur Üniversitesi Psikoloji Kulübü topluluk sayfasıdır.
              Resmi duyurular için{' '}
              <a
                href="https://munzur.edu.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:text-yellow-300"
              >
                munzur.edu.tr
              </a>
              'yi takip ediniz.
            </p>
          </div>

          <div className="text-center">
            <h1 className="mb-6 text-5xl font-extrabold leading-tight md:text-6xl lg:text-7xl">
              Munzur Üniversitesi
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                Psikoloji Kulübü
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl text-white/90 md:text-2xl">
              🧠 Psikoloji öğrencileri ve meraklıları için topluluk platformu.
              Haberler, etkinlikler ve bilgi paylaşımı.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/haberler">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 font-semibold shadow-lg">
                  📰 Haberleri İncele
                </Button>
              </Link>
              <Link href="/etkinlikler">
                <Button variant="secondary" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold">
                  📅 Etkinlikleri Gör
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Latest Posts */}
        <section className="mb-20">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-4xl font-bold text-gray-900">📰 Son Haberler</h2>
            <p className="text-lg text-gray-600">Psikoloji kulübünden güncel haberler</p>
          </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.length > 0 ? (
            latestPosts.map((post) => (
              <Card key={post.id} className="transition-all hover:shadow-xl hover:-translate-y-1">
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/haberler/${post.slug}`}
                      className="text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-sm text-gray-600 line-clamp-3">
                    {post.excerpt || 'Haber içeriğini görmek için tıklayın...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {post.publishedAt
                        ? format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                            locale: tr,
                          })
                        : ''}
                    </p>
                    <Link href={`/haberler/${post.slug}`}>
                      <Button variant="ghost" size="sm">Okuyun →</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">📭 Henüz haber bulunmuyor.</p>
              <p className="text-sm text-gray-400">Yakında yeni içerikler paylaşılacak!</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-bold text-gray-900">📅 Yaklaşan Etkinlikler</h2>
          <p className="text-lg text-gray-600">Kulüp etkinliklerine katılın, yeni insanlarla tanışın</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <Card key={event.id} className="transition-all hover:shadow-xl hover:-translate-y-1 border-l-4 border-l-purple-500">
                <CardHeader>
                  <CardTitle>
                    <Link
                      href={`/etkinlikler/${event.slug}`}
                      className="text-gray-900 hover:text-purple-600 transition-colors"
                    >
                      {event.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">🕐</span>
                      <p className="text-sm text-gray-700 font-medium">
                        {format(new Date(event.startsAt), 'dd MMMM yyyy, HH:mm', {
                          locale: tr,
                        })}
                      </p>
                    </div>
                    {event.location && (
                      <div className="flex items-start gap-2">
                        <span className="text-purple-600 mt-0.5">📍</span>
                        <p className="text-sm text-gray-600">{event.location}</p>
                      </div>
                    )}
                    <Link href={`/etkinlikler/${event.slug}`}>
                      <Button variant="ghost" size="sm" className="mt-2 w-full">
                        Detayları Gör →
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg mb-4">📭 Yaklaşan etkinlik bulunmuyor.</p>
              <p className="text-sm text-gray-400">Yeni etkinlikler için takipte kalın!</p>
            </div>
          )}
        </div>
        <div className="mt-10 text-center">
          <Link href="/etkinlikler">
            <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold">
              Tüm Etkinlikleri Görüntüle →
            </Button>
          </Link>
        </div>
      </section>
    </div>
    </div>
  );
}
