import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/client";
import { absoluteUrl } from "@/lib/seo";
import { getArticleUrl } from "@/lib/utils/urls";

export const revalidate = 3600;

type ImageEntry = {
  url: string;
  imageUrl: string;
  caption?: string;
};

type ImageSitemapData = {
  articles: Array<{ slug: string; category?: string; title: string; imageUrl?: string }>;
  videos: Array<{ slug: string; title: string; imageUrl?: string }>;
  dossiers: Array<{ slug: string; title: string; imageUrl?: string }>;
  partners: Array<{ slug: string; title: string; imageUrl?: string }>;
};

const imageSitemapQuery = groq`
  {
    "articles": *[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      category,
      title,
      "imageUrl": featuredImage.asset->url
    },
    "videos": *[_type == "video" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      title,
      "imageUrl": thumbnail.asset->url
    },
    "dossiers": *[_type == "dossier" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] {
      "slug": slug.current,
      title,
      "imageUrl": featuredImage.asset->url
    },
    "partners": *[_type == "partner" && defined(slug.current)] {
      "slug": slug.current,
      title,
      "imageUrl": logo.asset->url
    }
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

export async function GET() {
  const data = await sanityFetch<ImageSitemapData>({ query: imageSitemapQuery });

  const entries: ImageEntry[] = [
    ...data.articles
      .filter((entry) => Boolean(entry.slug && entry.imageUrl))
      .map((entry) => ({
        url: absoluteUrl(getArticleUrl(entry.slug, entry.category)),
        imageUrl: entry.imageUrl as string,
        caption: entry.title,
      })),
    ...data.videos
      .filter((entry) => Boolean(entry.slug && entry.imageUrl))
      .map((entry) => ({
        url: absoluteUrl(`/video/${entry.slug}`),
        imageUrl: entry.imageUrl as string,
        caption: entry.title,
      })),
    ...data.dossiers
      .filter((entry) => Boolean(entry.slug && entry.imageUrl))
      .map((entry) => ({
        url: absoluteUrl(`/dossiers/${entry.slug}`),
        imageUrl: entry.imageUrl as string,
        caption: entry.title,
      })),
    ...data.partners
      .filter((entry) => Boolean(entry.slug && entry.imageUrl))
      .map((entry) => ({
        url: absoluteUrl(`/partners/${entry.slug}`),
        imageUrl: entry.imageUrl as string,
        caption: entry.title,
      })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (entry) => `  <url>
    <loc>${xmlEscape(entry.url)}</loc>
    <image:image>
      <image:loc>${xmlEscape(entry.imageUrl)}</image:loc>
      ${entry.caption ? `<image:caption>${xmlEscape(entry.caption)}</image:caption>` : ""}
    </image:image>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
