import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { schemaTypes } from "./sanity/schemaTypes";
import { CampaignDashboard } from "./sanity/components/CampaignDashboard";
import { GeneratePreviewAction } from "./sanity/components/GeneratePreviewAction";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "interieur-expert",
  title: "interieur.expert",

  projectId,
  dataset,

  basePath: "/studio",

  plugins: [
    structureTool(),
    visionTool(),
    dashboardTool({
      widgets: [
        {
          name: "campaign-dashboard",
          component: CampaignDashboard,
        },
      ],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Add generate preview action for video documents
      if (context.schemaType === "video") {
        return [...prev, GeneratePreviewAction];
      }
      return prev;
    },
  },
});
