import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function checkCategories() {
  const articles = await client.fetch(`*[_type == 'article'] { title, category } | order(category asc)`);
  
  const grouped: any = {};
  articles.forEach((a: any) => {
    if (!grouped[a.category]) grouped[a.category] = [];
    grouped[a.category].push(a.title);
  });
  
  console.log("\n📊 ARTICLES PER CATEGORY\n");
  Object.keys(grouped).forEach(cat => {
    console.log(`\n${cat.toUpperCase()} (${grouped[cat].length} articles):`);
    grouped[cat].forEach((title: string) => console.log(`  - ${title}`));
  });
  
  console.log(`\n✅ Total: ${articles.length} articles\n`);
}

checkCategories();
