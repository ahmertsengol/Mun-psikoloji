/**
 * Announcements List Page Loading State
 */

import { CardSkeleton } from '@/components/ui/LoadingSpinner';

export default function AnnouncementsListLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-9 bg-[var(--color-fg)]/10 rounded-md mb-3 w-48"></div>
        <div className="h-5 bg-[var(--color-fg)]/10 rounded-md w-96"></div>
      </div>

      {/* Announcements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

