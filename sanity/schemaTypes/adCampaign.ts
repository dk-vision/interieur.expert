import { defineType, defineField } from "sanity";
import { Megaphone } from "lucide-react";

export default defineType({
  name: "adCampaign",
  title: "Ad Campaign",
  type: "document",
  icon: Megaphone,
  fields: [
    defineField({
      name: "title",
      title: "Campaign Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      validation: (Rule) => Rule.required(),
      description: "Link this campaign to a partner for tracking",
    }),
    defineField({
      name: "slot",
      title: "Ad Slot",
      type: "string",
      options: {
        list: [
          { title: "Listing Inline", value: "listing-inline" },
          { title: "Article Inline", value: "article-inline" },
          { title: "Sidebar", value: "sidebar" },
          { title: "Dossier Banner", value: "dossier-banner" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Fixed ad slot where this campaign will appear",
    }),
    defineField({
      name: "creative",
      title: "Creative",
      type: "reference",
      to: [{ type: "adCreative" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "campaignType",
      title: "Campaign Type",
      type: "string",
      options: {
        list: [
          { title: "Standard Display", value: "display" },
          { title: "Sponsored Content Promo", value: "sponsored-promo" },
          { title: "Product Launch", value: "product-launch" },
          { title: "Seasonal Campaign", value: "seasonal" },
        ],
      },
      initialValue: "display",
    }),
    defineField({
      name: "targetCategory",
      title: "Target Category (optional)",
      type: "string",
      description: "Show only on pages with this category. Kies uit lijst of typ eigen waarde.",
      options: {
        list: [
          { title: "Inspiratie (Artikel)", value: "inspiratie" },
          { title: "Advies (Artikel)", value: "advies" },
          { title: "Trends (Artikel)", value: "trends" },
          { title: "Verlichting (Dossier)", value: "Verlichting" },
          { title: "Duurzaamheid (Dossier)", value: "Duurzaamheid" },
          { title: "Wonen (Dossier)", value: "Wonen" },
          { title: "Materialen (Dossier)", value: "Materialen" },
          { title: "Kleuren (Dossier)", value: "Kleuren" },
          { title: "Textiel (Dossier)", value: "Textiel" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.custom((value) => {
        if (!value) return true; // Optional field
        if (value.length > 50) return "Maximum 50 karakters";
        return true;
      }),
    }),
    defineField({
      name: "targetTags",
      title: "Target Tags (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Show only on pages with these tags",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "number",
      description: "Higher number = higher priority (1-10)",
      validation: (Rule) => Rule.required().min(1).max(10),
      initialValue: 5,
    }),
    defineField({
      name: "active",
      title: "Active",
      type: "boolean",
      description: "Enable/disable this campaign",
      initialValue: true,
    }),
    defineField({
      name: "maxImpressions",
      title: "Maximum Impressions",
      type: "number",
      description: "Maximum number of times this ad can be shown (campaign stops when reached)",
      validation: (Rule) => Rule.required().min(100),
      initialValue: 1000,
    }),
    defineField({
      name: "currentImpressions",
      title: "Current Impressions",
      type: "number",
      description: "Number of times this ad has been shown (tracked automatically)",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "impressionClicks",
      title: "Clicks",
      type: "number",
      description: "Number of times users clicked this ad (tracked automatically)",
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slot: "slot",
      active: "active",
      partnerName: "partner.name",
      campaignType: "campaignType",
      currentImpressions: "currentImpressions",
      maxImpressions: "maxImpressions",
      impressionClicks: "impressionClicks",
    },
    prepare({ title, slot, active, partnerName, campaignType, currentImpressions = 0, maxImpressions = 1000, impressionClicks = 0 }) {
      const typeEmoji: Record<string, string> = {
        display: "📢",
        "sponsored-promo": "📝",
        "product-launch": "🚀",
        seasonal: "🎯",
      };
      
      const progress = Math.round((currentImpressions / maxImpressions) * 100);
      const ctr = currentImpressions > 0 ? ((impressionClicks / currentImpressions) * 100).toFixed(1) : "0.0";
      
      return {
        title: active ? title : `⏸️ ${title}`,
        subtitle: `${typeEmoji[campaignType || "display"]} ${slot} • ${partnerName || "No partner"} • ${currentImpressions}/${maxImpressions} (${progress}%) • CTR: ${ctr}%`,
      };
    },
  },
});
