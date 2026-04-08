import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const SITE_NAME = "Interieur Expert";
export const SITE_DESCRIPTION =
  "Ontdek inspiratie, praktisch advies en de laatste trends voor een interieur dat bij je past. Eerlijk, toegankelijk en zonder poespas.";
export const SITE_LOCALE = "nl_BE";
type OpenGraphType = "website" | "article";

export const DEFAULT_OG_TYPE: OpenGraphType = "website";
const DEFAULT_OG_IMAGE = "/api/og";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string | null;
  type?: OpenGraphType;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
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
  publishedTime,
  modifiedTime,
  section,
  tags,
}: MetadataInput): Metadata {
  const normalizedPath = normalizePath(path);
  const ogImage = image || absoluteUrl(DEFAULT_OG_IMAGE);

  const openGraph: Metadata["openGraph"] = {
    type,
    locale: SITE_LOCALE,
    url: absoluteUrl(normalizedPath),
    siteName: SITE_NAME,
    title,
    description,
    images: [ogImage],
    ...(type === "article" && {
      publishedTime,
      modifiedTime: modifiedTime || publishedTime,
      section,
      tags,
    }),
  };

  return {
    title,
    description,
    alternates: {
      canonical: normalizedPath,
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

// --- JSON-LD builders ---

const publisherJsonLd = {
  "@type": "Organization",
  name: SITE_NAME,
  url: siteUrl,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icons/logo.svg"),
  },
};

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    description: SITE_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icons/logo.svg"),
    },
    sameAs: [
      "https://www.instagram.com/interieur.expert/",
      "https://www.facebook.com/de.interieur.expert/",
    ],
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
    publisher: publisherJsonLd,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/api/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    ],
  };
}

type ArticleJsonLdInput = {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string | null;
  author?: string | null;
  section?: string;
  tags?: string[];
  wordCount?: number;
};

export function buildArticleJsonLd({
  title,
  description,
  path,
  publishedAt,
  modifiedAt,
  image,
  author,
  section,
  tags,
  wordCount,
}: ArticleJsonLdInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    inLanguage: "nl-BE",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(path),
    },
    image: image ? [image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    author: {
      "@type": author ? "Person" : "Organization",
      name: author || SITE_NAME,
      ...(author ? {} : { url: siteUrl }),
    },
    publisher: publisherJsonLd,
    ...(section && { articleSection: section }),
    ...(tags && tags.length > 0 && { keywords: tags.join(", ") }),
    ...(wordCount && { wordCount }),
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
    contentUrl: `https://www.youtube.com/watch?v=${youtubeId}`,
    embedUrl: `https://www.youtube.com/embed/${youtubeId}`,
    thumbnailUrl: thumbnail
      ? [thumbnail]
      : [`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`],
    duration: duration ? `PT${duration}M` : undefined,
    publisher: publisherJsonLd,
    inLanguage: "nl-BE",
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
    image: image ? [image] : [absoluteUrl(DEFAULT_OG_IMAGE)],
    inLanguage: "nl-BE",
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