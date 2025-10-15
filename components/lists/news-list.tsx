import { NewsCard } from "../cards/news-card";
import { Skeleton } from "../ui/Skeleton";
import Link from "next/link";

interface News {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: string | null; // Kapak görseli eklendi
  publishedAt: string;
}

interface NewsListProps {
  news: News[];
  isLoading?: boolean;
  showViewAll?: boolean;
}

export function NewsList({ news, isLoading, showViewAll = false }: NewsListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-[var(--color-fg)]/60">Henüz haber bulunmuyor.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Scrollable news area */}
      <div className="overflow-y-auto max-h-[600px] pr-2 space-y-4 custom-scrollbar">
        {news.map((item) => (
          <NewsCard key={item.id} {...item} />
        ))}
      </div>

      {showViewAll && (
        <Link
          href="/haberler"
          className="block text-center py-3 mt-4 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent2)] transition-colors border-t border-[var(--color-border)] pt-4"
        >
          Tüm haberleri görüntüle →
        </Link>
      )}
    </div>
  );
}
