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
  sponsorDisclosure,
  featured
`;

const fullPartnerFragment = groq`
  ${partnerFragment},
  about,
  socialMedia,
  showrooms,
  gallery[]{ _key, caption, asset->{_id, url, metadata{dimensions}} },
  "stories": stories[!defined(expiresAt) || expiresAt > now()]{ _key, caption, link, linkLabel, publishedAt, image{ asset->{_id, url, metadata{dimensions}} }, video{ asset->{_id, url, mimeType} } } | order(publishedAt desc)[0...20],
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
  seoTitle,
  seoDescription
`;

// Article fields
const articleFields = groq`
  ${baseContentFields},
  featuredImage,
  pinned,
  pinnedAt,
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
      imageMobile,
      imageTablet,
      imageDesktop,
      html,
      linkUrl,
      altText
    }
  }
`;

// Homepage queries
export const featuredArticleQuery = groq`
  *[_type == "article" && defined(publishedAt) && publishedAt <= now() && showInTopicListings != false] | order(select(pinned == true => 0, 1), publishedAt desc) [0] {
    ${articleFields}
  }
`;

export const latestArticlesQuery = groq`
  *[_type == "article" && defined(publishedAt) && publishedAt <= now() && showInTopicListings != false] | order(select(pinned == true => 0, 1), publishedAt desc) [1..7] {
    ${articleFields}
  }
`;

export const latestVideosQuery = groq`
  *[_type == "video" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0..2] {
    ${videoFields}
  }
`;

// Homepage dossiers (thumbnail only, no contained articles)
export const latestDossiersQuery = groq`
  *[_type == "dossier" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) [0..2] {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    featuredImage,
    publishedAt,
    tags,
    themes,
    "sponsors": sponsors[]->{
      _id,
      name,
      "slug": slug.current,
      website,
      logo
    }
  }
`;

// Article detail
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields},
    "dossier": *[_type == "dossier" && references(^._id)][0] {
      title,
      "slug": slug.current,
      "articles": articles[]->{
        _id,
        _type,
        title,
        "slug": slug.current,
        excerpt,
        category,
        featuredImage,
        publishedAt,
        readingTime
      }
    }
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
    && defined(publishedAt) && publishedAt <= now()
    && showInTopicListings != false
    ${`&& (!defined($category) || category == $category)`}
    ${`&& (!defined($tag) || $tag in tags)`}
  ] | order(select(pinned == true => 0, 1), publishedAt desc) {
    ${articleFields}
  }
`;

export const videosListingQuery = groq`
  *[_type == "video"
    && defined(publishedAt) && publishedAt <= now()
    ${`&& (!defined($category) || category == $category)`}
    ${`&& (!defined($tag) || $tag in tags)`}
  ] | order(publishedAt desc) {
    ${videoFields}
  }
`;

export const dossiersListingQuery = groq`
  *[_type == "dossier" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    ${dossierFields}
  }
`;

// Related articles query - finds articles with matching tags
export const relatedArticlesQuery = groq`
  *[_type == "article" 
    && _id != $currentId
    && defined(publishedAt) && publishedAt <= now()
    && count((tags[])[@ in $tags]) > 0
  ] | order(count((tags[])[@ in $tags]) desc, publishedAt desc) [0..2] {
    ${articleFields}
  }
`;

// Related videos query - finds videos with matching tags, fallback to recent
export const relatedVideosQuery = groq`
  *[_type == "video"
    && _id != $currentId
    && defined(publishedAt) && publishedAt <= now()
    && count((tags[])[@ in $tags]) > 0
  ] | order(count((tags[])[@ in $tags]) desc, publishedAt desc) [0..2] {
    ${videoFields}
  }
`;

// Partner queries
export const partnersWithStoriesQuery = groq`
  *[_type == "partner" && defined(slug.current) && count(stories[!defined(expiresAt) || expiresAt > now()]) > 0] | order(featured desc, name asc) {
    _id,
    name,
    "slug": slug.current,
    logo,
    brandColor,
    "storyCount": count(stories[!defined(expiresAt) || expiresAt > now()]),
    "latestStory": stories[!defined(expiresAt) || expiresAt > now()] | order(publishedAt desc) [0] {
      _key, image{ asset->{url} }
    }
  }
`;

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

// Redirects
export const redirectsQuery = groq`
  *[_type == "redirect"] {
    source,
    destination,
    permanent
  }
`;


