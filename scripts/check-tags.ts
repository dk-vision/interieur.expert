import { client } from '../lib/sanity/client';

async function checkTags() {
  const articles = await client.fetch(`
    *[_type == "article"] | order(publishedAt desc) [0...20] {
      title,
      category,
      "tagsCount": count(tags),
      tags
    }
  `);

  console.log('Articles with tags:\n');
  
  const byCategory: Record<string, any[]> = {};
  articles.forEach((a: any) => {
    if (!byCategory[a.category]) byCategory[a.category] = [];
    byCategory[a.category].push(a);
  });

  Object.entries(byCategory).forEach(([cat, arts]) => {
    console.log(`\n${cat}:`);
    arts.forEach((a) => {
      console.log(`  - ${a.title}`);
      console.log(`    Tags (${a.tagsCount}): ${a.tags ? a.tags.join(', ') : 'NONE'}`);
    });
  });
}

checkTags().catch(console.error);
