import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
});

async function deleteAllArticles() {
  console.log('Deleting all articles...');
  const result = await client.delete({ query: "*[_type == 'article']" });
  console.log(`Deleted ${result.results.length} articles`);
}

async function main() {
  await deleteAllArticles();
  console.log('\nAll articles deleted. Ready for fresh content.');
}

main().catch(console.error);
