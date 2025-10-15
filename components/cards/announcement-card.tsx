import Link from "next/link";
import { Badge } from "../ui/Badge";
import { formatDateBadge, formatDateFull } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

interface AnnouncementCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  className?: string;
}

export function AnnouncementCard({
  title,
  slug,
  excerpt,
  publishedAt,
  className,
}: AnnouncementCardProps) {
  return (
    <Link href={`/duyurular/${slug}`} className="block group">
      <article
        className={cn(
          "bg-[var(--color-card-bg)] rounded-lg border border-[var(--color-border)]",
          "p-4 hover:shadow-[var(--shadow-soft)] transition-all duration-200",
          "hover:border-[var(--color-accent2)]",
          className
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-accent2)]/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-[var(--color-accent2)]" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Date */}
            <Badge variant="secondary" className="mb-2" title={formatDateFull(publishedAt)}>
              {formatDateBadge(publishedAt)}
            </Badge>

            {/* Title */}
            <h3 className="text-sm font-medium text-[var(--color-fg)] line-clamp-2 mb-1 group-hover:text-[var(--color-accent2)] transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-xs text-[var(--color-fg)]/60 line-clamp-2 mb-2">
                {excerpt}
              </p>
            )}

            {/* Read More Link */}
            <span className="text-xs text-[var(--color-accent2)] font-medium group-hover:underline">
              Devamını oku →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
