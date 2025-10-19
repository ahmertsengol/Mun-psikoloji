'use client';

/**
 * Admin Layout Client Component
 * Responsive layout with mobile sidebar support
 */

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import { MobileMenuButton } from '@/components/ui/MobileMenuButton';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile when switching to desktop
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)]">
      {/* Mobile Header */}
      {isMobile && (
        <header className="fixed top-0 left-0 right-0 z-30 bg-[var(--color-card-bg)] border-b border-[var(--color-border)] px-4 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MobileMenuButton 
                isOpen={sidebarOpen} 
                onClick={toggleSidebar}
              />
              <div>
                <h1 className="text-lg font-bold text-[var(--color-fg)]">Admin Panel</h1>
                <p className="text-xs text-[var(--color-fg)]/60">Munzur Psikoloji Kulübü</p>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Sidebar */}
      <Sidebar 
        isOpen={isMobile ? sidebarOpen : true} 
        onClose={closeSidebar}
      />

      {/* Main Content */}
      <main 
        className={`
          flex-1 overflow-y-auto bg-[var(--color-bg)]
          ${isMobile ? 'pt-16' : ''}
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  );
}