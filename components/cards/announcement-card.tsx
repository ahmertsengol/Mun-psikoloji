import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Badge } from "../ui/Badge";
import { formatDateBadge, formatDateFull } from "@/lib/date";
import { cn } from "@/lib/utils";

interface AnnouncementCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  coverImage?: string | null;
  className?: string;
}

export function AnnouncementCard({
  title,
  slug,
  excerpt,
  publishedAt,
  coverImage,
  className,
}: AnnouncementCardProps) {
  return (
    <Link href={`/duyurular/${slug}`} className="block group">
      <article
        className={cn(
          "bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)]",
          "shadow-[var(--shadow-soft-md)] overflow-hidden",
          "card-hover transition-all duration-200",
          className
        )}
      >
        {/* Cover image - only show if exists */}
        {coverImage && (
          <div className="h-32 relative overflow-hidden">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-5">
          {/* Date Badge with Icon */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default" title={formatDateFull(publishedAt)}>
              {formatDateBadge(publishedAt)}
            </Badge>
            <span className="flex items-center gap-1 text-xs text-[var(--color-fg)]/60">
              <Bell className="h-3 w-3" />
              Duyuru
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent2)] transition-colors">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-[var(--color-fg)]/70 line-clamp-3 leading-relaxed">
              {excerpt}
            </p>
          )}

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <span className="text-xs font-medium text-[var(--color-accent2)] group-hover:text-[var(--color-accent)] transition-colors">
              Devamını oku →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
