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
      description: "Show only on pages with this category",
      options: {
        list: [
          { title: "Inspiratie", value: "inspiratie" },
          { title: "Advies", value: "advies" },
          { title: "Trends", value: "trends" },
        ],
      },
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
  ],
  preview: {
    select: {
      title: "title",
      slot: "slot",
      active: "active",
      partnerName: "partner.name",
      campaignType: "campaignType",
    },
    prepare({ title, slot, active, partnerName, campaignType }) {
      const typeEmoji: Record<string, string> = {
        display: "📢",
        "sponsored-promo": "📝",
        "product-launch": "🚀",
        seasonal: "🎯",
      };
      
      return {
        title: active ? title : `⏸️ ${title}`,
        subtitle: `${typeEmoji[campaignType || "display"]} ${slot} • ${partnerName || "No partner"}`,
      };
    },
  },
});
