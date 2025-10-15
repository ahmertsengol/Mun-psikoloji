/**
 * Public Layout
 * Layout for all public-facing pages
 */

import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">{children}</main>
      <Footer />
    </>
  );
}
