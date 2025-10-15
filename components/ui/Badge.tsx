import { cn } from "@/lib/utils";
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "bg-[var(--color-accent)]/10 text-[var(--color-accent)]": variant === "default",
          "bg-[var(--color-muted)] text-[var(--color-fg)]": variant === "secondary",
          "border border-[var(--color-border)] bg-transparent text-[var(--color-fg)]": variant === "outline",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
