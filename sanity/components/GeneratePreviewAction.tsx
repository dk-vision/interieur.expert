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
        console.log("⚠️ No YouTube ID found");
        props.onComplete();
        return;
      }

      console.log("🎬 Starting preview generation:", { videoId: id, youtubeId });

      try {
        // Use same origin as Studio to avoid CORS issues
        // But ensure we're not calling production (which doesn't have yt-dlp/ffmpeg)
        const isProduction = window.location.hostname.includes('vercel.app');
        
        if (isProduction) {
          alert("⚠️ Preview generation only works locally.\n\nPlease run: pnpm exec tsx scripts/generate-video-previews.ts");
          props.onComplete();
          return;
        }
        
        const apiUrl = `${window.location.origin}/api/generate-preview`;
        console.log("🌐 API URL:", apiUrl);

        // Call API endpoint to generate preview
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId: id,
            youtubeId,
          }),
        });

        console.log("📡 API Response:", response.status, response.statusText);

        const result = await response.json();
        console.log("✅ API Result:", result);

        if (!response.ok || !result.success) {
          const errorMsg = result.error || response.statusText || "Unknown error";
          console.error("❌ API Error:", errorMsg);
          throw new Error(errorMsg);
        }

        // Success - refresh document
        console.log("🎉 Preview generated successfully!");
        console.log("📏 Duration:", result.duration, "seconds");
        alert(`Preview generated successfully! Duration: ${result.duration || 'N/A'}s`);
        props.onComplete();
      } catch (error) {
        console.error("💥 Error generating preview:", error);
        alert(`Failed to generate preview: ${error instanceof Error ? error.message : "Unknown error"}. Check console for details.`);
        props.onComplete();
      }
    },
  };
};
