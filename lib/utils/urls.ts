/**
 * Generate the proper URL for an article based on its category
 * SEO improvement: /category/slug instead of /artikels/slug
 */
export function getArticleUrl(slug: string, category?: string): string {
  // Default to 'artikels' if no category provided for backwards compatibility
  const cat = category || 'artikels';
  return `/${cat}/${slug}`;
}

/**
 * Generate URL for any content type
 */
export function getContentUrl(
  slug: string,
  type: 'article' | 'video' | 'dossier',
  category?: string
): string {
  switch (type) {
    case 'article':
      return getArticleUrl(slug, category);
    case 'video':
      return `/video/${slug}`;
    case 'dossier':
      return `/dossiers/${slug}`;
    default:
      return `/${slug}`;
  }
}
