/**
 * Public Pages Loading State
 * Skeleton loader matching the 3-column layout
 */

import { CardSkeleton } from '@/components/ui/LoadingSpinner';

export default function PublicLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 3 Column Grid Layout - matching homepage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* LEFT COLUMN - Announcements */}
        <aside className="lg:col-span-3 order-2 lg:order-1">
          <div className="sticky top-20">
            <div className="h-8 bg-[var(--color-fg)]/10 rounded-md mb-4 w-32 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[var(--color-card)] rounded-lg p-4 shadow-sm animate-pulse">
                  <div className="h-5 bg-[var(--color-fg)]/10 rounded-md mb-2 w-3/4"></div>
                  <div className="h-3 bg-[var(--color-fg)]/10 rounded-md w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN - Events */}
        <section className="lg:col-span-6 order-1 lg:order-2">
          <div className="mb-6 animate-pulse">
            <div className="h-9 bg-[var(--color-fg)]/10 rounded-md mb-2 w-48"></div>
            <div className="h-5 bg-[var(--color-fg)]/10 rounded-md w-64"></div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* RIGHT COLUMN - News */}
        <aside className="lg:col-span-3 order-3">
          <div className="sticky top-20">
            <div className="h-8 bg-[var(--color-fg)]/10 rounded-md mb-4 w-32 animate-pulse"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[var(--color-card)] rounded-lg p-4 shadow-sm animate-pulse">
                  <div className="h-5 bg-[var(--color-fg)]/10 rounded-md mb-2 w-3/4"></div>
                  <div className="h-3 bg-[var(--color-fg)]/10 rounded-md w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

