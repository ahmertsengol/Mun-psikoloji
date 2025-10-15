import { AnnouncementCard } from "../cards/announcement-card";
import { Skeleton } from "../ui/Skeleton";
import Link from "next/link";

interface Announcement {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
}

interface AnnouncementsListProps {
  announcements: Announcement[];
  isLoading?: boolean;
  showViewAll?: boolean;
}

export function AnnouncementsList({
  announcements,
  isLoading,
  showViewAll = false
}: AnnouncementsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-[var(--color-fg)]/60">Henüz duyuru bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Scrollable announcements area */}
      <div className="overflow-y-auto max-h-[600px] pr-2 space-y-4 custom-scrollbar">
        {announcements.map((announcement) => (
          <AnnouncementCard key={announcement.id} {...announcement} />
        ))}
      </div>

      {showViewAll && (
        <Link
          href="/duyurular"
          className="block text-center py-3 mt-4 text-sm font-medium text-[var(--color-accent2)] hover:text-[var(--color-accent)] transition-colors border-t border-[var(--color-border)] pt-4"
        >
          Tüm duyuruları görüntüle →
        </Link>
      )}
    </div>
  );
}
