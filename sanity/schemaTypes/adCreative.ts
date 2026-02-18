import { defineType, defineField } from "sanity";
import { Image } from "lucide-react";

export default defineType({
  name: "adCreative",
  title: "Advertentie Ontwerp",
  type: "document",
  icon: Image,
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      description: "Interne naam voor dit ontwerp",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Formaat",
      type: "string",
      options: {
        list: [
          { title: "Afbeelding", value: "image" },
          { title: "HTML", value: "html" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Afbeelding",
      type: "image",
      description:
        "Upload exact volgens de vaste IAB-afmetingen van het gekozen ad slot (zie Advertising Guide).",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.format !== "image",
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const doc = context.document as {
            format?: string;
            imageMobile?: unknown;
            imageTablet?: unknown;
            imageDesktop?: unknown;
          };

          if (doc?.format !== "image") return true;

          const hasAnyImage =
            Boolean(image) ||
            Boolean(doc?.imageMobile) ||
            Boolean(doc?.imageTablet) ||
            Boolean(doc?.imageDesktop);

          if (!hasAnyImage) {
            return "Upload minstens één afbeelding (of via Mobile/Tablet/Desktop velden).";
          }

          return true;
        }),
    }),

    defineField({
      name: "imageMobile",
      title: "Afbeelding (Mobile)",
      type: "image",
      description: "Voor slots met een mobile formaat (bv. 320×100).",
      options: { hotspot: true },
      hidden: ({ document }) => document?.format !== "image",
    }),

    defineField({
      name: "imageTablet",
      title: "Afbeelding (Tablet)",
      type: "image",
      description: "Voor slots met een tablet formaat (bv. 728×90).",
      options: { hotspot: true },
      hidden: ({ document }) => document?.format !== "image",
    }),

    defineField({
      name: "imageDesktop",
      title: "Afbeelding (Desktop)",
      type: "image",
      description: "Voor slots met een desktop formaat (bv. 970×250 of 970×90).",
      options: { hotspot: true },
      hidden: ({ document }) => document?.format !== "image",
    }),
    defineField({
      name: "html",
      title: "HTML Code",
      type: "text",
      rows: 6,
      hidden: ({ document }) => document?.format !== "html",
      validation: (Rule) =>
        Rule.custom((html, context) => {
          const format = (context.document as { format?: string })?.format;
          if (format === "html" && !html) {
            return "HTML code is verplicht voor HTML formaat";
          }
          return true;
        }),
    }),
    defineField({
      name: "linkUrl",
      title: "Link URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "altText",
      title: "Alt Tekst",
      type: "string",
      description: "Voor afbeelding formaat, gebruikt voor toegankelijkheid",
    }),
  ],
  preview: {
    select: {
      title: "title",
      format: "format",
      media: "image",
    },
    prepare({ title, format }) {
      return {
        title,
        subtitle: format === "image" ? "Afbeelding Advertentie" : "HTML Advertentie",
      };
    },
  },
});
