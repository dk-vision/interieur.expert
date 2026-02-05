import { client } from '../lib/sanity/client';

const tagsByCategory: Record<string, string[]> = {
  'inspiratie': ['inspiratie', 'interieur', 'design'],
  'trends': ['trends', 'interieur trends', 'design trends'],
  'advies': ['advies', 'tips', 'interieur tips'],
  'stijlen': ['interieurstijl', 'design', 'wonen'],
};

async function addMissingTags() {
  console.log('Checking articles without tags...\n');

  const articlesWithoutTags = await client.fetch(`
    *[_type == "article" && !defined(tags) || count(tags) == 0] {
      _id,
      title,
      category,
      tags
    }
  `);

  console.log(`Found ${articlesWithoutTags.length} articles without tags\n`);

  for (const article of articlesWithoutTags) {
    const defaultTags = tagsByCategory[article.category.toLowerCase()] || ['interieur', 'design'];
    
    console.log(`Updating: ${article.title}`);
    console.log(`  Category: ${article.category}`);
    console.log(`  Adding tags: ${defaultTags.join(', ')}`);

    await client
      .patch(article._id)
      .set({ tags: defaultTags })
      .commit();
    
    console.log('  ✓ Updated\n');
  }

  console.log(`\n✅ Updated ${articlesWithoutTags.length} articles`);
}

addMissingTags().catch(console.error);
