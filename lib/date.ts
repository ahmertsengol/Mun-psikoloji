import { format, formatDistanceToNow } from "date-fns";
import { tr } from "date-fns/locale";

/**
 * Format date for badge display
 * @example "05 Eki 2025"
 */
export function formatDateBadge(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "dd MMM yyyy", { locale: tr });
}

/**
 * Format full date and time
 * @example "5 Ekim 2025, 14:30"
 */
export function formatDateFull(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return format(dateObj, "d MMMM yyyy, HH:mm", { locale: tr });
}

/**
 * Format relative time
 * @example "2 saat önce"
 */
export function formatDateRelative(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: tr });
}

/**
 * Format date for ISO string
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString();
}
