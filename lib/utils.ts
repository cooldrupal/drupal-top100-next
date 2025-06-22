export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export function getPathFromSlug(slug: string[]) {
  return `/${slug.join("/")}`
}

/**
 * Generates a teaser from a given text, similar to Drupal's text_summary() function.
 * @param text - The input text to generate teaser from
 * @param length - Maximum length of the teaser (default: 200)
 * @param suffix - Suffix to append when text is trimmed (default: '...')
 * @returns The generated teaser
 */
export function textSummary(
  text: string,
  length: number = 200,
  suffix: string = '...'
): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  // Remove HTML tags if present
  const cleanText = text.replace(/<[^>]+>/g, '');

  // Trim whitespace
  const trimmedText = cleanText.trim();

  // If text is shorter than requested length, return as is
  if (trimmedText.length <= length) {
    return trimmedText;
  }

  // Find the last space before the cutoff point
  let teaser = trimmedText.substring(0, length);
  const lastSpace = teaser.lastIndexOf(' ');

  // Trim at the last space to avoid cutting words
  if (lastSpace > 0) {
    teaser = teaser.substring(0, lastSpace);
  }

  // Add suffix and return
  return teaser + suffix;
}

export function isEmpty(value: any): boolean {
  if (value == null) return true;

  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === 'object') return Object.keys(value).length === 0;

  return false;
}
