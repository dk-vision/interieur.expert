/**
 * Script to add stock photos to existing articles
 * Uses Unsplash URLs for high-quality interior design images
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

// Stock photos from Unsplash (interior design themed)
const stockPhotos = [
  {
    url: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    description: "Modern minimalist living room",
  },
  {
    url: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    description: "Scandinavian dining room",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    description: "Cozy bedroom interior",
  },
  {
    url: "https://images.unsplash.com/photo-1615529182904-14819c35db37",
    description: "Warm kitchen design",
  },
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    description: "Modern bathroom",
  },
  {
    url: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a",
    description: "Plant-filled living space",
  },
  {
    url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    description: "Industrial style interior",
  },
  {
    url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    description: "Elegant entryway",
  },
];

async function addStockPhotos() {
  try {
    console.log("Fetching articles without images...");
    
    // Get all articles
    const articles = await client.fetch(`
      *[_type == "article"] {
        _id,
        title,
        featuredImage,
        body
      }
    `);

    console.log(`Found ${articles.length} articles`);

    for (let i = 0; i < articles.length; i++) {
      const article = articles[i];
      const photo = stockPhotos[i % stockPhotos.length];

      // Update featured image if missing
      if (!article.featuredImage) {
        console.log(`Adding featured image to: ${article.title}`);
        
        await client
          .patch(article._id)
          .set({
            featuredImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: await uploadImageFromUrl(photo.url, photo.description),
              },
            },
          })
          .commit();
      }

      // Add images to body if there are none
      if (article.body) {
        const hasImages = article.body.some((block: any) => block._type === "image");
        
        if (!hasImages && article.body.length > 4) {
          console.log(`Adding in-article image to: ${article.title}`);
          
          // Insert image after 3rd paragraph
          const insertIndex = Math.min(3, article.body.length - 1);
          const randomPhoto = stockPhotos[(i + 2) % stockPhotos.length];
          
          const updatedBody = [...article.body];
          updatedBody.splice(insertIndex, 0, {
            _type: "image",
            _key: `image-${Date.now()}`,
            asset: {
              _type: "reference",
              _ref: await uploadImageFromUrl(randomPhoto.url, randomPhoto.description),
            },
          });

          await client
            .patch(article._id)
            .set({ body: updatedBody })
            .commit();
        }
      }
    }

    console.log("✅ Done! Stock photos added to articles.");
  } catch (error) {
    console.error("Error adding stock photos:", error);
  }
}

async function uploadImageFromUrl(url: string, description: string): Promise<string> {
  try {
    // Fetch image from URL
    const response = await fetch(`${url}?w=1600&q=85`);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    // Upload to Sanity
    const asset = await client.assets.upload("image", buffer, {
      filename: `stock-${Date.now()}.jpg`,
    });

    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image from ${url}:`, error);
    throw error;
  }
}

addStockPhotos();
