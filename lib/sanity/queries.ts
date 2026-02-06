import { groq } from "next-sanity";

// Partner fragment
const partnerFragment = groq`
  _id,
  name,
  "slug": slug.current,
  description,
  website,
  logo,
  brandColor,
  featured
`;

const fullPartnerFragment = groq`
  ${partnerFragment},
  about,
  socialMedia,
  showrooms,
  contractStart,
  contractEnd
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
  body[]{
    ...,
    markDefs[]{
      ...,
      _type == "internalArticleLink" => {
        ...,
        "reference": reference->{
          "slug": slug,
          category
        }
      }
    }
  },
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
  _id,
  _type,
  title,
  "slug": slug.current,
  excerpt,
  tags,
  publishedAt,
  seoTitle,
  seoDescription,
  featuredImage,
  intro,
  themes,
  "sponsors": sponsors[]->{
    _id,
    name,
    "slug": slug.current,
    website,
    logo
  },
  "articles": articles[]->{
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    featuredImage,
    thumbnail,
    readingTime,
    sponsored,
    duration,
    "previewVideoUrl": previewVideo.asset->url,
    "partner": partner->{
      name,
      "slug": slug.current,
      website
    }
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
  *[_type == "dossier"] | order(publishedAt desc) {
    ${dossierFields}
  }
`;

// Related articles query - finds articles with matching tags
export const relatedArticlesQuery = groq`
  *[_type == "article" 
    && _id != $currentId
    && count((tags[])[@ in $tags]) > 0
  ] | order(count((tags[])[@ in $tags]) desc, publishedAt desc) [0..2] {
    ${articleFields}
  }
`;

// Partner queries
export const allPartnersQuery = groq`
  *[_type == "partner" && defined(slug.current)] | order(featured desc, name asc) {
    ${partnerFragment}
  }
`;

export const featuredPartnersQuery = groq`
  *[_type == "partner" && featured == true && defined(slug.current)] | order(name asc) {
    ${partnerFragment}
  }
`;

export const partnerBySlugQuery = groq`
  *[_type == "partner" && slug.current == $slug][0] {
    ${fullPartnerFragment},
    "sponsoredArticles": *[_type == "article" && sponsored == true && references(^._id)] | order(publishedAt desc) [0..9] {
      ${baseContentFields},
      featuredImage,
      readingTime
    },
    "activeCampaigns": *[_type == "adCampaign" && references(^._id) && active == true] | order(priority desc) {
      _id,
      title,
      slot,
      startDate,
      endDate,
      priority
    }
  }
`;


