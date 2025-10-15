/**
 * News List Page Loading State
 */

export default function NewsListLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      {/* Page Header Skeleton */}
      <div className="mb-8 animate-pulse">
        <div className="h-9 bg-[var(--color-fg)]/10 rounded-md mb-3 w-48"></div>
        <div className="h-5 bg-[var(--color-fg)]/10 rounded-md w-96"></div>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[var(--color-card)] rounded-lg p-6 shadow-sm animate-pulse">
            <div className="flex gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 bg-[var(--color-fg)]/10 rounded-md flex-shrink-0"></div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="h-6 bg-[var(--color-fg)]/10 rounded-md mb-2 w-3/4"></div>
                <div className="h-4 bg-[var(--color-fg)]/10 rounded-md mb-2 w-full"></div>
                <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-5/6"></div>
                <div className="h-3 bg-[var(--color-fg)]/10 rounded-md w-32 mt-3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

