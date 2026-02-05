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
      title: "Partner Naam",
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
      description: "URL-vriendelijke versie van partner naam",
    }),
    defineField({
      name: "description",
      title: "Korte Beschrijving",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
      description: "Korte beschrijving voor partner overzichtspagina (max 200 karakters)",
    }),
    defineField({
      name: "about",
      title: "Over Partner",
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
      description: "Uitgebreide beschrijving voor partner profielpagina",
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
      description: "Vierkant formaat aanbevolen (min 400x400px)",
    }),
    defineField({
      name: "partnerType",
      title: "Partner Type",
      type: "string",
      options: {
        list: [
          { title: "Adverteerder", value: "advertiser" },
          { title: "Affiliate", value: "affiliate" },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: "advertiser",
      description: "Adverteerder = betaalde campagnes, Affiliate = commissie-based",
    }),
    defineField({
      name: "featured",
      title: "Uitgelichte Partner",
      type: "boolean",
      description: "Toon als uitgelichte partner op overzichtspagina",
      initialValue: false,
    }),
    defineField({
      name: "brandColor",
      title: "Merkkleur",
      type: "string",
      description: "Hex kleurcode voor accenten, bijv. #FF6B6B",
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
              title: "Stad",
              type: "string",
            },
            {
              name: "address",
              title: "Adres",
              type: "text",
              rows: 2,
            },
            {
              name: "phone",
              title: "Telefoon",
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
      description: "Voor admin - wanneer het partnerschap start",
    }),
    defineField({
      name: "contractEnd",
      title: "Contract Eind",
      type: "date",
      description: "Voor admin - wanneer het partnerschap eindigt",
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
