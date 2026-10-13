import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { dashboardTool } from "@sanity/dashboard";
import { Search } from "lucide-react";
import { schemaTypes } from "./sanity/schemaTypes";
import { CampaignDashboard } from "./sanity/components/CampaignDashboard";
import { GeoAuditTool } from "./sanity/components/GeoAuditTool";
import { GeneratePreviewAction } from "./sanity/components/GeneratePreviewAction";
import { createAutoRedirectAction } from "./sanity/components/AutoRedirectAction";
import { CopyPreviewLinkAction } from "./sanity/components/CopyPreviewLinkAction";

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

  tools: (prev) => [
    ...prev,
    {
      name: "geo-audit",
      title: "GEO Audit",
      icon: Search,
      component: GeoAuditTool,
    },
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Wrap the publish action with auto-redirect logic
      const actions = prev.map((action) =>
        action.action === "publish"
          ? createAutoRedirectAction(action)
          : action
      );

      // Add generate preview action for video documents
      if (context.schemaType === "video") {
        return [...actions, GeneratePreviewAction, CopyPreviewLinkAction];
      }

      // Add preview link action for articles and dossiers
      if (["article", "dossier"].includes(context.schemaType)) {
        return [...actions, CopyPreviewLinkAction];
      }

      return actions;
    },
  },
});
