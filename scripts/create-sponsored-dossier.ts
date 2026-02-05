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

async function createSponsoredDossier() {
  console.log("📁 Creating sponsored dossier with partners...\n");

  try {
    // Get existing partners
    const partners = await client.fetch('*[_type == "partner"] | order(_createdAt desc)');
    
    if (partners.length === 0) {
      console.log("❌ No partners found. Please create partners first.");
      process.exit(1);
    }

    console.log(`✓ Found ${partners.length} partner(s):`);
    partners.forEach((p: any) => console.log(`  - ${p.name}`));

    // Use first 2-3 partners as sponsors (or all if less than 3)
    const sponsors = partners.slice(0, Math.min(3, partners.length));
    console.log(`\n✓ Using ${sponsors.length} sponsor(s) for dossier\n`);

    // Create a dossier about sustainable interior design
    const dossier = await client.create({
      _type: "dossier",
      title: "Duurzaamheid in Interieur 2026",
      slug: {
        _type: "slug",
        current: "duurzaamheid-interieur-2026",
      },
      excerpt:
        "Ontdek hoe je jouw interieur duurzaam kunt inrichten. Van gerecyclede materialen tot energiezuinige verlichting - alles voor een groenere toekomst.",
      category: "Duurzaamheid",
      theme: "Duurzaam Wonen 2026",
      intro: [
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Duurzaam wonen is niet langer een trend, maar een noodzaak. In dit dossier bundelen we alle kennis en inspiratie over hoe je jouw interieur kunt inrichten met respect voor mens en milieu.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Van gerecyclede materialen en tweedehands meubels tot energiezuinige verlichting en natuurlijke verfkleuren - ontdek praktische tips en mooie voorbeelden van duurzame interieurs.",
            },
          ],
        },
      ],
      sponsors: sponsors.map((sponsor: any) => ({
        _type: "reference",
        _ref: sponsor._id,
      })),
      publishedAt: new Date().toISOString(),
      featured: true,
    });

    console.log("✅ Sponsored dossier created successfully!");
    console.log(`   Title: ${dossier.title}`);
    console.log(`   ID: ${dossier._id}`);
    console.log(`   Sponsors: ${sponsors.map((s: any) => s.name).join(", ")}`);
    console.log(`\n⚠️  Note: Add a featured image via Sanity Studio for best results`);
    console.log(`\n📍 View at: http://localhost:3001/dossiers/${dossier.slug.current}`);
  } catch (error) {
    console.error("❌ Error creating sponsored dossier:", error);
    process.exit(1);
  }
}

createSponsoredDossier();
