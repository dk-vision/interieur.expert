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

function countEmDash(body: any[]): number {
  let count = 0;
  for (const b of body || []) {
    if (b._type === "block") {
      for (const c of b.children || []) {
        count += (c.text?.match(/—/g) || []).length;
      }
    }
    if (b._type === "rawHtml") {
      count += (b.code?.match(/—/g) || []).length;
    }
  }
  return count;
}

async function main() {
  const types = ["article", "dossier", "video", "partner"];
  for (const type of types) {
    const field = type === "dossier" ? "intro" : "body";
    const docs = await client.fetch(
      `*[_type == $type && !(_id in path("drafts.**"))]{_id, title, "slug": slug.current, ${field}}`,
      { type }
    );
    let totalDocs = 0;
    let totalDashes = 0;
    const perDoc: { title: string; slug: string; count: number }[] = [];
    for (const d of docs as any[]) {
      const n = countEmDash(d[field]);
      if (n > 0) {
        totalDocs++;
        totalDashes += n;
        perDoc.push({ title: d.title, slug: d.slug, count: n });
      }
    }
    console.log(`\n${type}: ${totalDocs}/${docs.length} documenten met em-dash, totaal ${totalDashes} keer`);
    perDoc
      .sort((a, b) => b.count - a.count)
      .forEach((d) => console.log(`  ${d.count}x  ${d.slug}`));
  }
}
main();
