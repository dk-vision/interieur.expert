import { DocumentActionComponent } from "sanity";
import { Eye } from "lucide-react";

export const CopyPreviewLinkAction: DocumentActionComponent = (props) => {
  const { type, draft, published } = props;

  // Only show for articles, videos, and dossiers
  if (!["article", "video", "dossier"].includes(type)) return null;

  const doc = draft || published;
  const slug = (doc?.slug as { current?: string })?.current;
  const category = doc?.category as string | undefined;
  const isDraft = !!draft;

  return {
    label: "Kopieer preview-link",
    icon: () => <Eye size={16} />,
    tone: "positive",
    disabled: !slug,
    onHandle: async () => {
      if (!slug) {
        props.onComplete();
        return;
      }

      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.NEXT_PUBLIC_VERCEL_URL ||
        "https://interieur.expert";

      const base = siteUrl.startsWith("http")
        ? siteUrl
        : `https://${siteUrl}`;

      const secret = process.env.NEXT_PUBLIC_DRAFT_SECRET || "preview";

      const params = new URLSearchParams({
        secret,
        type,
        slug,
      });

      if (type === "article" && category) {
        params.set("category", category);
      }

      const url = `${base}/api/draft/enable?${params.toString()}`;

      try {
        await navigator.clipboard.writeText(url);
        alert(
          isDraft
            ? `Preview-link gekopieerd!\n\nDit artikel is nog niet gepubliceerd. Deel deze link om een preview te bekijken.`
            : `Preview-link gekopieerd!\n\nDeze link toont de meest recente (draft) versie.`
        );
      } catch {
        // Fallback: show URL in prompt
        window.prompt("Kopieer deze preview-link:", url);
      }

      props.onComplete();
    },
  };
};
