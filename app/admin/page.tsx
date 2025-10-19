/**
 * Admin Dashboard Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Newspaper, FileText, Calendar, Plus, Image as ImageIcon, Home, ArrowRight, Megaphone } from 'lucide-react';

export const metadata = {
  title: 'Dashboard | Admin Panel',
  description: 'Admin panel dashboard',
};

export default async function AdminDashboard() {
  // Get statistics
  const [totalPosts, totalEvents, draftPosts, draftEvents, totalAnnouncements, recentPosts] =
    await Promise.all([
      prisma.post.count({ where: { type: 'NEWS' } }),
      prisma.event.count(),
      prisma.post.count({ where: { type: 'NEWS', status: 'DRAFT' } }),
      prisma.event.count({ where: { status: 'DRAFT' } }),
      prisma.post.count({ where: { type: 'ANNOUNCEMENT' } }),
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
      label: 'Toplam Duyuru',
      value: totalAnnouncements,
      href: '/admin/announcements',
      icon: Megaphone,
      color: 'text-rose-500',
      bgColor: 'bg-rose-500/10',
    },
    {
      label: 'Toplam Haber',
      value: totalPosts,
      href: '/admin/posts',
      icon: Newspaper,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Toplam Etkinlik',
      value: totalEvents,
      href: '/admin/events',
      icon: Calendar,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: 'Taslak İçerik',
      value: draftPosts + draftEvents,
      href: '/admin/posts',
      icon: FileText,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-fg)] mb-2 lg:mb-3">Dashboard</h1>
        <p className="text-base lg:text-lg text-[var(--color-fg)]/70">
          Munzur Psikoloji Kulübü yönetim paneline hoş geldiniz
        </p>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="group transition-all hover:shadow-[var(--shadow-soft-md)] hover:border-[var(--color-accent)]/50 cursor-pointer touch-manipulation active:scale-95">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 lg:mb-4">
                    <div className={`p-2.5 lg:p-3 rounded-xl ${stat.bgColor}`}>
                      <IconComponent className={`w-5 h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                    </div>
                    <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--color-fg)]/40 group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--color-fg)]/70 mb-1 lg:mb-2">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Recent Posts and Quick Actions */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        {/* Recent Posts */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)]" />
                Son Haberler
              </CardTitle>
              <Link href="/admin/posts">
                <Button variant="ghost" size="sm" className="gap-1 text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3">
                  Tümünü Gör
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            {recentPosts.length > 0 ? (
              <ul className="space-y-3 sm:space-y-4">
                {recentPosts.map((post: typeof recentPosts[number]) => (
                  <li
                    key={post.id}
                    className="flex items-start justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[var(--color-border)] last:border-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-semibold text-sm sm:text-base text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors line-clamp-2 block mb-1 touch-manipulation"
                      >
                        {post.title}
                      </Link>
                      <p className="text-xs sm:text-sm text-[var(--color-fg)]/60">
                        {format(new Date(post.updatedAt), 'dd MMM yyyy', {
                          locale: tr,
                        })}
                      </p>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full px-2 sm:px-3 py-1 text-xs font-medium ${
                        post.status === 'PUBLISHED'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}
                    >
                      {post.status === 'PUBLISHED' ? 'Yayında' : 'Taslak'}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-8 sm:py-12 text-center">
                <Newspaper className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--color-fg)]/20 mx-auto mb-2 sm:mb-3" />
                <p className="text-sm sm:text-base text-[var(--color-fg)]/60">Henüz haber yok</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--color-accent)]" />
              Hızlı İşlemler
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-2 sm:space-y-3">
              <Link href="/admin/announcements/new" className="block">
                <Button className="w-full justify-start gap-2 text-sm sm:text-base h-11 sm:h-12 touch-manipulation active:scale-95">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Yeni Duyuru Ekle
                </Button>
              </Link>
              <Link href="/admin/posts/new" className="block">
                <Button className="w-full justify-start gap-2 text-sm sm:text-base h-11 sm:h-12 touch-manipulation active:scale-95">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Yeni Haber Ekle
                </Button>
              </Link>
              <Link href="/admin/events/new" className="block">
                <Button className="w-full justify-start gap-2 text-sm sm:text-base h-11 sm:h-12 touch-manipulation active:scale-95">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  Yeni Etkinlik Ekle
                </Button>
              </Link>
              <Link href="/admin/media" className="block">
                <Button variant="secondary" className="w-full justify-start gap-2 text-sm sm:text-base h-11 sm:h-12 touch-manipulation active:scale-95">
                  <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  Medya Yönetimi
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="ghost" className="w-full justify-start gap-2 text-sm sm:text-base h-11 sm:h-12 touch-manipulation active:scale-95">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  Siteyi Görüntüle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
