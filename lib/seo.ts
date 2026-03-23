import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const SITE_NAME = "Interieur.Expert";
export const SITE_DESCRIPTION =
  "Ontdek inspiratie, praktisch advies en de laatste trends voor een interieur dat bij je past. Eerlijk, toegankelijk en zonder poespas.";
export const SITE_LOCALE = "nl_BE";
type OpenGraphType = "website" | "article";

export const DEFAULT_OG_TYPE: OpenGraphType = "website";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: OpenGraphType;
};

function normalizePath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path = "/") {
  return new URL(normalizePath(path), siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image,
  type = DEFAULT_OG_TYPE,
}: MetadataInput): Metadata {
  const normalizedPath = normalizePath(path);
  const images = image ? [image] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph: {
      type,
      locale: SITE_LOCALE,
      url: absoluteUrl(normalizedPath),
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images,
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    inLanguage: "nl-BE",
    description: SITE_DESCRIPTION,
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  image?: string | null;
  author?: string | null;
};

export function buildArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  image,
  author,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: publishedAt,
    inLanguage: "nl-BE",
    mainEntityOfPage: absoluteUrl(path),
    image: image ? [image] : undefined,
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
  };
}

type VideoJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  youtubeId: string;
  thumbnail?: string | null;
  duration?: number;
};

export function buildVideoJsonLd({
  title,
  description,
  path,
  publishedAt,
  youtubeId,
  thumbnail,
  duration,
}: VideoJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    uploadDate: publishedAt,
    url: absoluteUrl(path),
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    thumbnailUrl: thumbnail ? [thumbnail] : undefined,
    duration: duration ? `PT${duration}M` : undefined,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
    },
  };
}

type CollectionPageJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  image?: string | null;
};

export function buildCollectionPageJsonLd({
  title,
  description,
  path,
  publishedAt,
  image,
}: CollectionPageJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    datePublished: publishedAt,
    image: image ? [image] : undefined,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: siteUrl,
    },
  };
}

type PartnerJsonLdInput = {
  name: string;
  description: string;
  path: string;
  website?: string | null;
  logo?: string | null;
  socialLinks?: string[];
};

export function buildPartnerJsonLd({
  name,
  description,
  path,
  website,
  logo,
  socialLinks,
}: PartnerJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: absoluteUrl(path),
    sameAs: [website, ...(socialLinks || [])].filter(Boolean),
    logo: logo || undefined,
  };
}