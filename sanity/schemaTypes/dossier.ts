import { defineType, defineField } from "sanity";
import { FolderOpen } from "lucide-react";
import { BodyInput } from "../components/BodyInput";

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
      components: { input: BodyInput },
      of: [
        {
          type: "block",
          styles: [
            { title: "Normaal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Citaat", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Vet", value: "strong" },
              { title: "Cursief", value: "em" },
              { title: "Markeren", value: "highlight" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Externe URL",
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
              {
                name: "internalArticleLink",
                type: "object",
                title: "Interne Artikel Link",
                fields: [
                  {
                    name: "reference",
                    type: "reference",
                    title: "Artikel",
                    to: [{ type: "article" }],
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
      description: "Introductietekst voor het dossier",
    }),
    defineField({
      name: "articles",
      title: "Artikelen",
      type: "array",
      of: [
        {
          type: "reference",
          weak: true,
          to: [{ type: "article" }, { type: "video" }],
        },
      ],
      description: "Gerelateerde artikelen en video's in dit dossier",
    }),
    defineField({
      name: "themes",
      title: "Thema's",
      type: "array",
      of: [{ 
        type: "string",
        options: {
          // Autocomplete with all existing themes from dossiers
          list: async (context: any) => {
            const client = context.getClient({ apiVersion: '2024-01-01' });
            const themes = await client.fetch(
              `array::unique(*[_type == "dossier" && defined(themes)].themes[] | order(@))`
            );
            return themes.map((theme: string) => ({ title: theme, value: theme }));
          },
        },
      }],
      description: "Thema labels voor dit dossier. Begin te typen voor suggesties of voeg nieuwe toe.",
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
      title: "Publicatiedatum",
      type: "datetime",
      description:
        "Het dossier is pas zichtbaar op de website vanaf deze datum. Laat leeg om het dossier verborgen te houden (preview-link werkt altijd).",
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
