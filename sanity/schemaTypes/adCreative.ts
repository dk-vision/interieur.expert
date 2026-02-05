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
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.format !== "image",
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const format = (context.document as { format?: string })?.format;
          if (format === "image" && !image) {
            return "Afbeelding is verplicht voor afbeeldingsformaat";
          }
          return true;
        }),
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
