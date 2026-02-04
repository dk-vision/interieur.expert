import { createClient } from "@sanity/client";
import { calculateReadingTime } from "../lib/utils/reading-time";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function updateReadingTimes() {
  console.log("🔍 Fetching all articles...");

  // Fetch all articles
  const articles = await client.fetch(`
    *[_type == "article"] {
      _id,
      title,
      body,
      readingTime
    }
  `);

  console.log(`📚 Found ${articles.length} articles`);

  for (const article of articles) {
    const calculatedTime = calculateReadingTime(article.body);
    
    // Only update if readingTime is not set or different
    if (!article.readingTime || article.readingTime !== calculatedTime) {
      console.log(`⏱️  Updating "${article.title}": ${calculatedTime} min`);
      
      await client
        .patch(article._id)
        .set({ readingTime: calculatedTime })
        .commit();
    } else {
      console.log(`✓ "${article.title}": already has correct reading time (${calculatedTime} min)`);
    }
  }

  console.log("✅ All reading times updated!");
}

updateReadingTimes().catch(console.error);
