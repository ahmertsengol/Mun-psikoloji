"use client";

/**
 * Public Header Component
 */

import Link from "next/link";
import { Brain, Settings } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { GlobalSearch } from "../global-search";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isAdmin?: boolean;
}

export function Header({ isAdmin = false }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[var(--color-border)] bg-[var(--color-card-bg)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-card-bg)]/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Title */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--color-fg)] hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
          >
            <Brain className="h-6 w-6 text-[var(--color-accent)]" aria-hidden="true" />
            <span className="font-semibold text-base sm:text-lg whitespace-nowrap">
              Munzur Psikoloji Kulübü
            </span>
          </Link>

          {/* Search - Hidden on small mobile, shown from sm */}
          <div className="hidden sm:flex flex-1 max-w-2xl mx-4">
            <GlobalSearch />
          </div>

          {/* Navigation Links - Hidden on mobile, shown from md */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/duyurular"
              className="px-3 py-2 text-sm font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
            >
              Duyurular
            </Link>
            <Link
              href="/haberler"
              className="px-3 py-2 text-sm font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
            >
              Haberler
            </Link>
            <Link
              href="/etkinlikler"
              className="px-3 py-2 text-sm font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
            >
              Etkinlikler
            </Link>
            <Link
              href="/iletisim"
              className="px-3 py-2 text-sm font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
            >
              İletişim
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2",
                  "text-sm font-medium transition-colors",
                  "bg-[var(--color-accent)] text-white",
                  "hover:bg-[var(--color-accent2)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                )}
                aria-label="Admin paneline git"
              >
                <Settings className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search - Shown only on mobile */}
        <div className="sm:hidden pb-3">
          <GlobalSearch />
        </div>

        {/* Mobile Navigation - Shown only on mobile */}
        <nav className="md:hidden flex items-center gap-1 pb-3 border-t border-[var(--color-border)] pt-3">
          <Link
            href="/duyurular"
            className="flex-1 text-center px-2 py-2 text-xs font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
          >
            Duyurular
          </Link>
          <Link
            href="/haberler"
            className="flex-1 text-center px-2 py-2 text-xs font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
          >
            Haberler
          </Link>
          <Link
            href="/etkinlikler"
            className="flex-1 text-center px-2 py-2 text-xs font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
          >
            Etkinlikler
          </Link>
          <Link
            href="/iletisim"
            className="flex-1 text-center px-2 py-2 text-xs font-medium text-[var(--color-fg)]/80 hover:text-[var(--color-accent)] hover:bg-[var(--color-muted)] rounded-md transition-colors"
          >
            İletişim
          </Link>
        </nav>
      </div>
    </header>
  );
}
