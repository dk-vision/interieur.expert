import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";

// A tag page is only useful (and indexable) once enough published articles carry it.
export const MIN_INDEXABLE_TAG_ARTICLES = 3;

const publishedArticleTagsQuery = groq`
  *[_type == "article" && defined(publishedAt) && publishedAt <= now()].tags[]
`;

/** Tags carried by at least MIN_INDEXABLE_TAG_ARTICLES currently published articles. */
export async function getIndexableTags(): Promise<string[]> {
  const tags = await sanityFetch<string[]>({ query: publishedArticleTagsQuery }).catch(() => []);
  const counts = new Map<string, number>();
  for (const tag of tags) {
    if (!tag) continue;
    counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_INDEXABLE_TAG_ARTICLES)
    .map(([tag]) => tag);
}
