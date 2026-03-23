import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

export async function GET() {
  const body = [
    `# ${SITE_NAME}`,
    "",
    SITE_DESCRIPTION,
    "",
    `Canonical: ${absoluteUrl("/")}`,
    `Sitemap: ${absoluteUrl("/sitemap.xml")}`,
    "Language: nl-BE",
    "Content: interieurinspiratie, woonadvies, trends, dossiers, video en partnerverhalen.",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}