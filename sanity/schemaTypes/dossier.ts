import { defineType, defineField } from "sanity";
import { FolderOpen } from "lucide-react";

export default defineType({
  name: "dossier",
  title: "Dossier",
  type: "document",
  icon: FolderOpen,
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
      name: "intro",
      title: "Introduction",
      type: "array",
      of: [{ type: "block" }],
      description: "Introduction text for the dossier",
    }),
    defineField({
      name: "articles",
      title: "Articles",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }, { type: "video" }],
        },
      ],
      description: "Related articles and videos in this dossier",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "Vrij tekstveld - typ je eigen categorie. Voorbeelden: Verlichting, Duurzaamheid, Wonen, Materialen, Kleuren, Textiel, etc.",
      placeholder: "bijv. Verlichting, Duurzaamheid, Kleuren...",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "theme",
      title: "Theme / Periode (optioneel)",
      type: "string",
      description: "Thematische periode of seizoen, bijv. 'Black Friday 2026', 'Slaapmaand Februari', 'Batibouw 2026'",
      placeholder: "bijv. Black Friday 2026, Kerst Special, etc.",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured Dossier",
      type: "boolean",
      description: "Mark as featured dossier",
      initialValue: false,
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
    },
  },
});
