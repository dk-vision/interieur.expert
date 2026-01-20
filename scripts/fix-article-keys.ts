import { createClient } from '@sanity/client';
import { config } from 'dotenv';
import crypto from 'crypto';

config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
});

function generateKey() {
  return crypto.randomBytes(12).toString('hex');
}

async function fixArticleKeys() {
  console.log('🔧 Fixing missing _key properties in articles...\n');

  // Fetch all articles
  const articles = await client.fetch(`*[_type == "article"]{_id, title, body}`);

  for (const article of articles) {
    let needsUpdate = false;
    const updatedBody = article.body?.map((block: any) => {
      if (!block._key) {
        needsUpdate = true;
        block._key = generateKey();
      }
      
      if (block.children) {
        block.children = block.children.map((child: any) => {
          if (!child._key) {
            needsUpdate = true;
            child._key = generateKey();
          }
          return child;
        });
      }
      
      if (!block.markDefs) {
        block.markDefs = [];
      }
      
      return block;
    });

    if (needsUpdate && updatedBody) {
      try {
        await client
          .patch(article._id)
          .set({ body: updatedBody })
          .commit();
        console.log(`✅ Fixed: ${article.title}`);
      } catch (error: any) {
        console.error(`❌ Error fixing ${article.title}:`, error.message);
      }
    } else {
      console.log(`⏭️  Skipped (no changes needed): ${article.title}`);
    }
  }

  console.log('\n✨ Done!');
}

fixArticleKeys().catch(console.error);
