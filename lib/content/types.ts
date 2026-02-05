import type { PortableTextBlock } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Base content types
export interface Partner {
  _id: string;
  name: string;
  website: string;
  logo?: SanityImageSource;
  brandColor?: string;
}

export interface BaseContent {
  _id: string;
  _type: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  sponsored: boolean;
  partner?: Partner;
  sponsorDisclosure?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article extends BaseContent {
  _type: "article";
  featuredImage: SanityImageSource;
  body: PortableTextBlock[];
  author?: string;
  readingTime?: number;
}

export interface Video extends BaseContent {
  _type: "video";
  thumbnail: SanityImageSource;
  youtubeId: string;
  transcript?: PortableTextBlock[];
  duration?: number;
}

export interface Dossier extends BaseContent {
  _type: "dossier";
  featuredImage: SanityImageSource;
  intro?: PortableTextBlock[];
  theme?: string;
  sponsors?: Partner[];
  articles?: (Article | Video)[];
}

export interface AdCreative {
  _id: string;
  title: string;
  format: "image" | "html";
  image?: SanityImageSource;
  html?: string;
  linkUrl?: string;
  altText?: string;
}

export interface AdCampaign {
  _id: string;
  title: string;
  slot: "listing-inline" | "article-inline" | "sidebar";
  creative: AdCreative;
}

// Content Card Props (voor bestaande components)
export interface ContentCardData {
  title: string;
  excerpt: string;
  href: string;
  type: "article" | "video" | "dossier";
  category?: string;
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
  isSponsored?: boolean;
  partnerName?: string;
  partnerUrl?: string;
  sponsorNames?: string; // For dossiers with multiple sponsors
  image?: string;
  size?: "normal" | "large";
}

// Homepage data
export interface HomepageData {
  featured: Article | null;
  latest: Article[];
  videos: Video[];
}

// Listing options
export interface ListingOptions {
  type: "article" | "video" | "dossier";
  category?: string;
  tag?: string;
  draft?: boolean;
}
