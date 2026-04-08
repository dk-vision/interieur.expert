import { defineType, defineField } from "sanity";
import { ArrowRightLeft } from "lucide-react";

export default defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  icon: ArrowRightLeft,
  fields: [
    defineField({
      name: "source",
      title: "Bronpad",
      type: "string",
      description: "Het oude pad (bv. /oud-artikel of /oude-categorie/pagina)",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (typeof value !== "string") return true;
          if (!value.startsWith("/")) return "Pad moet beginnen met /";
          if (value.includes("?") || value.includes("#"))
            return "Gebruik geen query parameters of hashes";
          return true;
        }),
    }),
    defineField({
      name: "destination",
      title: "Doelpad",
      type: "string",
      description:
        "Het nieuwe pad (bv. /nieuw-artikel) of volledige URL voor externe redirects",
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (typeof value !== "string") return true;
          if (!value.startsWith("/") && !value.startsWith("https://"))
            return "Moet beginnen met / of https://";
          return true;
        }),
    }),
    defineField({
      name: "permanent",
      title: "Permanent (301)",
      type: "boolean",
      description:
        "Aan = permanente redirect (301), uit = tijdelijke redirect (302)",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      source: "source",
      destination: "destination",
      permanent: "permanent",
    },
    prepare({ source, destination, permanent }) {
      return {
        title: `${source} → ${destination}`,
        subtitle: permanent ? "301 Permanent" : "302 Tijdelijk",
      };
    },
  },
  orderings: [
    {
      title: "Bronpad",
      name: "sourceAsc",
      by: [{ field: "source", direction: "asc" }],
    },
  ],
});
