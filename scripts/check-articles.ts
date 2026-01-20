import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function checkArticles() {
  const articles = await client.fetch(`
    *[_type == 'article'] {
      _id,
      title,
      'slug': slug.current,
      'bodyLength': length(pt::text(body)),
      seoTitle,
      seoDescription
    }
  `);

  console.log("\n📊 ARTICLE ANALYSIS\n");
  console.log(`Total articles: ${articles.length}\n`);

  // Find articles without proper SEO
  const noSEO = articles.filter(
    (a: any) => !a.seoTitle || !a.seoDescription
  );
  console.log(`❌ Articles without proper SEO: ${noSEO.length}`);
  noSEO.forEach((a: any) => {
    console.log(`   - [${a.bodyLength} chars] ${a.title}`);
  });

  // Find short articles (< 500 chars)
  const shortArticles = articles.filter((a: any) => (a.bodyLength || 0) < 500);
  console.log(`\n❌ Short articles (< 500 chars): ${shortArticles.length}`);
  shortArticles.forEach((a: any) => {
    console.log(`   - [${a.bodyLength} chars] ${a.title}`);
  });

  // Check for duplicates based on similar titles
  console.log("\n🔍 Checking for potential duplicates...\n");
  const titleMap = new Map();
  articles.forEach((a: any) => {
    const normalizedTitle = a.title.toLowerCase().trim();
    const similar = Array.from(titleMap.keys()).find((key) =>
      key.includes(normalizedTitle.substring(0, 20))
    );
    if (similar) {
      titleMap.get(similar).push(a);
    } else {
      titleMap.set(normalizedTitle, [a]);
    }
  });

  titleMap.forEach((group, title) => {
    if (group.length > 1) {
      console.log(`Duplicate group (${group.length} articles):`);
      group.forEach((a: any) => {
        const seo = a.seoTitle ? "✅ SEO" : "❌ No SEO";
        console.log(`   - [${a.bodyLength} chars] [${seo}] ${a.title}`);
      });
      console.log("");
    }
  });

  // Articles to delete recommendation
  console.log("\n🗑️  RECOMMENDATION: Delete these articles\n");
  const toDelete = articles.filter((a: any) => {
    // Delete if short OR (no SEO and there's a better version)
    const isShort = (a.bodyLength || 0) < 500;
    const hasNoSEO = !a.seoTitle || !a.seoDescription;
    const hasShortBody = (a.bodyLength || 0) < 1000;

    return isShort || (hasNoSEO && hasShortBody);
  });

  toDelete.forEach((a: any) => {
    console.log(`   - ${a.title} [${a.bodyLength} chars]`);
    console.log(`     ID: ${a._id}`);
  });

  console.log(`\n📋 Total to delete: ${toDelete.length} articles`);
}

checkArticles();
