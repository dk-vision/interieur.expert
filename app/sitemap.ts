import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { getArticleUrl } from "@/lib/utils/urls";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 3600;

const MIN_INDEXABLE_TAG_ARTICLES = 3;

interface SitemapDocument {
  slug: string;
  _updatedAt: string;
}

interface SitemapArticleDocument extends SitemapDocument {
  category?: string;
}

interface SitemapData {
  articles: SitemapArticleDocument[];
  videos: SitemapDocument[];
  dossiers: SitemapDocument[];
  partners: SitemapDocument[];
  tagCounts: Array<{ tag: string; articleCount: number }>;
}

const sitemapQuery = groq`
  {
    "articles": *[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      category,
      _updatedAt
    },
    "videos": *[_type == "video" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      _updatedAt
    },
    "dossiers": *[_type == "dossier" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      _updatedAt
    },
    "partners": *[_type == "partner" && defined(slug.current)] {
      "slug": slug.current,
      _updatedAt
    },
    "tagCounts": array::unique(*[_type == "article" && defined(publishedAt) && publishedAt <= now()].tags[])[defined(@)]{
      "tag": @,
      "articleCount": count(*[_type == "article" && defined(publishedAt) && publishedAt <= now() && @ in tags])
    }
  }
`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const data = await sanityFetch<SitemapData>({ query: sitemapQuery });

  const staticRoutes = [
    { path: "/", changeFrequency: "daily" as const, priority: 1 },
    { path: "/adverteren", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/advies", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/dossiers", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/inspiratie", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/over", changeFrequency: "monthly" as const, priority: 0.5 },
    { path: "/partners", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/privacy", changeFrequency: "monthly" as const, priority: 0.4 },
    { path: "/trends", changeFrequency: "daily" as const, priority: 0.8 },
    { path: "/video", changeFrequency: "daily" as const, priority: 0.8 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: new URL(route.path, siteUrl).toString(),
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...data.articles.map((article) => ({
      url: new URL(getArticleUrl(article.slug, article.category), siteUrl).toString(),
      lastModified: new Date(article._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...data.videos.map((video) => ({
      url: new URL(`/video/${video.slug}`, siteUrl).toString(),
      lastModified: new Date(video._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...data.dossiers.map((dossier) => ({
      url: new URL(`/dossiers/${dossier.slug}`, siteUrl).toString(),
      lastModified: new Date(dossier._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...data.partners.map((partner) => ({
      url: new URL(`/partners/${partner.slug}`, siteUrl).toString(),
      lastModified: new Date(partner._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...data.tagCounts
      .filter(
        (entry): entry is { tag: string; articleCount: number } =>
          typeof entry?.tag === "string" && entry.tag.length > 0 && entry.articleCount >= MIN_INDEXABLE_TAG_ARTICLES
      )
      .map(({ tag }) => ({
        url: new URL(`/tags/${encodeURIComponent(tag)}`, siteUrl).toString(),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      })),
  ];
}