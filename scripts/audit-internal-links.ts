/**
 * Site-wide internal-linking audit: for every published article, counts in-text
 * internal links (internalArticleLink marks) vs. available link opportunities
 * (other published articles sharing at least one tag). Flags high-opportunity,
 * zero-link articles.
 *
 * Usage: tsx scripts/audit-internal-links.ts
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
});

type Block = {
  _type: string;
  markDefs?: { _key: string; _type: string }[];
  children?: { marks?: string[] }[];
};

type ArticleDoc = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  tags?: string[];
  publishedAt: string;
  body: Block[];
};

function countInternalLinks(body: Block[]): number {
  let count = 0;
  for (const b of body || []) {
    if (b._type !== "block") continue;
    for (const span of b.children || []) {
      for (const mark of span.marks || []) {
        if ((b.markDefs || []).some((d) => d._key === mark && d._type === "internalArticleLink")) {
          count++;
        }
      }
    }
  }
  return count;
}

async function main() {
  const articles: ArticleDoc[] = await client.fetch(
    `*[_type == "article" && defined(publishedAt) && publishedAt <= now()]{
      _id, title, "slug": slug.current, category, tags, publishedAt, body
    }`
  );

  const byTag = new Map<string, ArticleDoc[]>();
  for (const a of articles) {
    for (const tag of a.tags || []) {
      if (!byTag.has(tag)) byTag.set(tag, []);
      byTag.get(tag)!.push(a);
    }
  }

  const rows = articles.map((a) => {
    const linkCount = countInternalLinks(a.body);
    const relatedByTag = new Set<string>();
    for (const tag of a.tags || []) {
      for (const other of byTag.get(tag) || []) {
        if (other._id !== a._id) relatedByTag.add(other._id);
      }
    }
    return {
      title: a.title,
      slug: a.slug,
      category: a.category,
      tags: a.tags || [],
      linkCount,
      opportunities: relatedByTag.size,
    };
  });

  const noLinksWithOpportunities = rows
    .filter((r) => r.linkCount === 0 && r.opportunities >= 2)
    .sort((a, b) => b.opportunities - a.opportunities);

  const noTagsAtAll = rows.filter((r) => r.tags.length === 0);

  console.log(`Totaal gepubliceerde artikelen: ${articles.length}`);
  console.log(`Artikelen zonder enige interne link in de tekst: ${rows.filter((r) => r.linkCount === 0).length}`);
  console.log(`Artikelen zonder tags (geen automatische linkkansen te berekenen): ${noTagsAtAll.length}`);
  console.log(`\nTop ${Math.min(25, noLinksWithOpportunities.length)} grootste kansen (0 links, maar wel verwante artikelen via gedeelde tags):\n`);

  noLinksWithOpportunities.slice(0, 25).forEach((r, i) => {
    console.log(`${i + 1}. [${r.category}] ${r.title}`);
    console.log(`   /${r.category}/${r.slug} — tags: ${r.tags.join(", ") || "(geen)"} — ${r.opportunities} verwante artikelen beschikbaar`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
