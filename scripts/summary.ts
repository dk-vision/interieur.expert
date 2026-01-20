import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function summary() {
  console.log("\n📊 CONTENT SUMMARY\n");

  const articles = await client.fetch(
    `*[_type == "article"] | order(category asc) { title, category, tags }`
  );

  const videos = await client.fetch(
    `*[_type == "video"] | order(category asc) { title, category, duration }`
  );

  // Group articles by category
  const articlesByCategory = articles.reduce((acc: any, article: any) => {
    const cat = article.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(article);
    return acc;
  }, {});

  // Group videos by category
  const videosByCategory = videos.reduce((acc: any, video: any) => {
    const cat = video.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(video);
    return acc;
  }, {});

  console.log("📝 ARTICLES:");
  for (const [category, items] of Object.entries(articlesByCategory) as any) {
    console.log(`\n  ${category.toUpperCase()} (${items.length}):`);
    items.forEach((item: any) => {
      console.log(`    • ${item.title}`);
    });
  }

  console.log(`\n\n🎬 VIDEOS:`);
  for (const [category, items] of Object.entries(videosByCategory) as any) {
    console.log(`\n  ${category.toUpperCase()} (${items.length}):`);
    items.forEach((item: any) => {
      console.log(`    • ${item.title} (${item.duration}min)`);
    });
  }

  console.log(`\n${"=".repeat(60)}`);
  console.log(`✅ Total: ${articles.length} articles + ${videos.length} videos`);
  console.log(`${"=".repeat(60)}\n`);
}

summary();
