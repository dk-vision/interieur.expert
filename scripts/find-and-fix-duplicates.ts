import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function findAndFixDuplicates() {
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

  console.log("\n🔍 LOOKING FOR DUPLICATES AND ISSUES\n");
  console.log(`Total articles: ${articles.length}\n`);

  // Group by title
  const titleGroups = new Map();
  articles.forEach((a: any) => {
    const key = a.title.toLowerCase().trim();
    if (!titleGroups.has(key)) {
      titleGroups.set(key, []);
    }
    titleGroups.get(key).push(a);
  });

  // Find duplicates
  const duplicates = Array.from(titleGroups.entries()).filter(
    ([, group]) => group.length > 1
  );

  if (duplicates.length === 0) {
    console.log("✅ No duplicate titles found\n");
  } else {
    console.log(`❌ Found ${duplicates.length} duplicate title(s):\n`);

    const toDelete: string[] = [];

    duplicates.forEach(([title, group]) => {
      console.log(`"${title}" (${group.length} copies):`);
      group.forEach((a: any) => {
        const seo = a.seoTitle ? "✅ SEO" : "❌ No SEO";
        const len = a.bodyLength || 0;
        console.log(
          `  - Slug: ${a.slug} | Length: ${len} chars | ${seo}`
        );
      });

      // Determine which to delete
      const goodVersions = group.filter(
        (a: any) => a.seoTitle && (a.bodyLength || 0) >= 1000
      );
      const badVersions = group.filter(
        (a: any) => !a.seoTitle || (a.bodyLength || 0) < 1000
      );

      if (goodVersions.length > 0 && badVersions.length > 0) {
        console.log(
          `  🗑️  Will delete ${badVersions.length} bad version(s)`
        );
        badVersions.forEach((a: any) => toDelete.push(a._id));
      }
      console.log("");
    });

    // Delete duplicates
    if (toDelete.length > 0) {
      console.log(`\n🗑️  DELETING ${toDelete.length} DUPLICATE(S)...\n`);

      for (const id of toDelete) {
        try {
          await client.delete(id);
          console.log(`✅ Deleted: ${id}`);
        } catch (error: any) {
          console.log(`❌ Failed to delete ${id}: ${error.message}`);
        }
      }
    }
  }

  // Check for other issues
  console.log("\n\n📊 CHECKING ALL REMAINING ARTICLES...\n");

  const remaining = await client.fetch(`
    *[_type == 'article'] | order(title asc) {
      _id,
      title,
      'slug': slug.current,
      'bodyLength': length(pt::text(body)),
      seoTitle,
      seoDescription
    }
  `);

  const issues: any[] = [];

  remaining.forEach((a: any) => {
    const len = a.bodyLength || 0;
    const hasSEO = a.seoTitle && a.seoDescription;

    if (len < 1000 || !hasSEO) {
      issues.push(a);
      const problems = [];
      if (len < 1000) problems.push(`short (${len} chars)`);
      if (!hasSEO) problems.push("no SEO");
      console.log(`⚠️  ${a.title} - ${problems.join(", ")}`);
      console.log(`    Slug: ${a.slug}`);
    } else {
      console.log(`✅ ${a.title} (${len} chars)`);
    }
  });

  console.log(`\n\n📈 SUMMARY:`);
  console.log(`Total articles: ${remaining.length}`);
  console.log(`✅ Good articles: ${remaining.length - issues.length}`);
  console.log(`⚠️  Issues found: ${issues.length}`);

  if (issues.length > 0) {
    console.log(`\n⚠️  These ${issues.length} article(s) need manual review!`);
  } else {
    console.log(`\n🎉 All articles are in good shape!`);
  }
}

findAndFixDuplicates();
