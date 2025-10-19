'use client';

/**
 * Mobile Menu Button Component
 * Hamburger menu button for mobile navigation
 */

import { Menu, X } from 'lucide-react';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function MobileMenuButton({ isOpen, onClick, className = '' }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center p-2 rounded-lg
        text-[var(--color-fg)] hover:bg-[var(--color-muted)]
        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]
        transition-all duration-200 ease-in-out
        ${className}
      `}
      aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
      aria-expanded={isOpen}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <Menu className="w-6 h-6" />
      )}
    </button>
  );
}