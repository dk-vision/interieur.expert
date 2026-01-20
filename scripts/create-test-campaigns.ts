import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "uf111z1c",
  dataset: "production",
  useCdn: false,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
});

async function createTestCampaigns() {
  try {
    console.log("Creating test ad creatives and campaigns...\n");

    // Create test creative 1 - Sidebar
    const creative1 = await client.create({
      _type: "adCreative",
      title: "Premium Meubels Sidebar Ad",
      format: "image",
      linkUrl: "https://www.example.com/meubels",
      altText: "Premium meubels voor uw interieur",
      // Note: Image needs to be uploaded via Studio
    });
    console.log("✓ Created creative 1:", creative1._id);

    // Create test creative 2 - Listing
    const creative2 = await client.create({
      _type: "adCreative",
      title: "Duurzame Verlichting Listing Ad",
      format: "image",
      linkUrl: "https://www.example.com/verlichting",
      altText: "Duurzame verlichting voor iedere ruimte",
    });
    console.log("✓ Created creative 2:", creative2._id);

    // Create test creative 3 - HTML example
    const creative3 = await client.create({
      _type: "adCreative",
      title: "Special Offer HTML Ad",
      format: "html",
      linkUrl: "https://www.example.com/offers",
      html: `
        <div style="padding: 2rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
          <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Winter Sale!</h3>
          <p style="font-size: 1rem; margin-bottom: 1rem;">Tot 50% korting op interieur items</p>
          <button style="background: white; color: #667eea; padding: 0.5rem 1.5rem; border-radius: 0.25rem; font-weight: bold; border: none; cursor: pointer;">
            Bekijk Aanbiedingen
          </button>
        </div>
      `,
    });
    console.log("✓ Created creative 3:", creative3._id);

    // Calculate dates
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const nextMonth = new Date(now);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    // Create campaign 1 - High priority sidebar
    const campaign1 = await client.create({
      _type: "adCampaign",
      title: "Premium Meubels - Sidebar",
      slot: "sidebar",
      creative: {
        _type: "reference",
        _ref: creative1._id,
      },
      targetCategory: "Stijlen",
      targetTags: ["minimalism", "scandinavisch"],
      startDate: yesterday.toISOString(),
      endDate: nextMonth.toISOString(),
      priority: 8,
      active: true,
    });
    console.log("✓ Created campaign 1:", campaign1._id);

    // Create campaign 2 - Medium priority listing
    const campaign2 = await client.create({
      _type: "adCampaign",
      title: "Duurzame Verlichting - Listing",
      slot: "listing-inline",
      creative: {
        _type: "reference",
        _ref: creative2._id,
      },
      startDate: yesterday.toISOString(),
      endDate: nextMonth.toISOString(),
      priority: 5,
      active: true,
    });
    console.log("✓ Created campaign 2:", campaign2._id);

    // Create campaign 3 - HTML sidebar ad
    const campaign3 = await client.create({
      _type: "adCampaign",
      title: "Winter Sale - Sidebar",
      slot: "sidebar",
      creative: {
        _type: "reference",
        _ref: creative3._id,
      },
      startDate: yesterday.toISOString(),
      endDate: nextMonth.toISOString(),
      priority: 6,
      active: true,
    });
    console.log("✓ Created campaign 3:", campaign3._id);

    console.log("\n✅ Test campaigns created successfully!");
    console.log(
      "\n📝 Note: For image-based campaigns, upload images via Sanity Studio"
    );
    console.log("   - Go to Content > Ad Creative");
    console.log("   - Edit the creative and upload an image");
    console.log(
      "\n🎯 Priority system: Campaign 1 (priority 8) and Campaign 3 (priority 6) compete for sidebar"
    );
    console.log("   - Campaign 1 has 8/(8+6) = 57% chance of showing");
    console.log("   - Campaign 3 has 6/(8+6) = 43% chance of showing");
  } catch (error) {
    console.error("Error creating test campaigns:", error);
  }
}

createTestCampaigns();
