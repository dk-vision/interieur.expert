/**
 * Script to automatically generate preview videos from YouTube
 * Uses yt-dlp to download first 10 seconds and converts to optimized preview
 */

import { config } from "dotenv";
config({ path: ".env.local" });

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

async function generatePreviewVideos() {
  try {
    console.log("🎬 Fetching videos without preview clips...\n");
    
    const videos = await client.fetch(`
      *[_type == "video" && !defined(previewVideo)] {
        _id,
        title,
        youtubeId
      }
    `);

    if (videos.length === 0) {
      console.log("✅ All videos already have preview clips!");
      return;
    }

    console.log(`Found ${videos.length} videos needing previews\n`);

    // Check if yt-dlp is installed
    try {
      await execAsync("yt-dlp --version");
    } catch {
      console.error("❌ yt-dlp not found. Install it first:");
      console.error("   brew install yt-dlp  (macOS)");
      console.error("   or visit: https://github.com/yt-dlp/yt-dlp#installation");
      return;
    }

    for (const video of videos) {
      console.log(`Processing: ${video.title}`);
      
      try {
        const previewPath = await downloadPreviewClip(video.youtubeId, video.title);
        const assetId = await uploadToSanity(previewPath, video.title);
        
        await client
          .patch(video._id)
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

        console.log(`✅ Preview added for: ${video.title}\n`);
        
        // Cleanup
        if (existsSync(previewPath)) {
          unlinkSync(previewPath);
        }
      } catch (error) {
        console.error(`❌ Failed for: ${video.title}`);
        console.error(`   Error: ${error}\n`);
      }
    }

    console.log("🎉 Done! All preview videos generated.");
  } catch (error) {
    console.error("Error generating preview videos:", error);
  }
}

async function downloadPreviewClip(youtubeId: string, title: string): Promise<string> {
  const outputPath = path.join("/tmp", `preview-${youtubeId}.mp4`);
  
  // Download first 10 seconds at lower quality for faster processing
  const command = `yt-dlp \
    --format "best[height<=480]" \
    --external-downloader ffmpeg \
    --external-downloader-args "ffmpeg_i:-t 10" \
    --output "${outputPath}" \
    --no-playlist \
    --quiet \
    "https://www.youtube.com/watch?v=${youtubeId}"`;
  
  await execAsync(command);
  
  // Optimize the video (compress, remove audio, convert to WebM for smaller size)
  const optimizedPath = path.join("/tmp", `preview-${youtubeId}-optimized.webm`);
  const optimizeCommand = `ffmpeg -i "${outputPath}" \
    -c:v libvpx-vp9 \
    -b:v 500k \
    -vf scale=-1:360 \
    -an \
    -t 8 \
    -y \
    "${optimizedPath}"`;
  
  try {
    await execAsync(optimizeCommand);
    unlinkSync(outputPath); // Remove unoptimized version
    return optimizedPath;
  } catch {
    // If optimization fails, use original
    console.log("   ⚠️  Optimization failed, using original video");
    return outputPath;
  }
}

async function uploadToSanity(filePath: string, title: string): Promise<string> {
  const fileBuffer = readFileSync(filePath);
  const fileName = `preview-${Date.now()}.${filePath.endsWith('.webm') ? 'webm' : 'mp4'}`;
  
  const asset = await client.assets.upload("file", fileBuffer, {
    filename: fileName,
  });

  return asset._id;
}

// Run the script
generatePreviewVideos();
