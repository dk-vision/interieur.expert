import { defineType } from "sanity";
import { Link as LinkIcon } from "lucide-react";

export default defineType({
  name: "internalArticleLink",
  title: "Interne Artikel Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      name: "reference",
      title: "Artikel",
      type: "reference",
      to: [{ type: "article" }],
      validation: (Rule) => Rule.required(),
    },
  ],
});
