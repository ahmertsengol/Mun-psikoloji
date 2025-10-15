"use client";

import { EventCard } from "../cards/event-card";
import { Skeleton } from "../ui/Skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  startsAt: string;
  endsAt?: string | null;
  location?: string | null;
  coverImage?: string | null; // Kapak görseli eklendi
}

interface EventsListProps {
  events: Event[];
  totalPages: number;
  currentPage: number;
  isLoading?: boolean;
}

export function EventsList({ events, totalPages, currentPage, isLoading }: EventsListProps) {
  const router = useRouter();

  const handlePageChange = (newPage: number) => {
    // Update URL and refresh with new data
    if (newPage === 1) {
      router.push("/");
    } else {
      router.push(`/?page=${newPage}`);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-fg)]/60">Henüz etkinlik bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Events Grid */}
      <div className="space-y-6">
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          {/* Previous */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={cn(
              "inline-flex items-center justify-center rounded-lg px-3 py-2",
              "text-sm font-medium transition-colors",
              "border border-[var(--color-border)]",
              currentPage === 1
                ? "bg-[var(--color-muted)] text-[var(--color-fg)]/40 cursor-not-allowed"
                : "bg-[var(--color-card-bg)] text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
            )}
            aria-label="Önceki sayfa"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNum = i + 1;
            // Show first, last, current, and adjacent pages
            if (
              pageNum === 1 ||
              pageNum === totalPages ||
              (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-lg px-3 py-2 min-w-[40px]",
                    "text-sm font-medium transition-colors",
                    pageNum === currentPage
                      ? "bg-[var(--color-accent)] text-white"
                      : "bg-[var(--color-card-bg)] text-[var(--color-fg)] border border-[var(--color-border)] hover:bg-[var(--color-muted)]"
                  )}
                  aria-label={`Sayfa ${pageNum}`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
              return (
                <span key={pageNum} className="px-2 text-[var(--color-fg)]/40">
                  ...
                </span>
              );
            }
            return null;
          })}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={cn(
              "inline-flex items-center justify-center rounded-lg px-3 py-2",
              "text-sm font-medium transition-colors",
              "border border-[var(--color-border)]",
              currentPage === totalPages
                ? "bg-[var(--color-muted)] text-[var(--color-fg)]/40 cursor-not-allowed"
                : "bg-[var(--color-card-bg)] text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
            )}
            aria-label="Sonraki sayfa"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
