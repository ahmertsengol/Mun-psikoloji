/**
 * Announcement Detail Page Loading State
 */

export default function AnnouncementDetailLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <article className="animate-pulse">
        {/* Cover Image Skeleton */}
        <div className="w-full h-96 bg-[var(--color-fg)]/10 rounded-lg mb-8"></div>

        {/* Title Skeleton */}
        <div className="h-10 bg-[var(--color-fg)]/10 rounded-md mb-4 w-3/4"></div>

        {/* Meta Information */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-32"></div>
          <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-24"></div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-full"></div>
              <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-11/12"></div>
              <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-10/12"></div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}

