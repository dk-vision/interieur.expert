import { groq } from "next-sanity";

// Partner fragment
const partnerFragment = groq`
  _id,
  name,
  website,
  logo,
  brandColor
`;

// Base content fields
const baseContentFields = groq`
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  category,
  tags,
  publishedAt,
  sponsored,
  "partner": partner->{${partnerFragment}},
  sponsorDisclosure,
  seoTitle,
  seoDescription
`;

// Article fields
const articleFields = groq`
  ${baseContentFields},
  featuredImage,
  body,
  author,
  readingTime
`;

// Video fields
const videoFields = groq`
  ${baseContentFields},
  thumbnail,
  youtubeId,
  transcript,
  duration
`;

// Dossier fields
const dossierFields = groq`
  ${baseContentFields},
  featuredImage,
  intro,
  "articles": articles[]->{
    ${baseContentFields},
    featuredImage,
    readingTime
  }
`;

// Ad campaign query
export const adCampaignQuery = groq`
  *[_type == "adCampaign" 
    && slot == $slot 
    && active == true
    && startDate <= now()
    && endDate >= now()
    && (!defined(targetCategory) || targetCategory == $category)
  ] | order(priority desc) [0] {
    _id,
    title,
    slot,
    "creative": creative->{
      _id,
      title,
      format,
      image,
      html,
      linkUrl,
      altText
    }
  }
`;

// Homepage queries
export const featuredArticleQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [0] {
    ${articleFields}
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) [1..7] {
    ${articleFields}
  }
`;

export const latestVideosQuery = groq`
  *[_type == "video"] | order(publishedAt desc) [0..2] {
    ${videoFields}
  }
`;

// Article detail
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields}
  }
`;

// Video detail
export const videoBySlugQuery = groq`
  *[_type == "video" && slug.current == $slug][0] {
    ${videoFields}
  }
`;

// Dossier detail
export const dossierBySlugQuery = groq`
  *[_type == "dossier" && slug.current == $slug][0] {
    ${dossierFields}
  }
`;

// Listings
export const articlesListingQuery = groq`
  *[_type == "article" 
    ${`&& (!defined($category) || category == $category)`}
    ${`&& (!defined($tag) || $tag in tags)`}
  ] | order(publishedAt desc) {
    ${articleFields}
  }
`;

export const videosListingQuery = groq`
  *[_type == "video"
    ${`&& (!defined($category) || category == $category)`}
    ${`&& (!defined($tag) || $tag in tags)`}
  ] | order(publishedAt desc) {
    ${videoFields}
  }
`;

export const dossiersListingQuery = groq`
  *[_type == "dossier"
    ${`&& (!defined($category) || category == $category)`}
  ] | order(publishedAt desc) {
    ${dossierFields}
  }
`;
