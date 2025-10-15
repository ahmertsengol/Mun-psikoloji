/**
 * Loading Spinner Component
 * Modern, smooth loading animation for page transitions
 */

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="w-16 h-16 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
        
        {/* Inner pulsing dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

/**
 * Loading Skeleton for Cards
 * Provides visual feedback while content loads
 */
export function CardSkeleton() {
  return (
    <div className="bg-[var(--color-card)] rounded-lg p-6 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-[var(--color-fg)]/10 rounded-md mb-4"></div>
      
      {/* Title placeholder */}
      <div className="h-6 bg-[var(--color-fg)]/10 rounded-md mb-3 w-3/4"></div>
      
      {/* Description lines */}
      <div className="space-y-2">
        <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-full"></div>
        <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-5/6"></div>
      </div>
      
      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-24"></div>
        <div className="h-4 bg-[var(--color-fg)]/10 rounded-md w-16"></div>
      </div>
    </div>
  );
}

/**
 * Full Page Loading Screen
 * Used for major page transitions
 */
export function FullPageLoading() {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo or Brand */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-[var(--color-fg)]/70 text-sm font-medium animate-pulse">
          Yükleniyor...
        </p>
      </div>
    </div>
  );
}

