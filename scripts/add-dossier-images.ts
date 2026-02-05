/**
 * Script to add images to dossiers
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

// Dossier cover images from Unsplash (thematic)
const dossierImages = [
  {
    url: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15",
    description: "Lighting design collection",
  },
  {
    url: "https://images.unsplash.com/photo-1615875474908-f403116f5287",
    description: "Color palette inspiration",
  },
  {
    url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
    description: "Sustainable materials",
  },
  {
    url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    description: "Small spaces solutions",
  },
  {
    url: "https://images.unsplash.com/photo-1600210492493-0946911123ea",
    description: "Scandinavian style",
  },
  {
    url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    description: "Interior inspiration",
  },
];

async function addDossierImages() {
  try {
    console.log("Fetching dossiers without images...");
    
    const dossiers = await client.fetch(`
      *[_type == "dossier"] {
        _id,
        title,
        heroImage
      }
    `);

    console.log(`Found ${dossiers.length} dossiers`);

    for (let i = 0; i < dossiers.length; i++) {
      const dossier = dossiers[i];
      const image = dossierImages[i % dossierImages.length];

      if (!dossier.heroImage) {
        console.log(`Adding image to: ${dossier.title}`);
        
        await client
          .patch(dossier._id)
          .set({
            heroImage: {
              _type: "image",
              asset: {
                _type: "reference",
                _ref: await uploadImageFromUrl(image.url, image.description),
              },
            },
          })
          .commit();
      }
    }

    console.log("✅ Done! Images added to dossiers.");
  } catch (error) {
    console.error("Error adding dossier images:", error);
  }
}

async function uploadImageFromUrl(url: string, description: string): Promise<string> {
  try {
    const response = await fetch(`${url}?w=1600&q=85`);
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    const asset = await client.assets.upload("image", buffer, {
      filename: `dossier-${Date.now()}.jpg`,
    });

    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image from ${url}:`, error);
    throw error;
  }
}

addDossierImages();
