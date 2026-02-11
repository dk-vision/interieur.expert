import { DocumentActionComponent } from "sanity";
import { PlayCircle } from "lucide-react";

export const GeneratePreviewAction: DocumentActionComponent = (props) => {
  const { type, id, draft, published } = props;

  // Only show for video documents
  if (type !== "video") return null;

  const doc = draft || published;
  const youtubeId = doc?.youtubeId;
  const hasPreview = doc?.previewVideo;

  return {
    label: hasPreview ? "Regenerate Preview" : "Generate Preview",
    icon: () => <PlayCircle />,
    tone: hasPreview ? "default" : "positive",
    disabled: !youtubeId,
    onHandle: async () => {
      if (!youtubeId) {
        props.onComplete();
        return;
      }

      try {
        // Call API endpoint to generate preview
        const response = await fetch("/api/generate-preview", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: id,
            youtubeId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to generate preview: ${response.statusText}`);
        }

        const result = await response.json();

        // Show success/error
        if (result.success) {
          // Refresh the document to show the new preview
          props.onComplete();
        } else {
          throw new Error(result.error || "Unknown error");
        }
      } catch (error) {
        console.error("Error generating preview:", error);
        props.onComplete();
      }
    },
  };
};
