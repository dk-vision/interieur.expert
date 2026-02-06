import { getClient } from "../sanity/client";
import { urlForImage } from "../sanity/image";
import {
  featuredArticleQuery,
  latestArticlesQuery,
  latestVideosQuery,
  articleBySlugQuery,
  videoBySlugQuery,
  dossierBySlugQuery,
  articlesListingQuery,
  videosListingQuery,
  dossiersListingQuery,
  adCampaignQuery,
} from "../sanity/queries";
import {
  Article,
  Video,
  Dossier,
  HomepageData,
  ContentCardData,
  ListingOptions,
  AdCampaign,
} from "./types";

interface QueryOptions {
  draft?: boolean;
}

// Helper: Convert Sanity content naar ContentCardData
function toContentCardData(
  content: Article | Video | Dossier,
  size: "normal" | "large" = "normal"
): ContentCardData {
  const baseData: ContentCardData = {
    title: content.title,
    excerpt: content.excerpt,
    href:
      content._type === "article"
        ? `/${content.category || 'artikels'}/${content.slug}`
        : content._type === "video"
          ? `/video/${content.slug}`
          : `/dossiers/${content.slug}`,
    type: content._type,
    category: content._type !== "dossier" ? (content as Article | Video).category : undefined,
    tags: content.tags,
    publishedAt: new Date(content.publishedAt).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    isSponsored: content._type !== "dossier" && (content as Article | Video).sponsored,
    partnerName: content._type !== "dossier" ? (content as Article | Video).partner?.name : undefined,
    partnerUrl: content._type !== "dossier" ? (content as Article | Video).partner?.website : undefined,
    size,
  };

  // Add dossier sponsors if available
  if (content._type === "dossier" && content.sponsors && content.sponsors.length > 0) {
    baseData.sponsors = content.sponsors.map((s) => ({ 
      name: s.name, 
      slug: s.slug || s._id 
    }));
  }

  // Add image URL with null checks
  if (content._type === "article" && content.featuredImage) {
    baseData.image = urlForImage(content.featuredImage)
      .width(1200)
      .height(800)
      .url();
  } else if (content._type === "dossier" && content.featuredImage) {
    baseData.image = urlForImage(content.featuredImage)
      .width(1200)
      .height(800)
      .url();
  } else if (content._type === "video" && content.thumbnail) {
    baseData.image = urlForImage(content.thumbnail).width(1200).height(800).url();
  }

  // Add reading time or duration
  if (content._type === "article" && content.readingTime) {
    baseData.readingTime = content.readingTime;
  } else if (content._type === "video" && content.duration) {
    baseData.readingTime = content.duration;
  }

  return baseData;
}

// Homepage content
export async function getHomepageContent(
  options: QueryOptions = {}
): Promise<HomepageData> {
  const client = getClient(options.draft);

  const [featured, latest, videos] = await Promise.all([
    client.fetch<Article | null>(featuredArticleQuery),
    client.fetch<Article[]>(latestArticlesQuery),
    client.fetch<Video[]>(latestVideosQuery),
  ]);

  return {
    featured,
    latest,
    videos,
  };
}

// Article by slug
export async function getArticleBySlug(
  slug: string,
  options: QueryOptions = {}
): Promise<Article | null> {
  const client = getClient(options.draft);
  return client.fetch<Article | null>(articleBySlugQuery, { slug });
}

// Video by slug
export async function getVideoBySlug(
  slug: string,
  options: QueryOptions = {}
): Promise<Video | null> {
  const client = getClient(options.draft);
  return client.fetch<Video | null>(videoBySlugQuery, { slug });
}

// Dossier by slug
export async function getDossierBySlug(
  slug: string,
  options: QueryOptions = {}
): Promise<Dossier | null> {
  const client = getClient(options.draft);
  return client.fetch<Dossier | null>(dossierBySlugQuery, { slug });
}

// Get all dossiers
export async function getDossiers(
  options: QueryOptions = {}
): Promise<ContentCardData[]> {
  const client = getClient(options.draft);
  const dossiers = await client.fetch<Dossier[]>(dossiersListingQuery, {});
  return dossiers.map((dossier) => toContentCardData(dossier));
}

// Get listing
export async function getListing(
  options: ListingOptions
): Promise<ContentCardData[]> {
  const client = getClient(options.draft);

  let query;
  switch (options.type) {
    case "article":
      query = articlesListingQuery;
      break;
    case "video":
      query = videosListingQuery;
      break;
    case "dossier":
      query = dossiersListingQuery;
      break;
    default:
      return [];
  }

  const params: Record<string, string | undefined> = {};
  if (options.category) params.category = options.category;
  if (options.tag) params.tag = options.tag;

  const content = await client.fetch<(Article | Video | Dossier)[]>(query, params);

  return content.map((item) => toContentCardData(item));
}

// Get ad for slot
export async function getAdForSlot(
  slot: "listing-inline" | "article-inline" | "sidebar",
  context: { category?: string; tags?: string[] } = {},
  options: QueryOptions = {}
): Promise<AdCampaign | null> {
  const client = getClient(options.draft);

  return client.fetch<AdCampaign | null>(adCampaignQuery, {
    slot,
    category: context.category,
  });
}

// Export helper function for component usage
export { toContentCardData, urlForImage };
