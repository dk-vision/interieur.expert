# Scripts Directory

This directory contains utility scripts for maintaining the interieur.expert platform.

## 🚀 Active Maintenance Scripts

### Video Management
- **`generate-video-previews.ts`** - Generates 8-second preview clips from YouTube videos for hover effects
  - Usage: `npx tsx scripts/generate-video-previews.ts`
  - Requirements: yt-dlp and ffmpeg must be installed
  - Note: Previews now generate **automatically via webhook** when you save a video!
  - This script is mainly for batch generation or when webhook fails
  - Can also use "Generate Preview" button in Sanity Studio

- **`check-preview-videos.ts`** - Verifies which videos have preview clips
  - Usage: `npx tsx scripts/check-preview-videos.ts`

- **`check-videos.ts`** - Lists all videos with slugs, YouTube IDs, and excerpts
  - Usage: `npx tsx scripts/check-videos.ts`

- **`check-video-content.ts`** - Validates video content and checks for duplicate YouTube IDs
  - Usage: `npx tsx scripts/check-video-content.ts`

### Content Validation
- **`check-tags.ts`** - Validates tags across all content
  - Usage: `npx tsx scripts/check-tags.ts`

- **`check-dossier-articles.ts`** - Validates dossier-article relationships
  - Usage: `npx tsx scripts/check-dossier-articles.ts`

### Content Updates
- **`update-reading-times.ts`** - Recalculates reading times for all articles
  - Usage: `npx tsx scripts/update-reading-times.ts`
  - Run after bulk content updates

## 🔧 Special Purpose Scripts

- **`update-to-working-videos.ts`** - Updates video YouTube IDs to working ones
  - Usage: `npx tsx scripts/update-to-working-videos.ts`
  - Use when YouTube videos become unavailable

- **`update-vincent-sheppard.ts`** - Partner-specific content update
  - Usage: `npx tsx scripts/update-vincent-sheppard.ts`

## 📋 Requirements

Most scripts require:
- Node.js 18+
- `.env.local` file with Sanity credentials
- `SANITY_API_TOKEN` with write permissions

Video preview scripts additionally require:
- `yt-dlp` - Install: `brew install yt-dlp` (macOS)
- `ffmpeg` - Install: `brew install ffmpeg` (macOS)

## 🔐 Environment Variables

Scripts automatically load environment variables from `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID="uf111z1c"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-token-here"
```

## 🗑️ Removed Scripts

The following scripts were removed as they were one-time migrations/setup:
- All `create-articles-*.ts` files (initial content creation)
- All `recreate-*.ts` files (one-time migrations)
- All `add-*.ts` files (one-time data population)
- All `fix-*.ts` files (one-time fixes)
- Test data creation scripts
- Content rewriting scripts

## 💡 Common Workflows

### New Video Added
1. Add video in Sanity Studio with YouTube ID
2. Save/Publish the document
3. **Preview generates automatically via webhook!** (takes ~30-60 seconds)
4. Refresh document in Studio to see preview field populated

*Alternative:* Click "Generate Preview" button for instant generation
*Or run:* `npx tsx scripts/generate-video-previews.ts` for batch processing

### Bulk Content Update
1. Make changes in Sanity Studio
2. Run `npx tsx scripts/update-reading-times.ts` if article lengths changed
3. Verify with appropriate check scripts

### Video Issues
1. Run `npx tsx scripts/check-videos.ts` to identify problems
2. Fix YouTube IDs manually or with `update-to-working-videos.ts`
3. Regenerate previews if needed
