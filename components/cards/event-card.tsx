import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "../ui/Badge";
import { formatDateBadge, formatDateFull } from "@/lib/date";
import { cn } from "@/lib/utils";

interface EventCardProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  startsAt: string;
  endsAt?: string | null;
  location?: string | null;
  coverImage?: string | null; // Kapak görseli eklendi
  className?: string;
}

export function EventCard({
  title,
  slug,
  description,
  startsAt,
  location,
  coverImage, // Kapak görseli eklendi
  className,
}: EventCardProps) {
  return (
    <Link href={`/etkinlikler/${slug}`} className="block group">
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-5">
          {/* Date Badge */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="default" title={formatDateFull(startsAt)}>
              {formatDateBadge(startsAt)}
            </Badge>
            {location && (
              <span className="flex items-center gap-1 text-xs text-[var(--color-fg)]/60">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[150px]">{location}</span>
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--color-fg)] mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-[var(--color-fg)]/70 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
            <span className="text-xs font-medium text-[var(--color-accent)] group-hover:text-[var(--color-accent2)] transition-colors">
              Detayları görüntüle →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
