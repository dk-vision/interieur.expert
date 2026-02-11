# Sanity Webhook Setup

This guide explains how to configure Sanity webhooks for automatic cache revalidation.

## What Webhooks Do

When you save content in Sanity Studio:
1. 🔄 Automatically revalidates Next.js pages (ISR)
2. ⚠️ ~~Video preview generation~~ - Not supported on Vercel serverless (see below)

---

## Setup Instructions

### 1. Get Your Revalidate Secret

From your `.env.local` file:
```
REVALIDATE_SECRET=your-secret-here
```

### 2. Configure Webhook in Sanity

1. Go to: **https://www.sanity.io/manage/personal/project/uf111z1c**
2. Navigate to: **API** → **Webhooks**
3. Click: **Create webhook**

### 3. Webhook Configuration

**Name:** `Production Revalidation`

**URL:** 
```
https://interieurexpert.vercel.app/api/revalidate
```

**Dataset:** `production`

**Trigger on:** `Create`, `Update`, `Delete`

**Filter (GROQ):**
```groq
_type in ["article", "video", "dossier", "partner", "adCampaign", "adCreative"]
```

**HTTP Headers:**
```
Authorization: Bearer your-secret-here
```
(Replace `your-secret-here` with your actual REVALIDATE_SECRET)

**HTTP method:** `POST`

**API version:** `v2021-03-25`

**Include drafts:** ❌ (unchecked)

**Projection (GROQ):**
```groq
{
  _id,
  _type,
  "slug": slug,
  "youtubeId": youtubeId,
  "previewVideo": defined(previewVideo)
}
```

### 4. Save and Test

1. Click **Save**
2. Go to Sanity Studio
3. Edit and publish any article or video
4. Check Webhook logs in Sanity dashboard (should show 200 OK)
5. Check Vercel logs to see revalidation working

---

## ⚠️ Video Preview Limitation

**Auto-generation doesn't work on Vercel** because:
- Vercel serverless functions can't install `yt-dlp` and `ffmpeg`
- These binaries are required to download and convert YouTube videos

### Alternative: Studio Action Button

1. Open video in Sanity Studio
2. Click **"Generate Preview Clip"** button (top-right)
3. This calls your **local dev server** at `http://localhost:3000`
4. Requires:
   - Local dev server running (`pnpm dev`)
   - `yt-dlp` and `ffmpeg` installed: `brew install yt-dlp ffmpeg`

### Alternative: Manual Script

Run batch generation locally:
```bash
pnpm exec tsx scripts/generate-video-previews.ts
```

### Future: Dedicated Service

To enable auto-generation in production, move video processing to:
- Separate Node.js server with Docker container
- Cloud function with custom runtime (AWS Lambda layers, Google Cloud Run)
- Third-party video processing API (e.g., Cloudinary, Mux)

---

## Local Development Webhook

For local testing, you can use **ngrok** or **Vercel dev**:

### Option 1: ngrok (Recommended)
```bash
# Install ngrok
brew install ngrok

# Start your dev server
pnpm dev

# In another terminal, expose it
ngrok http 3000

# Use the ngrok URL in webhook:
# https://abc123.ngrok.io/api/revalidate
```

### Option 2: Skip webhooks locally
- Webhooks only needed in production
- Use the Studio button for local preview generation
- Or run: `pnpm exec tsx scripts/generate-video-previews.ts`

---

## Troubleshooting

### Webhook returns 401 Unauthorized
- Check `Authorization` header matches `REVALIDATE_SECRET`
- Ensure header format: `Bearer your-secret-here`

### Webhook returns 400 Bad Request
- Verify projection includes `_type` and `slug`
- Check GROQ projection syntax

### Preview not generating (Expected)
- Auto-generation doesn't work on Vercel
- Use Studio action button with local dev server
- Or run manual batch script

### Studio button not working
- Check local dev server is running (`pnpm dev`)
- Verify `yt-dlp` and `ffmpeg` installed: `brew list | grep -E 'yt-dlp|ffmpeg'`
- Check browser console for errors
- Verify YouTube video is publicly accessible

---

## Environment Variables Required

In Vercel and `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uf111z1c
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
REVALIDATE_SECRET=your-secret
```

---

**Last Updated:** February 11, 2026
