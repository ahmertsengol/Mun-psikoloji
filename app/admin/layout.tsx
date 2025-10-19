/**
 * Admin Layout
 * Responsive layout for all admin pages with sidebar
 */

import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient';
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

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
