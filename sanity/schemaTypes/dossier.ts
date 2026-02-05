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
      title: "Titel",
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
      title: "Samenvatting",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "featuredImage",
      title: "Hoofdafbeelding",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "intro",
      title: "Introductie",
      type: "array",
      of: [{ type: "block" }],
      description: "Introductietekst voor het dossier",
    }),
    defineField({
      name: "articles",
      title: "Artikelen",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "article" }, { type: "video" }],
        },
      ],
      description: "Gerelateerde artikelen en video's in dit dossier",
    }),
    defineField({
      name: "themes",
      title: "Thema's",
      type: "array",
      of: [{ type: "string" }],
      description: "Thema labels voor dit dossier. Typ en druk Enter om nieuwe thema's toe te voegen.",
      options: {
        layout: "tags",
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sponsors",
      title: "Sponsors",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "partner" }],
        },
      ],
      description: "Sponsor partners die dit dossier ondersteunen (logo's worden getoond)",
    }),
    defineField({
      name: "publishedAt",
      title: "Gepubliceerd op",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Uitgelicht Dossier",
      type: "boolean",
      description: "Markeer als uitgelicht dossier",
      initialValue: false,
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Titel",
      type: "string",
      description: "Overschrijf titel voor SEO (optioneel)",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Beschrijving",
      type: "text",
      rows: 2,
      description: "Meta beschrijving voor SEO (optioneel)",
    }),
  ],
  preview: {
    select: {
      title: "title",
      themes: "themes",
      media: "featuredImage",
    },
    prepare({ title, themes, media }) {
      return {
        title,
        subtitle: themes?.join(", ") || "Geen thema's",
        media,
      };
    },
  },
});
