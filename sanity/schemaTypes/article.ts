import { defineType, defineField } from "sanity";
import { FileText } from "lucide-react";
import { TagAutocomplete } from "../components/TagAutocomplete";
import { BodyInput } from "../components/BodyInput";

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
                    weak: true,
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
        {
          type: "object",
          name: "rawHtml",
          title: "HTML-broncode",
          fields: [
            {
              name: "code",
              title: "HTML",
              type: "text",
            },
          ],
          preview: {
            select: { code: "code" },
            prepare({ code }: { code?: string }) {
              return {
                title: "HTML-blok",
                subtitle: code
                  ? code.substring(0, 80) + (code.length > 80 ? "\u2026" : "")
                  : "Leeg",
              };
            },
          },
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
      of: [{ type: "string" }],
      components: {
        input: TagAutocomplete,
      },
      description: "Begin te typen voor suggesties van bestaande tags",
    }),
    defineField({
      name: "publishedAt",
      title: "Publicatiedatum",
      type: "datetime",
      description:
        "Het artikel is pas zichtbaar op de website vanaf deze datum. Laat leeg om het artikel verborgen te houden (preview-link werkt altijd).",
    }),
    defineField({
      name: "hideFromHomepage",
      title: "Verberg op homepage",
      type: "boolean",
      description:
        "Toon dit artikel niet op de homepage, ook niet wanneer het het meest recente artikel is.",
      initialValue: false,
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
      name: "pinned",
      title: "📌 Vastgepind",
      type: "boolean",
      description:
        "Vastgepinde artikelen verschijnen bovenaan op de homepagina en categoriepagina's (max 3 sitebreed).",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true;
          const client = context.getClient({ apiVersion: "2024-01-01" });
          const currentId = context.document?._id?.replace(/^drafts\./, "");
          const count = await client.fetch(
            `count(*[_type == "article" && pinned == true && _id != $id && !(_id in path("drafts.**"))])`,
            { id: currentId }
          );
          if (count >= 3) {
            return "Er zijn al 3 vastgepinde artikelen. Verwijder eerst een pin van een ander artikel.";
          }
          return true;
        }),
    }),
    defineField({
      name: "pinnedAt",
      title: "Vastgepind op",
      type: "datetime",
      description: "Wordt automatisch ingesteld wanneer je het artikel vastpint.",
      hidden: ({ document }) => !document?.pinned,
      readOnly: true,
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
      description: "Sponsorvermelding wordt automatisch opgehaald van de partner",
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
      name: "faq",
      title: "Veelgestelde vragen",
      type: "array",
      description: "FAQ-blok onderaan het artikel (verschijnt ook als gestructureerde data voor Google en AI)",
      of: [
        {
          type: "object",
          name: "faqItem",
          title: "Vraag & Antwoord",
          fields: [
            defineField({
              name: "question",
              title: "Vraag",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Antwoord",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question" },
          },
        },
      ],
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
      pinned: "pinned",
    },
    prepare({ title, subtitle, media, sponsored, pinned }) {
      const prefix = [pinned && "📌", sponsored && "🔖"]
        .filter(Boolean)
        .join(" ");
      return {
        title: prefix ? `${prefix} ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
