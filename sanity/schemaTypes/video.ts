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
      name: "thumbnail",
      title: "Thumbnail Afbeelding",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "previewVideo",
      title: "Preview Video (optioneel)",
      type: "file",
      description: "Korte preview clip (5-10 sec, MP4) voor hover effect. Max 10MB voor goede performance.",
      options: {
        accept: "video/mp4,video/webm",
      },
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
      title: "Transcriptie",
      type: "array",
      of: [{ type: "block" }],
      description: "Optionele transcriptie of extra tekstinhoud",
    }),
    defineField({
      name: "category",
      title: "Categorie",
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
      title: "Gepubliceerd op",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duur (minuten)",
      type: "number",
      description: "Videoduur in minuten",
    }),
    defineField({
      name: "featured",
      title: "Uitgelichte Video",
      type: "boolean",
      description: "Markeer als uitgelichte video",
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
