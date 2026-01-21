import { defineType, defineField } from "sanity";
import { Briefcase } from "lucide-react";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: Briefcase,
  fields: [
    defineField({
      name: "name",
      title: "Partner Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly version of partner name",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: "Brief description for partner overview page (max 200 characters)",
    }),
    defineField({
      name: "about",
      title: "About Partner",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
      ],
      description: "Extended description for partner profile page",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      description: "Square format recommended (min 400x400px)",
    }),
    defineField({
      name: "partnerType",
      title: "Partner Type",
      type: "string",
      options: {
        list: [
          { title: "Premium Partner", value: "premium" },
          { title: "Campaign Partner", value: "campaign" },
          { title: "Affiliate Partner", value: "affiliate" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "campaign",
    }),
    defineField({
      name: "featured",
      title: "Featured Partner",
      type: "boolean",
      description: "Show as featured partner on overview page",
      initialValue: false,
    }),
    defineField({
      name: "brandColor",
      title: "Brand Color",
      type: "string",
      description: "Hex color code for accents, e.g. #FF6B6B",
    }),
    defineField({
      name: "socialMedia",
      title: "Social Media",
      type: "object",
      fields: [
        {
          name: "instagram",
          title: "Instagram URL",
          type: "url",
        },
        {
          name: "facebook",
          title: "Facebook URL",
          type: "url",
        },
        {
          name: "pinterest",
          title: "Pinterest URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "showrooms",
      title: "Showrooms",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "city",
              title: "City",
              type: "string",
            },
            {
              name: "address",
              title: "Address",
              type: "text",
              rows: 2,
            },
            {
              name: "phone",
              title: "Phone",
              type: "string",
            },
          ],
          preview: {
            select: {
              city: "city",
              address: "address",
            },
            prepare({ city, address }) {
              return {
                title: city || "Showroom",
                subtitle: address,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "contractStart",
      title: "Contract Start",
      type: "date",
      description: "For admin - when partnership starts",
    }),
    defineField({
      name: "contractEnd",
      title: "Contract End",
      type: "date",
      description: "For admin - when partnership ends",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
      partnerType: "partnerType",
      featured: "featured",
    },
    prepare({ title, media, partnerType, featured }) {
      const typeEmoji: Record<string, string> = {
        premium: "🌟",
        campaign: "📅",
        affiliate: "🤝",
      };
      
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: `${typeEmoji[partnerType] || ""} ${partnerType || "Partner"}`,
        media,
      };
    },
  },
});
