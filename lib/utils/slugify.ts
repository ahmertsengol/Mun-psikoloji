/**
 * Slugify utility for Turkish characters
 * Converts Turkish text to URL-friendly slugs
 */

const turkishCharMap: Record<string, string> = {
  ç: 'c',
  Ç: 'C',
  ğ: 'g',
  Ğ: 'G',
  ı: 'i',
  İ: 'I',
  ö: 'o',
  Ö: 'O',
  ş: 's',
  Ş: 'S',
  ü: 'u',
  Ü: 'U',
};

/**
 * Converts a string to a URL-friendly slug
 * Handles Turkish characters and special characters
 * @param text - The text to slugify
 * @returns The slugified string
 */
export function slugify(text: string): string {
  // Replace Turkish characters
  let slug = text;
  Object.entries(turkishCharMap).forEach(([char, replacement]) => {
    slug = slug.replace(new RegExp(char, 'g'), replacement);
  });

  // Convert to lowercase and replace spaces and special chars
  slug = slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

  return slug;
}

/**
 * Generates a unique slug by appending a timestamp or number if needed
 * @param baseSlug - The base slug to make unique
 * @param existingSlugs - Array of existing slugs to check against
 * @returns A unique slug
 */
export function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: string[]
): string {
  let slug = baseSlug;
  let counter = 1;

  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
