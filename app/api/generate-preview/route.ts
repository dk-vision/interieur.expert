import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { exec } from "child_process";
import { promisify } from "util";
import { readFileSync, unlinkSync, existsSync } from "fs";
import path from "path";

const execAsync = promisify(exec);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function downloadPreviewClip(youtubeId: string): Promise<string> {
  const outputPath = path.join("/tmp", `preview-${youtubeId}.mp4`);
  
  // Download first 10 seconds at lower quality
  const command = `yt-dlp \
    --format "best[height<=480]" \
    --external-downloader ffmpeg \
    --external-downloader-args "ffmpeg_i:-t 10" \
    --output "${outputPath}" \
    --no-playlist \
    --quiet \
    "https://www.youtube.com/watch?v=${youtubeId}"`;
  
  await execAsync(command);
  
  // Optimize the video
  const optimizedPath = path.join("/tmp", `preview-${youtubeId}-optimized.webm`);
  const optimizeCommand = `ffmpeg -i "${outputPath}" \
    -c:v libvpx-vp9 \
    -b:v 500k \
    -vf scale=-1:360 \
    -an \
    -t 8 \
    -y \
    "${optimizedPath}"`;
  
  await execAsync(optimizeCommand);
  
  // Clean up original
  if (existsSync(outputPath)) {
    unlinkSync(outputPath);
  }
  
  return optimizedPath;
}

async function uploadToSanity(filePath: string): Promise<string> {
  const buffer = readFileSync(filePath);
  
  const asset = await client.assets.upload("file", buffer, {
    filename: `preview-${Date.now()}.webm`,
    contentType: "video/webm",
  });

  return asset._id;
}

export async function POST(request: NextRequest) {
  try {
    const { videoId, youtubeId } = await request.json();

    if (!videoId || !youtubeId) {
      return NextResponse.json(
        { success: false, error: "Missing videoId or youtubeId" },
        { status: 400 }
      );
    }

    // Check if yt-dlp and ffmpeg are available
    try {
      await execAsync("which yt-dlp");
      await execAsync("which ffmpeg");
    } catch {
      return NextResponse.json(
        { 
          success: false, 
          error: "yt-dlp or ffmpeg not installed. Run: brew install yt-dlp ffmpeg" 
        },
        { status: 500 }
      );
    }

    // Generate preview
    const previewPath = await downloadPreviewClip(youtubeId);
    const assetId = await uploadToSanity(previewPath);

    // Update video document
    await client
      .patch(videoId)
      .set({
        previewVideo: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: assetId,
          },
        },
      })
      .commit();

    // Cleanup
    if (existsSync(previewPath)) {
      unlinkSync(previewPath);
    }

    return NextResponse.json({ success: true, assetId });
  } catch (error) {
    console.error("Error generating preview:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}
