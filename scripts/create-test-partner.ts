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

async function createTestPartner() {
  console.log("🏢 Creating test partner: XOOON...");

  // Create partner
  const partner = await client.create({
    _type: "partner",
    name: "XOOON",
    slug: {
      _type: "slug",
      current: "xooon",
    },
    description:
      "Design merk voor eigenzinnig woonplezier. Stijlvolle meubels die jouw persoonlijkheid weerspiegelen.",
    about: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "XOOON is een design merk dat staat voor eigenzinnig woonplezier. Met een unieke mix van industrieel, stoer en warm design, bieden wij meubels die perfect passen bij mensen die hun eigen pad kiezen.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Onze filosofie",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Bij XOOON draait het om authenticiteit en persoonlijkheid. Onze collecties zijn ontworpen voor mensen die niet bang zijn om zich uit te spreken, die hun eigen stijl volgen en hun interieur zien als een weerspiegeling van wie ze zijn.",
          },
        ],
      },
      {
        _type: "block",
        style: "h2",
        children: [
          {
            _type: "span",
            text: "Duurzaam design",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "We werken met kwalitatieve materialen die tegen een stootje kunnen. Onze meubels zijn gemaakt om lang mee te gaan, zowel qua kwaliteit als tijdloze designs die niet snel vervelen.",
          },
        ],
      },
    ],
    website: "https://www.xooon.nl",
    featured: true,
    brandColor: "#D4A574",
    socialMedia: {
      instagram: "https://www.instagram.com/xooon_nl",
      facebook: "https://www.facebook.com/xooon.nl",
      pinterest: "https://www.pinterest.com/xooon_nl",
    },
    showrooms: [
      {
        city: "Amsterdam",
        address: "Europaboulevard 1\n1083 AD Amsterdam",
        phone: "020 - 123 4567",
      },
      {
        city: "Rotterdam",
        address: "Weena 505\n3013 AL Rotterdam",
        phone: "010 - 234 5678",
      },
      {
        city: "Utrecht",
        address: "Vredenburg 40\n3511 BD Utrecht",
        phone: "030 - 345 6789",
      },
    ],
    contractStart: "2026-01-01",
    contractEnd: "2026-12-31",
  });

  console.log(`✅ Created partner: ${partner.name} (ID: ${partner._id})`);

  // Create ad creative
  console.log("\n📸 Creating ad creative...");
  const creative = await client.create({
    _type: "adCreative",
    title: "XOOON Spring Collection Banner",
    format: "html",
    html: `
<div style="background: linear-gradient(135deg, #D4A574 0%, #B8935F 100%); padding: 2rem; text-align: center; border-radius: 8px; color: white;">
  <div style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">XOOON</div>
  <div style="font-size: 1.2rem; margin-bottom: 1rem;">Spring Collection 2026</div>
  <div style="font-size: 1rem; margin-bottom: 1.5rem; opacity: 0.9;">Eigenzinnig woonplezier</div>
  <a href="https://www.xooon.nl" target="_blank" style="background: white; color: #D4A574; padding: 0.75rem 2rem; border-radius: 4px; text-decoration: none; font-weight: 600; display: inline-block;">Bekijk collectie</a>
</div>
    `.trim(),
    linkUrl: "https://www.xooon.nl",
  });

  console.log(`✅ Created ad creative: ${creative.title} (ID: ${creative._id})`);

  // Create ad campaign
  console.log("\n📢 Creating ad campaign...");
  const campaign = await client.create({
    _type: "adCampaign",
    title: "XOOON Spring Collection - Sidebar",
    partner: {
      _type: "reference",
      _ref: partner._id,
    },
    slot: "sidebar",
    creative: {
      _type: "reference",
      _ref: creative._id,
    },
    campaignType: "seasonal",
    startDate: "2026-01-15",
    endDate: "2026-04-30",
    priority: 8,
    active: true,
  });

  console.log(`✅ Created campaign: ${campaign.title} (ID: ${campaign._id})`);

  console.log("\n🎉 Test partner setup complete!");
  console.log("\nNext steps:");
  console.log("1. Run: pnpm dev");
  console.log("2. Visit: http://localhost:3001/partners");
  console.log("3. Visit: http://localhost:3001/partners/xooon");
  console.log("4. Check sidebar ad on articles");
}

createTestPartner().catch((error) => {
  console.error("❌ Error creating test partner:", error);
  process.exit(1);
});
