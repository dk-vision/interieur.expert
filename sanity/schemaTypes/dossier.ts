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
      name: "category",
      title: "Categorie",
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
      subtitle: "category",
      media: "featuredImage",
    },
  },
});
