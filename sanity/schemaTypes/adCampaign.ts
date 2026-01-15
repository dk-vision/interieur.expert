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
      name: "targetCategory",
      title: "Target Category (optional)",
      type: "string",
      description: "Show only on pages with this category",
      options: {
        list: [
          { title: "Stijlen", value: "Stijlen" },
          { title: "Advies", value: "Advies" },
          { title: "Materialen", value: "Materialen" },
          { title: "Techniek", value: "Techniek" },
          { title: "Kleur", value: "Kleur" },
          { title: "Tips", value: "Tips" },
          { title: "Trends", value: "Trends" },
          { title: "Duurzaamheid", value: "Duurzaamheid" },
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
    },
    prepare({ title, slot, active }) {
      return {
        title: active ? title : `⏸️ ${title}`,
        subtitle: slot,
      };
    },
  },
});
