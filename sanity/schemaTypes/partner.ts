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
    }),
    defineField({
      name: "brandColor",
      title: "Brand Color (optional)",
      type: "string",
      description: "Hex color code, e.g. #ff6666",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
