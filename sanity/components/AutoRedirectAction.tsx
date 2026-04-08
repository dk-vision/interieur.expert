import { useEffect, useRef, useState } from "react";
import {
  DocumentActionComponent,
  DocumentActionProps,
  useClient,
} from "sanity";

const SLUG_TYPES = ["article", "video", "dossier", "partner"];

function getDocumentPath(
  type: string,
  slug: string,
  category?: string
): string | null {
  switch (type) {
    case "article":
      return category ? `/${category}/${slug}` : null;
    case "video":
      return `/video/${slug}`;
    case "dossier":
      return `/dossiers/${slug}`;
    case "partner":
      return `/partners/${slug}`;
    default:
      return null;
  }
}

export function createAutoRedirectAction(
  originalPublishAction: DocumentActionComponent
): DocumentActionComponent {
  return function AutoRedirectPublishAction(props: DocumentActionProps) {
    const { type, draft, published } = props;
    const client = useClient({ apiVersion: "2024-01-01" });
    const [isCreatingRedirect, setIsCreatingRedirect] = useState(false);

    const originalResult = originalPublishAction(props);

    // Track the published slug so we can detect changes after publish
    const publishedSlugRef = useRef(
      (published?.slug as { current?: string } | undefined)?.current
    );
    const publishedCategoryRef = useRef(
      published?.category as string | undefined
    );

    // Keep refs in sync with the published document
    useEffect(() => {
      publishedSlugRef.current = (
        published?.slug as { current?: string } | undefined
      )?.current;
      publishedCategoryRef.current = published?.category as
        | string
        | undefined;
    }, [published]);

    if (!originalResult || !SLUG_TYPES.includes(type)) {
      return originalResult;
    }

    return {
      ...originalResult,
      label: isCreatingRedirect
        ? "Redirect aanmaken…"
        : originalResult.label,
      disabled: isCreatingRedirect || originalResult.disabled,
      onHandle: async () => {
        const oldSlug = publishedSlugRef.current;
        const oldCategory = publishedCategoryRef.current;

        const draftSlug = (
          draft?.slug as { current?: string } | undefined
        )?.current;
        const draftCategory = draft?.category as string | undefined;

        // First, execute the original publish
        await originalResult.onHandle?.();

        // Only proceed if there was a previously published slug
        if (!oldSlug || !draftSlug) return;

        const slugChanged = oldSlug !== draftSlug;
        const categoryChanged =
          type === "article" &&
          oldCategory &&
          draftCategory &&
          oldCategory !== draftCategory;

        if (!slugChanged && !categoryChanged) return;

        const oldPath = getDocumentPath(type, oldSlug, oldCategory);
        const newPath = getDocumentPath(
          type,
          draftSlug,
          draftCategory ?? oldCategory
        );

        if (!oldPath || !newPath || oldPath === newPath) return;

        setIsCreatingRedirect(true);
        try {
          // Check if this redirect already exists
          const existing = await client.fetch(
            `*[_type == "redirect" && source == $source][0]._id`,
            { source: oldPath }
          );

          if (existing) {
            await client
              .patch(existing)
              .set({ destination: newPath, permanent: true })
              .commit();
          } else {
            await client.create({
              _type: "redirect",
              source: oldPath,
              destination: newPath,
              permanent: true,
            });
          }
          console.log(`↪ Auto-redirect aangemaakt: ${oldPath} → ${newPath}`);
        } catch (err) {
          console.error("Auto-redirect aanmaken mislukt:", err);
        } finally {
          setIsCreatingRedirect(false);
        }
      },
    };
  };
}
