/**
 * Input Component
 */

import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-[var(--color-fg)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-fg)] px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm placeholder:text-[var(--color-fg)]/50 focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 touch-manipulation ${
            error ? 'border-red-500' : ''
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
