import { defineType, defineField } from "sanity";
import { PlayCircle } from "lucide-react";

export default defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: PlayCircle,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "youtubeId",
      title: "YouTube Video ID",
      type: "string",
      description: "YouTube video ID (e.g., dQw4w9WgXcQ)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "transcript",
      title: "Transcript",
      type: "array",
      of: [{ type: "block" }],
      description: "Optional transcript or additional text content",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Tours", value: "Tours" },
          { title: "DIY", value: "DIY" },
          { title: "Advies", value: "Advies" },
          { title: "Voor & Na", value: "Voor & Na" },
          { title: "Styling", value: "Styling" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (minutes)",
      type: "number",
      description: "Video duration in minutes",
    }),
    defineField({
      name: "sponsored",
      title: "Sponsored Content",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      hidden: ({ document }) => !document?.sponsored,
      validation: (Rule) =>
        Rule.custom((partner, context) => {
          const sponsored = (context.document as { sponsored?: boolean })?.sponsored;
          if (sponsored && !partner) {
            return "Partner is required for sponsored content";
          }
          return true;
        }),
    }),
    defineField({
      name: "sponsorDisclosure",
      title: "Sponsor Disclosure",
      type: "text",
      rows: 2,
      description: "Required disclosure text for sponsored content",
      hidden: ({ document }) => !document?.sponsored,
      validation: (Rule) =>
        Rule.custom((disclosure, context) => {
          const sponsored = (context.document as { sponsored?: boolean })?.sponsored;
          if (sponsored && !disclosure) {
            return "Sponsor disclosure is required for sponsored content";
          }
          return true;
        }),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Override title for SEO (optional)",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Meta description for SEO (optional)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "thumbnail",
      sponsored: "sponsored",
    },
    prepare({ title, subtitle, media, sponsored }) {
      return {
        title: sponsored ? `🔖 ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
