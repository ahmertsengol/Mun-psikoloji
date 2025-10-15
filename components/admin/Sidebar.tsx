'use client';

/**
 * Admin Sidebar Component
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/posts', label: 'Haberler', icon: '📰' },
    { href: '/admin/events', label: 'Etkinlikler', icon: '📅' },
    { href: '/admin/media', label: 'Medya', icon: '🖼️' },
  ];

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      <div className="border-b p-6">
        <Link href="/admin" className="block">
          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-500">Munzur Psikoloji Kulübü</p>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <Link
          href="/"
          className="mb-2 block rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
        >
          🏠 Siteyi Görüntüle
        </Link>
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 transition-colors hover:bg-red-100"
        >
          🚪 Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
