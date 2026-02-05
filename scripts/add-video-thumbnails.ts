/**
 * Script to add thumbnails to videos
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Video thumbnails from Unsplash (interior design themed)
const videoThumbnails = [
  {
    url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    description: "Modern kitchen tour",
  },
  {
    url: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    description: "Living room makeover",
  },
  {
    url: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    description: "Bedroom styling tips",
  },
  {
    url: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    description: "DIY interior project",
  },
  {
    url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    description: "Color inspiration",
  },
  {
    url: "https://images.unsplash.com/photo-1615875474908-f403116f5287",
    description: "Room tour inspiration",
  },
];

async function addVideoThumbnails() {
  try {
    console.log("Fetching videos without thumbnails...");
    
    const videos = await client.fetch(`
      *[_type == "video"] {
        _id,
        title,
        thumbnail
      }
    `);

    console.log(`Found ${videos.length} videos`);

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const thumbnail = videoThumbnails[i % videoThumbnails.length];

      if (!video.thumbnail) {
        console.log(`Adding thumbnail to: ${video.title}`);
        
        await client
          .patch(video._id)
          .set({
            thumbnail: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: await uploadImageFromUrl(thumbnail.url, thumbnail.description),
              },
            },
          })
          .commit();
      }
    }

    console.log("✅ Done! Thumbnails added to videos.");
  } catch (error) {
    console.error("Error adding video thumbnails:", error);
  }
}

async function uploadImageFromUrl(url: string, description: string): Promise<string> {
  try {
    const response = await fetch(`${url}?w=1600&q=85`);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: `video-thumb-${Date.now()}.jpg`,
    });

    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image from ${url}:`, error);
    throw error;
  }
}

addVideoThumbnails();
