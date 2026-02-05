import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "article",
  title: "Artikel",
  type: "document",
  icon: FileText,
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
      name: "body",
      title: "Inhoud",
      type: "array",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categorie",
      type: "string",
      options: {
        list: [
          { title: "Inspiratie", value: "inspiratie" },
          { title: "Advies", value: "advies" },
          { title: "Trends", value: "trends" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ 
        type: "string",
        options: {
          // This will enable autocomplete for existing tags
          list: async (context) => {
            const client = context.getClient({ apiVersion: '2024-01-01' });
            const tags = await client.fetch(
              `array::unique(*[_type == "article" && defined(tags)].tags[])`
            );
            return tags.map((tag: string) => ({ title: tag, value: tag }));
          },
        },
      }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "publishedAt",
      title: "Gepubliceerd op",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Auteur",
      type: "string",
    }),
    defineField({
      name: "readingTime",
      title: "Leestijd (minuten)",
      type: "number",
      description: "Geschatte leestijd in minuten",
    }),
    defineField({
      name: "featured",
      title: "Uitgelicht Artikel",
      type: "boolean",
      description: "Markeer als uitgelicht artikel",
      initialValue: false,
    }),
    defineField({
      name: "sponsored",
      title: "Gesponsorde Inhoud",
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
            return "Partner is verplicht voor gesponsorde inhoud";
          }
          return true;
        }),
    }),
    defineField({
      name: "sponsorDisclosure",
      title: "Sponsorvermelding",
      type: "text",
      rows: 2,
      description: "Verplichte vermelding voor gesponsorde inhoud",
      hidden: ({ document }) => !document?.sponsored,
      validation: (Rule) =>
        Rule.custom((disclosure, context) => {
          const sponsored = (context.document as { sponsored?: boolean })?.sponsored;
          if (sponsored && !disclosure) {
            return "Sponsorvermelding is verplicht voor gesponsorde inhoud";
          }
          return true;
        }),
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
