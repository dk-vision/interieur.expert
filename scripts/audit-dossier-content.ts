/**
 * One-off content audit: checks length, paragraph-length uniformity, and
 * internal-link density for articles in the "gordijnen" and "verlichting" dossiers.
 *
 * Usage: tsx scripts/audit-dossier-content.ts
 */
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
});

type Span = { _type: "span"; text: string; marks?: string[] };
type Block = {
  _type: string;
  style?: string;
  children?: Span[];
  markDefs?: { _key: string; _type: string }[];
};

function blockText(block: Block): string {
  return (block.children || []).map((c) => c.text || "").join("");
}

function analyzeArticle(title: string, slug: string, body: Block[]) {
  const paragraphs = body.filter((b) => b._type === "block" && b.style === "normal");
  const headings = body.filter((b) => b._type === "block" && (b.style === "h2" || b.style === "h3"));
  const quotes = body.filter((b) => b._type === "block" && b.style === "blockquote");
  const words = body
    .filter((b) => b._type === "block")
    .map(blockText)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const paraLengths = paragraphs.map((p) => blockText(p).trim().split(/\s+/).filter(Boolean).length);
  const avg = paraLengths.reduce((a, b) => a + b, 0) / (paraLengths.length || 1);
  const variance =
    paraLengths.reduce((sum, l) => sum + (l - avg) ** 2, 0) / (paraLengths.length || 1);
  const stdev = Math.sqrt(variance);
  const coefVar = avg > 0 ? stdev / avg : 0;

  let strongCount = 0;
  let emCount = 0;
  let internalLinkCount = 0;
  let externalLinkCount = 0;
  for (const b of body) {
    if (b._type !== "block") continue;
    for (const span of b.children || []) {
      for (const mark of span.marks || []) {
        if (mark === "strong") strongCount++;
        if (mark === "em") emCount++;
        const def = (b.markDefs || []).find((d) => d._key === mark);
        if (def?._type === "internalArticleLink") internalLinkCount++;
        if (def?._type === "link") externalLinkCount++;
      }
    }
  }

  console.log(`\n### ${title}`);
  console.log(`  slug: ${slug}`);
  console.log(`  woorden: ${words}`);
  console.log(`  paragrafen: ${paragraphs.length} (gem. ${avg.toFixed(1)} woorden, stdev ${stdev.toFixed(1)}, cv ${coefVar.toFixed(2)})`);
  console.log(`  koppen: ${headings.length}, quotes: ${quotes.length}`);
  console.log(`  bold-marks: ${strongCount}, em-marks: ${emCount}`);
  console.log(`  interne links in tekst: ${internalLinkCount}, externe links: ${externalLinkCount}`);
  console.log(`  paragraaflengtes: [${paraLengths.join(", ")}]`);
}

async function main() {
  const dossiers = await client.fetch(
    `*[_type == "dossier" && (slug.current match "gordijnen*" || slug.current match "verlichting*")]{
      title,
      "slug": slug.current,
      "articles": articles[]->{
        _type,
        title,
        "slug": slug.current,
        publishedAt,
        body
      }
    }`
  );

  for (const dossier of dossiers) {
    console.log(`\n==================== DOSSIER: ${dossier.title} (${dossier.slug}) ====================`);
    for (const item of dossier.articles || []) {
      if (!item || item._type !== "article") continue;
      analyzeArticle(item.title, item.slug, item.body || []);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
