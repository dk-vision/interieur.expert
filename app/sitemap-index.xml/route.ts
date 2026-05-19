import { absoluteUrl } from "@/lib/seo";

export const revalidate = 3600;

export async function GET() {
  const sitemaps = [
    absoluteUrl("/sitemap.xml"),
    absoluteUrl("/sitemap-images.xml"),
    absoluteUrl("/sitemap-videos.xml"),
  ];

  const now = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (url) => `  <sitemap>
    <loc>${url}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
