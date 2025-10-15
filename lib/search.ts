/**
 * Search utilities for client-side filtering
 */

export interface SearchableItem {
  id: string;
  title: string;
  excerpt?: string | null;
  content?: string;
  slug: string;
}

/**
 * Filter items by search query
 * Searches in title, excerpt, and content fields
 */
export function filterByQuery<T extends SearchableItem>(
  items: T[],
  query: string
): T[] {
  if (!query.trim()) {
    return items;
  }

  const lowerQuery = query.toLowerCase().trim();

  return items.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(lowerQuery);
    const excerptMatch = item.excerpt?.toLowerCase().includes(lowerQuery);
    const contentMatch = item.content?.toLowerCase().includes(lowerQuery);

    return titleMatch || excerptMatch || contentMatch;
  });
}

/**
 * Debounce function for search input
 */
export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Highlight search term in text
 */
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) {
    return text;
  }

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
}
