import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
});

// Mapping oude categorieën naar nieuwe
const categoryMapping: Record<string, string> = {
  'Stijlen': 'inspiratie',
  'Kleur': 'advies',
  'Materialen': 'advies',
  'Tips': 'advies',
  'Verlichting': 'advies',
  'Praktisch': 'advies',
  'Trends': 'trends',
};

async function fixCategories() {
  console.log('Fixing article categories...\n');
  
  const articles = await client.fetch(`*[_type == "article"]{ _id, title, category }`);
  
  for (const article of articles) {
    const oldCategory = article.category;
    const newCategory = categoryMapping[oldCategory] || 'advies';
    
    if (oldCategory !== newCategory) {
      await client.patch(article._id).set({ category: newCategory }).commit();
      console.log(`✓ ${article.title}: ${oldCategory} → ${newCategory}`);
    } else {
      console.log(`○ ${article.title}: already correct (${newCategory})`);
    }
  }
  
  console.log('\nDone!');
}

fixCategories().catch(console.error);
