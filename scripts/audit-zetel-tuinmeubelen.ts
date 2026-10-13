import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

type Span = { _type: "span"; text: string; marks?: string[] };
type Block = { _type: string; style?: string; children?: Span[]; markDefs?: { _key: string; _type: string }[] };

function blockText(block: Block): string {
  return (block.children || []).map((c) => c.text || "").join("");
}

function analyze(title: string, slug: string, body: Block[]) {
  const paragraphs = body.filter((b) => b._type === "block" && b.style === "normal");
  const words = body
    .filter((b) => b._type === "block")
    .map(blockText)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const paraLengths = paragraphs.map((p) => blockText(p).trim().split(/\s+/).filter(Boolean).length);
  const avg = paraLengths.reduce((a, b) => a + b, 0) / (paraLengths.length || 1);
  const variance = paraLengths.reduce((s, l) => s + (l - avg) ** 2, 0) / (paraLengths.length || 1);
  const cv = avg > 0 ? Math.sqrt(variance) / avg : 0;

  let strongCount = 0;
  let internalLinks = 0;
  for (const b of body) {
    if (b._type !== "block") continue;
    for (const span of b.children || []) {
      for (const mark of span.marks || []) {
        if (mark === "strong") strongCount++;
        if ((b.markDefs || []).some((d) => d._key === mark && d._type === "internalArticleLink")) internalLinks++;
      }
    }
  }

  console.log(`\n### ${title}`);
  console.log(`  slug: ${slug} | woorden: ${words} | paragrafen: ${paragraphs.length} (cv ${cv.toFixed(2)}) | bold: ${strongCount} | interne links: ${internalLinks}`);
}

async function main() {
  const slugs = [
    "stof-of-leren-zetel-kiezen",
    "modulaire-sofa-kiezen-voordelen-tips",
    "kwalitatieve-zetel-herkennen",
    "welke-zetel-past-bij-jou",
    "zetel-afmetingen-woonkamer",
    "zetel-testen-in-de-winkel",
    "beste-materiaal-voor-tuinmeubelen",
    "teak-tuinmeubelen-onderhoud",
    "welke-tuinmeubelen-kunnen-buiten-blijven-staan",
  ];
  const docs = await client.fetch(
    `*[_type == "article" && slug.current in $slugs && !(_id in path("drafts.**"))]{title, "slug": slug.current, body}`,
    { slugs }
  );
  for (const d of docs as any[]) analyze(d.title, d.slug, d.body || []);
}

main();
