/**
 * Global Loading State
 * Shown during page transitions and initial loads
 */

import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <LoadingSpinner />
      </main>
      
      <Footer />
    </div>
  );
}

