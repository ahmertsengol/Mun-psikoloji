'use client';

/**
 * Admin Sidebar Component
 * Responsive sidebar with mobile support
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Newspaper, Calendar, Image, Home, LogOut, Megaphone } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    if (isMobile && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const sidebar = document.getElementById('admin-sidebar');
        if (sidebar && !sidebar.contains(e.target as Node)) {
          onClose?.();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile, isOpen, onClose]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobile, isOpen]);

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
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside 
        id="admin-sidebar"
        className={`
          flex h-screen flex-col border-r border-[var(--color-border)] bg-[var(--color-card-bg)]
          transition-all duration-300 ease-in-out z-50
          ${isMobile 
            ? `fixed top-0 left-0 w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : 'relative w-64'
          }
        `}
      >
        {/* Header */}
        <div className="border-b border-[var(--color-border)] p-4 lg:p-6">
          <Link href="/admin" className="block" onClick={() => isMobile && onClose?.()}>
            <h2 className="text-lg lg:text-xl font-bold text-[var(--color-fg)]">Admin Panel</h2>
            <p className="text-xs lg:text-sm text-[var(--color-fg)]/60 mt-1">Munzur Psikoloji Kulübü</p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 lg:p-4">
          <ul className="space-y-1 lg:space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => isMobile && onClose?.()}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 lg:px-4 py-3 lg:py-3 
                      text-sm lg:text-sm font-medium transition-all
                      min-h-[48px] touch-manipulation
                      ${isActive
                        ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] shadow-sm'
                        : 'text-[var(--color-fg)]/80 hover:bg-[var(--color-muted)] hover:text-[var(--color-fg)] active:bg-[var(--color-muted)]'
                      }
                    `}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--color-border)] p-3 lg:p-4 space-y-1 lg:space-y-2">
          <Link
            href="/"
            onClick={() => isMobile && onClose?.()}
            className="
              flex items-center gap-3 rounded-lg px-3 lg:px-4 py-3 lg:py-3 
              text-sm lg:text-sm font-medium text-[var(--color-fg)]/80 
              transition-all hover:bg-[var(--color-muted)] hover:text-[var(--color-fg)]
              min-h-[48px] touch-manipulation active:bg-[var(--color-muted)]
            "
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Siteyi Görüntüle</span>
          </Link>
          <button
            onClick={handleLogout}
            className="
              w-full flex items-center gap-3 rounded-lg px-3 lg:px-4 py-3 lg:py-3 
              text-sm lg:text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 
              transition-all hover:bg-red-500/20 min-h-[48px] touch-manipulation
              active:bg-red-500/30
            "
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="truncate">Çıkış Yap</span>
          </button>
        </div>
      </aside>
    </>
  );
}
