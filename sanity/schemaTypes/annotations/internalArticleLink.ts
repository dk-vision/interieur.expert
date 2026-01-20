import { defineType } from "sanity";
import { Link as LinkIcon } from "lucide-react";

export default defineType({
  name: "internalArticleLink",
  title: "Internal Article Link",
  type: "object",
  icon: LinkIcon,
  fields: [
    {
      name: "reference",
      title: "Article",
      type: "reference",
      to: [{ type: "article" }],
      validation: (Rule) => Rule.required(),
    },
  ],
});
