import { defineType, defineField } from "sanity";
import { Image } from "lucide-react";

export default defineType({
  name: "adCreative",
  title: "Ad Creative",
  type: "document",
  icon: Image,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Internal name for this creative",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
          { title: "HTML", value: "html" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      hidden: ({ document }) => document?.format !== "image",
      validation: (Rule) =>
        Rule.custom((image, context) => {
          const format = (context.document as { format?: string })?.format;
          if (format === "image" && !image) {
            return "Image is required for image format";
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
            return "HTML code is required for html format";
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
      title: "Alt Text",
      type: "string",
      description: "For image format, used for accessibility",
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
        subtitle: format === "image" ? "Image Ad" : "HTML Ad",
      };
    },
  },
});
