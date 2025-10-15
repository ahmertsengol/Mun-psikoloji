"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { debounce } from "@/lib/search";
import Link from "next/link";
import { Badge } from "./ui/Badge";
import { formatDateBadge } from "@/lib/date";

interface SearchResult {
  id: string;
  title: string;
  slug: string;
  type: "event" | "announcement" | "news";
  publishedAt?: string | null;
  startsAt?: string | null;
}

interface GlobalSearchProps {
  className?: string;
}

export function GlobalSearch({ className }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "events" | "announcements" | "news">("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Search function with debounce
  const performSearch = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      // Fetch from API endpoints
      const [eventsRes, postsRes] = await Promise.all([
        fetch(`/api/events?search=${encodeURIComponent(searchQuery)}`),
        fetch(`/api/posts?search=${encodeURIComponent(searchQuery)}`),
      ]);

      const events = await eventsRes.json();
      const posts = await postsRes.json();

      // Transform results
      const eventResults: SearchResult[] = (events.events || []).map((event: {
        id: string;
        title: string;
        slug: string;
        startsAt: string;
      }) => ({
        id: event.id,
        title: event.title,
        slug: event.slug,
        type: "event" as const,
        startsAt: event.startsAt,
      }));

      const postResults: SearchResult[] = (posts.posts || []).map((post: {
        id: string;
        title: string;
        slug: string;
        type: string;
        publishedAt?: string | null;
      }) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        type: post.type === "ANNOUNCEMENT" ? ("announcement" as const) : ("news" as const),
        publishedAt: post.publishedAt,
      }));

      setResults([...eventResults, ...postResults]);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(0);
    performSearch(value);
  };

  // Clear search
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Filter results by active tab
  const filteredResults = results.filter((result) => {
    if (activeTab === "all") return true;
    if (activeTab === "events") return result.type === "event";
    if (activeTab === "announcements") return result.type === "announcement";
    if (activeTab === "news") return result.type === "news";
    return true;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        const result = filteredResults[selectedIndex];
        window.location.href = getResultUrl(result);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        !inputRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getResultUrl = (result: SearchResult) => {
    if (result.type === "event") return `/etkinlikler/${result.slug}`;
    if (result.type === "announcement") return `/duyurular/${result.slug}`;
    return `/haberler/${result.slug}`;
  };

  const getTypeLabel = (type: SearchResult["type"]) => {
    if (type === "event") return "Etkinlik";
    if (type === "announcement") return "Duyuru";
    return "Haber";
  };

  const getTypeColor = (type: SearchResult["type"]) => {
    if (type === "event") return "text-[var(--color-accent)]";
    if (type === "announcement") return "text-[var(--color-accent2)]";
    return "text-[var(--color-fg)]";
  };

  const countByType = (type: "event" | "announcement" | "news") =>
    results.filter((r) => r.type === type).length;

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-fg)]/60" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setIsOpen(true)}
          placeholder="Etkinlik, duyuru veya haber ara..."
          className={cn(
            "w-full rounded-lg bg-[var(--color-card-bg)] py-2.5 pl-10 pr-10",
            "text-sm text-[var(--color-fg)] placeholder:text-[var(--color-fg)]/50",
            "border border-[var(--color-border)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]",
            "transition-all duration-200"
          )}
          role="combobox"
          aria-label="Global arama"
          aria-expanded={isOpen}
          aria-controls="search-results"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-fg)]/60 hover:text-[var(--color-fg)]"
            aria-label="Aramayı temizle"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && query && (
        <div
          ref={resultsRef}
          id="search-results"
          className={cn(
            "absolute top-full left-0 right-0 mt-2 z-50",
            "rounded-lg border border-[var(--color-border)]",
            "bg-[var(--color-card-bg)] shadow-lg",
            "max-h-[500px] overflow-hidden flex flex-col"
          )}
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-[var(--color-border)] p-2">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "all"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-fg)]/70 hover:text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
              )}
            >
              Tümü ({results.length})
            </button>
            <button
              onClick={() => setActiveTab("events")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "events"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-fg)]/70 hover:text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
              )}
            >
              Etkinlikler ({countByType("event")})
            </button>
            <button
              onClick={() => setActiveTab("announcements")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "announcements"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-fg)]/70 hover:text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
              )}
            >
              Duyurular ({countByType("announcement")})
            </button>
            <button
              onClick={() => setActiveTab("news")}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                activeTab === "news"
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-fg)]/70 hover:text-[var(--color-fg)] hover:bg-[var(--color-muted)]"
              )}
            >
              Haberler ({countByType("news")})
            </button>
          </div>

          {/* Results List */}
          <div className="overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-[var(--color-fg)]/60">
                Aranıyor...
              </div>
            ) : filteredResults.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-[var(--color-fg)]/60 mb-2">
                  Sonuç bulunamadı
                </p>
                <p className="text-xs text-[var(--color-fg)]/40">
                  Farklı bir arama terimi deneyin
                </p>
              </div>
            ) : (
              <div className="p-2">
                {filteredResults.map((result, index) => (
                  <Link
                    key={result.id}
                    href={getResultUrl(result)}
                    className={cn(
                      "flex items-start gap-3 rounded-lg p-3 transition-colors",
                      "hover:bg-[var(--color-muted)]",
                      index === selectedIndex && "bg-[var(--color-muted)]"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={cn("text-xs font-medium", getTypeColor(result.type))}>
                          {getTypeLabel(result.type)}
                        </span>
                        {(result.publishedAt || result.startsAt) && (
                          <>
                            <span className="text-[var(--color-fg)]/30">•</span>
                            <Badge variant="secondary" className="text-xs">
                              {formatDateBadge(result.publishedAt || result.startsAt!)}
                            </Badge>
                          </>
                        )}
                      </div>
                      <h3 className="text-sm font-medium text-[var(--color-fg)] line-clamp-2">
                        {result.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer hint */}
          {filteredResults.length > 0 && (
            <div className="border-t border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-2">
              <p className="text-xs text-[var(--color-fg)]/50">
                <kbd className="rounded bg-[var(--color-card-bg)] px-1.5 py-0.5 text-xs">↑</kbd>
                {" "}
                <kbd className="rounded bg-[var(--color-card-bg)] px-1.5 py-0.5 text-xs">↓</kbd>
                {" "}gezin • {" "}
                <kbd className="rounded bg-[var(--color-card-bg)] px-1.5 py-0.5 text-xs">Enter</kbd>
                {" "}seç • {" "}
                <kbd className="rounded bg-[var(--color-card-bg)] px-1.5 py-0.5 text-xs">Esc</kbd>
                {" "}kapat
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
