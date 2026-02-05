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

async function createNewTestData() {
  console.log("🎨 Creating new test advertising data...\n");

  try {
    // First, get or create a test partner
    let partner = await client.fetch('*[_type == "partner"][0]');
    
    if (!partner) {
      console.log("Creating test partner...");
      partner = await client.create({
        _type: "partner",
        name: "Test Partner",
        slug: { _type: "slug", current: "test-partner" },
        description: "Test partner voor advertising demo's",
        website: "https://example.com",
        featured: false,
      });
      console.log("✓ Created test partner:", partner._id);
    } else {
      console.log("✓ Using existing partner:", partner.name);
    }

    // Calculate dates
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Create creatives for each position type
    console.log("\n📐 Creating ad creatives...\n");

    // 1. Homepage Hero - Wide banner
    const heroCreative = await client.create({
      _type: "adCreative",
      title: "Homepage Hero Banner",
      format: "html",
      linkUrl: "https://example.com/hero",
      html: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem 2rem; border-radius: 0.5rem; text-align: center; color: white;">
          <h2 style="font-size: 2rem; font-weight: bold; margin-bottom: 1rem;">Ontdek de Nieuwe Collectie</h2>
          <p style="font-size: 1.25rem; margin-bottom: 1.5rem; opacity: 0.9;">Tijdloze designs voor elk interieur</p>
          <a href="https://example.com" style="display: inline-block; background: white; color: #667eea; padding: 0.75rem 2rem; border-radius: 0.5rem; font-weight: bold; text-decoration: none;">Bekijk Collectie →</a>
        </div>
      `,
    });
    console.log("✓ Created homepage hero creative");

    // 2. Homepage Newsletter - Shorter banner
    const newsletterCreative = await client.create({
      _type: "adCreative",
      title: "Homepage Newsletter Banner",
      format: "html",
      linkUrl: "https://example.com/newsletter",
      html: `
        <div style="background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center; color: white;">
          <div>
            <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Winter Sale - Tot 40% Korting</h3>
            <p style="font-size: 1rem; opacity: 0.9;">Op geselecteerde interieur items</p>
          </div>
          <a href="https://example.com" style="background: white; color: #f5576c; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; text-decoration: none; white-space: nowrap;">Shop Nu</a>
        </div>
      `,
    });
    console.log("✓ Created homepage newsletter creative");

    // 3. Homepage Card - Article-sized
    const cardCreative = await client.create({
      _type: "adCreative",
      title: "Homepage Card Ad",
      format: "html",
      linkUrl: "https://example.com/card",
      html: `
        <div style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 2rem; border-radius: 0.5rem; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: white;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🪑</div>
          <h3 style="font-size: 1.25rem; font-weight: bold; margin-bottom: 0.5rem;">Premium Meubels</h3>
          <p style="font-size: 0.875rem; opacity: 0.9; margin-bottom: 1rem;">Kwaliteit die een leven lang meegaat</p>
          <span style="background: rgba(255,255,255,0.3); padding: 0.5rem 1rem; border-radius: 0.25rem; font-size: 0.875rem;">Ontdek meer →</span>
        </div>
      `,
    });
    console.log("✓ Created homepage card creative");

    // 4. Listing Sidebar - Vertical
    const sidebarCreative = await client.create({
      _type: "adCreative",
      title: "Sidebar Vertical Ad",
      format: "html",
      linkUrl: "https://example.com/sidebar",
      html: `
        <div style="background: linear-gradient(180deg, #4facfe 0%, #00f2fe 100%); padding: 2rem; border-radius: 0.5rem; text-align: center; color: white; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
          <div style="font-size: 3rem; margin-bottom: 1.5rem;">💡</div>
          <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem;">Duurzame Verlichting</h3>
          <p style="font-size: 1rem; margin-bottom: 1.5rem; opacity: 0.9;">Bespaar energie zonder in te leveren op sfeer</p>
          <a href="https://example.com" style="display: block; background: white; color: #4facfe; padding: 0.75rem; border-radius: 0.5rem; font-weight: bold; text-decoration: none;">Bekijk Aanbod</a>
        </div>
      `,
    });
    console.log("✓ Created sidebar vertical creative");

    // 5. Article Inline - Horizontal banner
    const inlineCreative = await client.create({
      _type: "adCreative",
      title: "Article Inline Banner",
      format: "html",
      linkUrl: "https://example.com/inline",
      html: `
        <div style="background: linear-gradient(90deg, #30cfd0 0%, #330867 100%); padding: 2rem; border-radius: 0.5rem; display: flex; gap: 2rem; align-items: center; color: white;">
          <div style="font-size: 4rem;">🏠</div>
          <div style="flex: 1;">
            <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Jouw Droominterieur Begint Hier</h3>
            <p style="font-size: 1rem; opacity: 0.9;">Gratis interieuradvies bij aankoop</p>
          </div>
          <a href="https://example.com" style="background: white; color: #330867; padding: 0.75rem 1.5rem; border-radius: 0.5rem; font-weight: bold; text-decoration: none; white-space: nowrap;">Plan Afspraak</a>
        </div>
      `,
    });
    console.log("✓ Created article inline creative");

    // 6. Article Sidebar - Same as listing sidebar
    const articleSidebarCreative = await client.create({
      _type: "adCreative",
      title: "Article Sidebar Ad",
      format: "html",
      linkUrl: "https://example.com/article-sidebar",
      html: `
        <div style="background: linear-gradient(180deg, #a8edea 0%, #fed6e3 100%); padding: 2rem; border-radius: 0.5rem; text-align: center; color: #333; min-height: 400px; display: flex; flex-direction: column; justify-content: center;">
          <div style="font-size: 3rem; margin-bottom: 1.5rem;">🎨</div>
          <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #333;">Kleur Inspiratie</h3>
          <p style="font-size: 1rem; margin-bottom: 1.5rem; color: #555;">Ontdek de perfecte kleurencombinaties</p>
          <a href="https://example.com" style="display: block; background: #333; color: white; padding: 0.75rem; border-radius: 0.5rem; font-weight: bold; text-decoration: none;">Bekijk Palette</a>
        </div>
      `,
    });
    console.log("✓ Created article sidebar creative");

    // Create campaigns for each slot type
    console.log("\n📢 Creating campaigns...\n");

    const campaigns = [
      {
        title: "Homepage Hero Campaign",
        slot: "homepage-hero",
        creative: heroCreative._id,
        priority: 8,
      },
      {
        title: "Homepage Newsletter Campaign",
        slot: "homepage-newsletter",
        creative: newsletterCreative._id,
        priority: 7,
      },
      {
        title: "Homepage Card Campaign",
        slot: "homepage-card",
        creative: cardCreative._id,
        priority: 6,
      },
      {
        title: "Listing Sidebar Campaign",
        slot: "listing-sidebar",
        creative: sidebarCreative._id,
        priority: 7,
      },
      {
        title: "Article Inline Campaign",
        slot: "article-inline",
        creative: inlineCreative._id,
        priority: 6,
      },
      {
        title: "Article Sidebar Campaign",
        slot: "article-sidebar",
        creative: articleSidebarCreative._id,
        priority: 7,
      },
    ];

    for (const campaign of campaigns) {
      const created = await client.create({
        _type: "adCampaign",
        title: campaign.title,
        slot: campaign.slot,
        partner: {
          _type: "reference",
          _ref: partner._id,
        },
        creative: {
          _type: "reference",
          _ref: campaign.creative,
        },
        startDate: yesterday.toISOString(),
        endDate: nextMonth.toISOString(),
        priority: campaign.priority,
        active: true,
        maxImpressions: 10000,
        currentImpressions: 0,
        impressionClicks: 0,
      });
      console.log(`✓ Created campaign: ${campaign.title}`);
    }

    console.log("\n✅ All test data created successfully!");
    console.log("\n📍 Next steps:");
    console.log("   1. Run 'pnpm dev' to start local development");
    console.log("   2. Visit http://localhost:3000 to see ads in action");
    console.log("   3. Check Sanity Studio dashboard for campaign stats");
  } catch (error) {
    console.error("❌ Error creating test data:", error);
    process.exit(1);
  }
}

createNewTestData();
