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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
