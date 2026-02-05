import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function cleanupOldAds() {
  console.log("🧹 Cleaning up old advertising data...\n");

  try {
    // Delete all existing campaigns
    const campaigns = await client.fetch('*[_type == "adCampaign"]._id');
    console.log(`Found ${campaigns.length} campaigns to delete`);
    
    for (const id of campaigns) {
      await client.delete(id);
      console.log(`✓ Deleted campaign: ${id}`);
    }

    // Delete all existing creatives
    const creatives = await client.fetch('*[_type == "adCreative"]._id');
    console.log(`\nFound ${creatives.length} creatives to delete`);
    
    for (const id of creatives) {
      await client.delete(id);
      console.log(`✓ Deleted creative: ${id}`);
    }

    console.log("\n✅ Cleanup complete! Ready for fresh test data.");
  } catch (error) {
    console.error("❌ Error during cleanup:", error);
    process.exit(1);
  }
}

cleanupOldAds();
