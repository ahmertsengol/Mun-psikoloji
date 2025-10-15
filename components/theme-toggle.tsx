"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-28 rounded-lg bg-[var(--color-muted)] animate-pulse" />
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      role="radiogroup"
      aria-label="Tema seçimi"
      className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-muted)] p-1"
    >
      <button
        role="radio"
        aria-checked={theme === "light"}
        aria-label="Açık tema"
        onClick={() => setTheme("light")}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-all",
          "hover:bg-[var(--color-card-bg)] hover:text-[var(--color-fg)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
          theme === "light"
            ? "bg-[var(--color-card-bg)] text-[var(--color-fg)] shadow-sm"
            : "text-[var(--color-fg)]/60"
        )}
        title="Açık tema"
      >
        <Sun className="h-4 w-4" />
        <span className="sr-only">Açık</span>
      </button>

      <button
        role="radio"
        aria-checked={theme === "system"}
        aria-label="Sistem teması"
        onClick={() => setTheme("system")}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-all",
          "hover:bg-[var(--color-card-bg)] hover:text-[var(--color-fg)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
          theme === "system"
            ? "bg-[var(--color-card-bg)] text-[var(--color-fg)] shadow-sm"
            : "text-[var(--color-fg)]/60"
        )}
        title="Sistem teması"
      >
        <Monitor className="h-4 w-4" />
        <span className="sr-only">Sistem</span>
      </button>

      <button
        role="radio"
        aria-checked={theme === "dark"}
        aria-label="Koyu tema"
        onClick={() => setTheme("dark")}
        className={cn(
          "inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-all",
          "hover:bg-[var(--color-card-bg)] hover:text-[var(--color-fg)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]",
          theme === "dark"
            ? "bg-[var(--color-card-bg)] text-[var(--color-fg)] shadow-sm"
            : "text-[var(--color-fg)]/60"
        )}
        title="Koyu tema"
      >
        <Moon className="h-4 w-4" />
        <span className="sr-only">Koyu</span>
      </button>
    </div>
  );
}
