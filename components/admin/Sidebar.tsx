'use client';

/**
 * Admin Sidebar Component
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Newspaper, Calendar, Image, Home, LogOut, Megaphone } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/announcements', label: 'Duyurular', icon: Megaphone },
    { href: '/admin/posts', label: 'Haberler', icon: Newspaper },
    { href: '/admin/events', label: 'Etkinlikler', icon: Calendar },
    { href: '/admin/media', label: 'Medya', icon: Image },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[var(--color-border)] bg-[var(--color-card-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] p-6">
        <Link href="/admin" className="block">
          <h2 className="text-xl font-bold text-[var(--color-fg)]">Admin Panel</h2>
          <p className="text-sm text-[var(--color-fg)]/60 mt-1">Munzur Psikoloji Kulübü</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-sm'
                      : 'text-[var(--color-fg)]/80 hover:bg-[var(--color-muted)] hover:text-[var(--color-fg)]'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-border)] p-4 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[var(--color-fg)]/80 transition-all hover:bg-[var(--color-muted)] hover:text-[var(--color-fg)]"
        >
          <Home className="w-5 h-5" />
          Siteyi Görüntüle
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 transition-all hover:bg-red-500/20"
        >
          <LogOut className="w-5 h-5" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
