import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  icon: FileText,
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
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "URL",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (Rule) =>
                      Rule.uri({ scheme: ["http", "https", "mailto"] }),
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
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
          { title: "Ambacht", value: "Ambacht" },
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
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
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
      media: "featuredImage",
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
