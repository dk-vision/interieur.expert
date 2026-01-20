import { createClient, type SanityClient } from "next-sanity";

let clientInstance: SanityClient | null = null;
let previewClientInstance: SanityClient | null = null;

function getConfig() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
  const token = process.env.SANITY_API_TOKEN;

  if (!projectId || !dataset) {
    throw new Error(
      "Sanity configuration missing. Please set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local"
    );
  }

  return { projectId, dataset, apiVersion, token };
}

function getClientInstance(): SanityClient {
  if (!clientInstance) {
    const config = getConfig();
    clientInstance = createClient({
      projectId: config.projectId,
      dataset: config.dataset,
      apiVersion: config.apiVersion,
      useCdn: false,
      token: config.token,
      perspective: "published",
    });
  }
  return clientInstance;
}

function getPreviewClientInstance(): SanityClient {
  if (!previewClientInstance) {
    const config = getConfig();
    previewClientInstance = createClient({
      projectId: config.projectId,
      dataset: config.dataset,
      apiVersion: config.apiVersion,
      useCdn: false,
      token: config.token,
      perspective: "previewDrafts",
    });
  }
  return previewClientInstance;
}

export const client = getClientInstance();
export const previewClient = getPreviewClientInstance();

export function getClient(preview = false) {
  return preview ? getPreviewClientInstance() : getClientInstance();
}

type SanityFetchOptions<T> = {
  query: string;
  params?: Record<string, unknown>;
  preview?: boolean;
};

export async function sanityFetch<T>({
  query,
  params = {},
  preview = false,
}: SanityFetchOptions<T>): Promise<T> {
  const activeClient = getClient(preview);
  return activeClient.fetch<T>(query, params);
}
