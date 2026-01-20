import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function checkAll() {
  const articles = await client.fetch(
    `*[_type == "article"] | order(category asc, publishedAt desc) {
      title,
      category,
      tags,
      "hasInternalLinks": count(body[].markDefs[_type == "internalArticleLink"]) > 0,
      "boldCount": count(body[].children[marks[0] == "strong"]),
      "quoteCount": count(body[style == "blockquote"])
    }`
  );

  const byCategory = articles.reduce((acc: any, article: any) => {
    const cat = article.category.toUpperCase();
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {});

  console.log("\n📊 FINAL ARTICLE OVERVIEW\n");
  
  for (const [category, arts] of Object.entries(byCategory) as any) {
    console.log(`${category} (${arts.length} articles):`);
    arts.forEach((a: any) => {
      const features = [];
      if (a.boldCount > 0) features.push(`✓ bold (${a.boldCount})`);
      if (a.quoteCount > 0) features.push(`✓ quotes (${a.quoteCount})`);
      if (a.hasInternalLinks) features.push("✓ links");
      console.log(`  - ${a.title}`);
      console.log(`    ${features.join(", ")}`);
      console.log(`    tags: ${a.tags.join(", ")}`);
    });
    console.log();
  }

  console.log(`${"=".repeat(60)}`);
  console.log(`✅ Total: ${articles.length} articles`);
  console.log(`${"=".repeat(60)}\n`);
}

checkAll();
