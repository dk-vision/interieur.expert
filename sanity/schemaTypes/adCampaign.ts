import { defineType, defineField } from "sanity";
import { Megaphone } from "lucide-react";

export default defineType({
  name: "adCampaign",
  title: "Advertentiecampagne",
  type: "document",
  icon: Megaphone,
  fields: [
    defineField({
      name: "title",
      title: "Campagne Titel",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partner",
      title: "Partner",
      type: "reference",
      to: [{ type: "partner" }],
      validation: (Rule) => Rule.required(),
      description: "Koppel deze campagne aan een partner voor tracking",
    }),
    defineField({
      name: "slot",
      title: "Advertentie Positie",
      type: "string",
      options: {
        list: [
          { title: "Homepage - Boven Recent Articles", value: "homepage-hero" },
          { title: "Homepage - Boven Newsletter", value: "homepage-newsletter" },
          { title: "Homepage - Article Card Replacement", value: "homepage-card" },
          { title: "Overzicht - Sidebar", value: "listing-sidebar" },
          { title: "Artikel - Inline Banner", value: "article-inline" },
          { title: "Artikel - Sidebar", value: "article-sidebar" },
        ],
      },
      validation: (Rule) => Rule.required(),
      description: "Vaste positie waar deze campagne verschijnt",
    }),
    defineField({
      name: "creative",
      title: "Creative",
      type: "reference",
      to: [{ type: "adCreative" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "targetCategory",
      title: "Target Category (optional)",
      type: "string",
      description: "Show only on pages with this category. Kies uit lijst of typ eigen waarde.",
      options: {
        list: [
          { title: "Inspiratie (Artikel)", value: "inspiratie" },
          { title: "Advies (Artikel)", value: "advies" },
          { title: "Trends (Artikel)", value: "trends" },
          { title: "Verlichting (Dossier)", value: "Verlichting" },
          { title: "Duurzaamheid (Dossier)", value: "Duurzaamheid" },
          { title: "Wonen (Dossier)", value: "Wonen" },
          { title: "Materialen (Dossier)", value: "Materialen" },
          { title: "Kleuren (Dossier)", value: "Kleuren" },
          { title: "Textiel (Dossier)", value: "Textiel" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.custom((value) => {
        if (!value) return true; // Optional field
        if (value.length > 50) return "Maximum 50 karakters";
        return true;
      }),
    }),
    defineField({
      name: "targetTags",
      title: "Target Tags (optional)",
      type: "array",
      of: [{ type: "string" }],
      description: "Show only on pages with these tags",
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "startDate",
      title: "Startdatum",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "endDate",
      title: "Einddatum",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priority",
      title: "Prioriteit",
      type: "number",
      description: "Hoger getal = hogere prioriteit (1-10)",
      validation: (Rule) => Rule.required().min(1).max(10),
      initialValue: 5,
    }),
    defineField({
      name: "active",
      title: "Actief",
      type: "boolean",
      description: "Campagne in-/uitschakelen",
      initialValue: true,
    }),
    defineField({
      name: "maxImpressions",
      title: "Maximum Vertoningen",
      type: "number",
      description: "Maximum aantal keer dat deze advertentie getoond kan worden (campagne stopt bij bereiken)",
      validation: (Rule) => Rule.required().min(100),
      initialValue: 1000,
    }),
    defineField({
      name: "currentImpressions",
      title: "Huidige Vertoningen",
      type: "number",
      description: "Aantal keer dat deze advertentie getoond is (automatisch bijgehouden)",
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: "impressionClicks",
      title: "Klikken",
      type: "number",
      description: "Aantal keer dat gebruikers op deze advertentie klikten (automatisch bijgehouden)",
      initialValue: 0,
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slot: "slot",
      active: "active",
      partnerName: "partner.name",
      campaignType: "campaignType",
      currentImpressions: "currentImpressions",
      maxImpressions: "maxImpressions",
      impressionClicks: "impressionClicks",
    },
    prepare({ title, slot, active, partnerName, campaignType, currentImpressions = 0, maxImpressions = 1000, impressionClicks = 0 }) {
      const typeEmoji: Record<string, string> = {
        display: "📢",
        "sponsored-promo": "📝",
        "product-launch": "🚀",
        seasonal: "🎯",
      };
      
      const progress = Math.round((currentImpressions / maxImpressions) * 100);
      const ctr = currentImpressions > 0 ? ((impressionClicks / currentImpressions) * 100).toFixed(1) : "0.0";
      
      return {
        title: active ? title : `⏸️ ${title}`,
        subtitle: `${typeEmoji[campaignType || "display"]} ${slot} • ${partnerName || "No partner"} • ${currentImpressions}/${maxImpressions} (${progress}%) • CTR: ${ctr}%`,
      };
    },
  },
});
