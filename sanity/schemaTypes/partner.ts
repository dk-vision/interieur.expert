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
      name: "sponsorDisclosure",
      title: "Standaard Sponsorvermelding",
      type: "text",
      rows: 2,
      initialValue: "Deze inhoud is mogelijk gemaakt in samenwerking met dit merk.",
      validation: (Rule) => Rule.required(),
      description: "Standaard vermelding. 'dit merk' wordt automatisch vervangen door de partnernaam.",
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
      name: "gallery",
      title: "Fotogalerij",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "caption",
              title: "Bijschrift",
              type: "string",
            },
          ],
          preview: {
            select: {
              caption: "caption",
              media: "asset",
            },
            prepare({ caption, media }) {
              return {
                title: caption || "Foto",
                media,
              };
            },
          },
        },
      ],
      options: {
        sortable: true,
      },
      description: "Instagram-stijl fotogalerij op het partnerprofiel (vierkant formaat aanbevolen)",
    }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Afbeelding (thumbnail / poster)",
              type: "image",
              options: { hotspot: true },
              validation: (Rule) => Rule.required(),
              description: "Verplicht — wordt als thumbnail getoond en als poster bij video",
            },
            {
              name: "video",
              title: "Video (optioneel)",
              type: "file",
              options: { accept: "video/mp4,video/webm,video/quicktime" },
              description: "Upload een korte video (max 30s aanbevolen, mp4/webm). Laat leeg voor een foto-story.",
            },
            {
              name: "caption",
              title: "Bijschrift",
              type: "string",
              description: "Korte tekst over de afbeelding/video (optioneel)",
            },
            {
              name: "link",
              title: "Link",
              type: "url",
              description: "Optionele link (bijv. naar product of pagina)",
            },
            {
              name: "linkLabel",
              title: "Link label",
              type: "string",
              description: "Tekst op de link-knop, bijv. 'Bekijk product'",
            },
            {
              name: "publishedAt",
              title: "Gepubliceerd op",
              type: "datetime",
              initialValue: () => new Date().toISOString(),
            },
            {
              name: "expiresAt",
              title: "Verloopt op",
              type: "datetime",
              description: "Wanneer verdwijnt deze story? Standaard 30 dagen na publicatie.",
              initialValue: () => {
                const d = new Date();
                d.setDate(d.getDate() + 30);
                return d.toISOString();
              },
            },
          ],
          preview: {
            select: {
              caption: "caption",
              media: "image",
              publishedAt: "publishedAt",
              expiresAt: "expiresAt",
              hasVideo: "video.asset._ref",
            },
            prepare({ caption, media, publishedAt, expiresAt, hasVideo }) {
              const date = publishedAt
                ? new Date(publishedAt).toLocaleDateString("nl-NL")
                : "";
              const expiry = expiresAt
                ? `verloopt ${new Date(expiresAt).toLocaleDateString("nl-NL")}`
                : "permanent";
              const type = hasVideo ? "🎬 " : "📷 ";
              return {
                title: `${type}${caption || "Story"}`,
                subtitle: `${date} — ${expiry}`,
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(20).error("Maximaal 20 stories toegestaan"),
      description: "Instagram-stijl stories — max 20, verschijnen als cirkels op het partnerprofiel. Stories verlopen standaard na 30 dagen.",
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
      featured: "featured",
    },
    prepare({ title, media, featured }) {
      return {
        title: featured ? `⭐ ${title}` : title,
        subtitle: "Partner",
        media,
      };
    },
  },
});
