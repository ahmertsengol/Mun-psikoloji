import Link from "next/link";
import Image from "next/image";
import { Badge } from "../ui/Badge";
import { formatDateBadge, formatDateFull } from "@/lib/date";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null; // Kapak görseli eklendi
  publishedAt: string;
  className?: string;
}

export function NewsCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  className,
}: NewsCardProps) {
  return (
    <Link href={`/haberler/${slug}`} className="block group">
      <article
        className={cn(
          "bg-[var(--color-card-bg)] rounded-lg border border-[var(--color-border)]",
          "p-4 hover:shadow-[var(--shadow-soft)] transition-all duration-200",
          "hover:border-[var(--color-accent)]",
          className
        )}
      >
        <div className="flex items-start gap-3">
          {/* Thumbnail - only show if exists */}
          {coverImage && (
            <div className="flex-shrink-0">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Date */}
            <Badge variant="secondary" className="mb-2" title={formatDateFull(publishedAt)}>
              {formatDateBadge(publishedAt)}
            </Badge>

            {/* Title */}
            <h3 className="text-sm font-medium text-[var(--color-fg)] line-clamp-2 mb-1 group-hover:text-[var(--color-accent)] transition-colors">
              {title}
            </h3>

            {/* Excerpt */}
            {excerpt && (
              <p className="text-xs text-[var(--color-fg)]/60 line-clamp-2 mb-2">
                {excerpt}
              </p>
            )}

            {/* Read More Link */}
            <span className="text-xs text-[var(--color-accent)] font-medium group-hover:underline">
              Devamını oku →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
