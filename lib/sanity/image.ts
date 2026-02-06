import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@/lib/content/types";
import { client } from "./client";

const builder = createImageUrlBuilder(client);

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}
