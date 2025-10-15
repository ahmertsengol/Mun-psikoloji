/**
 * Admin Dashboard Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'Admin panel dashboard',
};

export default async function AdminDashboard() {
  // Get statistics
  const [totalPosts, totalEvents, draftPosts, draftEvents, recentPosts] =
    await Promise.all([
      prisma.post.count(),
      prisma.event.count(),
      prisma.post.count({ where: { status: 'DRAFT' } }),
      prisma.event.count({ where: { status: 'DRAFT' } }),
      prisma.post.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      }),
    ]);

  const stats = [
    {
      label: 'Toplam Haber',
      value: totalPosts,
      href: '/admin/posts',
      icon: '📰',
    },
    {
      label: 'Taslak Haber',
      value: draftPosts,
      href: '/admin/posts',
      icon: '📝',
    },
    {
      label: 'Toplam Etkinlik',
      value: totalEvents,
      href: '/admin/events',
      icon: '📅',
    },
    {
      label: 'Taslak Etkinlik',
      value: draftEvents,
      href: '/admin/events',
      icon: '📋',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Munzur Psikoloji Kulübü yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <span className="text-4xl">{stat.icon}</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Son Haberler</CardTitle>
              <Link href="/admin/posts">
                <Button variant="ghost" size="sm">
                  Tümünü Gör
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentPosts.length > 0 ? (
              <ul className="space-y-3">
                {recentPosts.map((post: typeof recentPosts[number]) => (
                  <li
                    key={post.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0"
                  >
                    <div>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs text-gray-500">
                        {format(new Date(post.updatedAt), 'dd MMM yyyy', {
                          locale: tr,
                        })}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Henüz haber yok
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hızlı İşlemler</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link href="/admin/posts/new" className="block">
                <Button className="w-full justify-start">
                  ➕ Yeni Haber Ekle
                </Button>
              </Link>
              <Link href="/admin/events/new" className="block">
                <Button className="w-full justify-start">
                  ➕ Yeni Etkinlik Ekle
                </Button>
              </Link>
              <Link href="/admin/media" className="block">
                <Button variant="secondary" className="w-full justify-start">
                  🖼️ Medya Yönetimi
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full justify-start">
                  🏠 Siteyi Görüntüle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
