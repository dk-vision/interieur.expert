import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

type VideoEntry = {
  slug: string;
  title: string;
  description?: string;
  publishedAt: string;
  duration?: number;
  youtubeId: string;
  thumbnailUrl?: string;
};

const videoSitemapQuery = groq`
  *[_type == "video" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
    "slug": slug.current,
    title,
    "description": coalesce(seoDescription, excerpt),
    publishedAt,
    duration,
    youtubeId,
    "thumbnailUrl": thumbnail.asset->url
  }
`;

function xmlEscape(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function videoDurationToSeconds(durationInMinutes: number | undefined) {
  if (!durationInMinutes || durationInMinutes <= 0) return undefined;
  return Math.round(durationInMinutes * 60).toString();
}

export async function GET() {
  const videos = await sanityFetch<VideoEntry[]>({ query: videoSitemapQuery });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${videos
  .filter((video) => Boolean(video.slug && video.title && video.youtubeId))
  .map((video) => {
    const pageUrl = absoluteUrl(`/video/${video.slug}`);
    const thumbnailUrl = video.thumbnailUrl || `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
    const embedUrl = `https://www.youtube-nocookie.com/embed/${video.youtubeId}`;
    const publicationDate = new Date(video.publishedAt).toISOString();
    const duration = videoDurationToSeconds(video.duration);
    return `  <url>
    <loc>${xmlEscape(pageUrl)}</loc>
    <video:video>
      <video:thumbnail_loc>${xmlEscape(thumbnailUrl)}</video:thumbnail_loc>
      <video:title>${xmlEscape(video.title)}</video:title>
      <video:description>${xmlEscape(video.description || video.title)}</video:description>
      <video:player_loc>${xmlEscape(embedUrl)}</video:player_loc>
      <video:publication_date>${publicationDate}</video:publication_date>
      ${duration ? `<video:duration>${xmlEscape(duration)}</video:duration>` : ""}
    </video:video>
  </url>`;
  })
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
