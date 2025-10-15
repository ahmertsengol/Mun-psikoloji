/**
 * Admin Layout
 * Layout for all admin pages with sidebar
 */

import { Sidebar } from '@/components/admin/Sidebar';
import { getCurrentUser } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  // Check if user has admin or editor role
  if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
    // Redirect to home if user doesn't have permission
    redirect('/');
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
