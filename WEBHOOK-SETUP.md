# Sanity Webhook Setup

This guide explains how to configure Sanity webhooks for automatic preview generation and cache revalidation.

## What Webhooks Do

When you save content in Sanity Studio:
1. 🔄 Automatically revalidates Next.js pages (ISR)
2. 🎬 Automatically generates video preview clips (for new videos without previews)

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

## How Auto-Preview Generation Works

When you save a video document:

1. ✅ Sanity webhook fires with video data
2. ✅ `/api/revalidate` receives the webhook
3. ✅ Checks if video has `youtubeId` but no `previewVideo`
4. ✅ If true → triggers `/api/generate-preview` in background
5. ✅ Preview downloads, converts, and uploads automatically
6. ✅ Next time you open the video, preview is there!

**Note:** Preview generation takes ~30-60 seconds. Refresh the document in Studio to see the preview field populated.

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
- Or run: `npx tsx scripts/generate-video-previews.ts`

---

## Troubleshooting

### Webhook returns 401 Unauthorized
- Check `Authorization` header matches `REVALIDATE_SECRET`
- Ensure header format: `Bearer your-secret-here`

### Webhook returns 400 Bad Request
- Verify projection includes `_type` and `slug`
- Check GROQ projection syntax

### Preview not generating
- Check Vercel logs for errors
- Verify `yt-dlp` and `ffmpeg` are installed on server
- Ensure YouTube ID is valid
- Check if video already has a preview (won't regenerate)

### Preview generation fails
- YouTube video might be private/unavailable
- Check Vercel function timeout (default 10s, might need increase)
- Use manual button or script as fallback

---

## Environment Variables Required

In Vercel and `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uf111z1c
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your-write-token
REVALIDATE_SECRET=your-secret
VERCEL_URL=interieurexpert.vercel.app  # Auto-set by Vercel
```

---

**Last Updated:** February 11, 2026
