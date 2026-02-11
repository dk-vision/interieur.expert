# Handoff Document: interieur.expert

## Project Overview
**interieur.expert** is a Next.js 14 website for interior design content with Sanity CMS integration, advertising system, and video preview features.

**Live URLs:**
- Production: `https://interieurexpert.vercel.app`
- Sanity Studio: `https://interieurexpert.vercel.app/studio`
- GitHub: `https://github.com/dk-vision/interieur.expert`

---

## Quick Start on New Device

### Prerequisites
- Node.js 18+ (preferably 20+)
- pnpm installed globally: `npm install -g pnpm`
- Git
- Code editor (VS Code recommended)

### Initial Setup

```bash
# 1. Clone the repository
git clone https://github.com/dk-vision/interieur.expert.git
cd interieur.expert

# 2. Install dependencies
pnpm install

# 3. Create .env.local file (see below for contents)
touch .env.local

# 4. Start development server
pnpm dev

# 5. Open browser
# http://localhost:3001 - Main site
# http://localhost:3001/studio - Sanity Studio
```

### Environment Variables (.env.local)

Create a `.env.local` file in the project root with these values:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="uf111z1c"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="ska3henGs9Dy4rdBO80zNw2YFeVRjYxFxpQx8QZMOALDhaQmBOJGHLEB6sjY037H42Sz6sgQaEVVjCROG4Uwu9ymD4PrTdvk9zPLA4yTFfC3HQ9GOkvS10UtOoZqa2kBMlxJbvzclqRS4qeyhSwNve1x7AaxEn4eOC97GdWeGf7JTvltiYbw"

# Vercel Analytics (optional for local dev)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="your-analytics-id"
```

---

## Project Structure

```
interieur.expert/
├── app/                          # Next.js 14 App Router
│   ├── (site)/                   # Main site routes
│   │   ├── artikels/[slug]/     # Article pages
│   │   ├── video/               # Video listing & detail
│   │   ├── dossiers/            # Dossier system
│   │   ├── partners/            # Partner profiles
│   │   ├── inspiratie/          # Category pages
│   │   ├── advies/
│   │   └── trends/
│   ├── studio/                   # Sanity Studio
│   ├── api/                      # API routes
│   │   ├── search/              # Search endpoint
│   │   └── revalidate/          # On-demand revalidation
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/
│   ├── editorial/               # Content components
│   │   ├── ArticleBody.tsx
│   │   ├── ContentCard.tsx      # Main card component
│   │   ├── PortableText.tsx
│   │   └── RelatedArticles.tsx
│   ├── video/
│   │   └── VideoThumbnail.tsx   # Hover preview component
│   ├── ads/
│   │   └── AdSlot.tsx           # Ad placement system
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx       # With doormat
│   │   └── Container.tsx
│   └── ui/
│       ├── PlayIcon.tsx         # Custom video play button
│       └── SmartSearch.tsx
│
├── lib/
│   ├── sanity/
│   │   ├── client.ts            # Sanity client setup
│   │   ├── queries.ts           # GROQ queries
│   │   └── image.ts             # Image URL builder
│   ├── content/
│   │   └── types.ts             # TypeScript types
│   └── ads/
│       └── campaigns.ts         # Ad rotation logic
│
├── sanity/
│   ├── schemaTypes/             # Sanity schemas
│   │   ├── article.ts           # Article schema
│   │   ├── video.ts             # Video with preview
│   │   ├── dossier.ts
│   │   ├── partner.ts
│   │   ├── adCampaign.ts
│   │   └── adCreative.ts
│   └── annotations/             # Custom annotations
│
├── scripts/                      # Utility scripts
│   ├── generate-video-previews.ts  # Auto-generate previews
│   ├── add-stock-photos.ts
│   └── update-reading-times.ts
│
├── public/
│   ├── advertising-guide.html   # Partner guide (static)
│   └── handleiding.html         # Editorial guide
│
└── .env.local                    # Environment variables (create this)
```

---

## Key Features & How They Work

### 1. Video Preview System
**Location:** `components/video/VideoThumbnail.tsx`

- Hover over video thumbnails to see 8-second preview clips
- **Fully automatic** via Sanity webhook when you save a video
- Manual alternatives also available
- Requires: `yt-dlp` and `ffmpeg` installed on server

**How it works:**
1. Create/edit video in Sanity Studio
2. Add YouTube ID and save
3. Webhook automatically triggers preview generation
4. Preview appears in ~30-60 seconds (refresh document to see it)

**Manual generation (three methods):**

**Method 1: Automatic (Webhook) - Recommended**
- Just save the video - preview generates automatically!
- Requires webhook setup (see [WEBHOOK-SETUP.md](WEBHOOK-SETUP.md))

**Method 2: Studio Button**
1. Open video document in Sanity Studio
2. Click "Generate Preview" button
3. Preview generates and uploads immediately

**Method 3: Command Line**
```bash
# Generate previews for all videos without them
npx tsx scripts/generate-video-previews.ts

# Check which videos have previews
npx tsx scripts/check-preview-videos.ts
```

### 2. Ad Campaign System
**Location:** `lib/ads/campaigns.ts`, `components/ads/AdSlot.tsx`

- 6 ad slots: homepage-hero, homepage-newsletter, homepage-card, listing-sidebar, article-inline, article-sidebar
- Weighted rotation based on priority (1-10)
- Date-range activation
- Optional category/tag targeting
- Fallback ads when no active campaigns

**Managing Ads:**
- Create campaigns in Sanity Studio under "Ad Campaigns"
- Test with priority weights (higher = more often shown)
- Use category/tag targeting for relevant placement

### 3. Content Structure

**Three layout patterns:**
1. **Homepage:** Unique hero + featured grid
2. **Content pages (Inspiratie/Advies/Trends):** Wide featured + 2-col grid
3. **Dossiers:** 3-col gallery grid

**ContentCard handles all content types:**
- Articles (with reading time)
- Videos (with duration)
- Dossiers (with sponsors)
- Three sizes: normal, large (2-col), wide (2-col with overlay)

### 4. Sanity CMS

**Access Studio:** http://localhost:3001/studio

**Key schemas:**
- `article`: Blog posts with sponsor support
- `video`: YouTube videos with preview clips
- `dossier`: Thematic collections
- `partner`: Sponsor profiles
- `adCampaign`: Ad campaigns with targeting
- `adCreative`: Ad assets (image or HTML)

**Tag autocomplete:**
Articles have dynamic tag suggestions based on existing tags.

---

## Common Tasks

### Content Management

**Adding a new video:**
1. Create video document in Sanity Studio
2. Add YouTube ID, thumbnail, and metadata
3. Click "Generate Preview" button (or run `npx tsx scripts/generate-video-previews.ts`)
4. Publish

**Bulk content updates:**
```bash
npx tsx scripts/update-reading-times.ts    # After editing article content
npx tsx scripts/check-videos.ts            # Verify video data
npx tsx scripts/check-preview-videos.ts    # Check preview status
```

### Video Management
```bash
npx tsx scripts/generate-video-previews.ts  # Generate missing previews
npx tsx scripts/check-videos.ts             # List all videos
npx tsx scripts/check-video-content.ts      # Validate video content
```

### Maintenance Scripts

See [scripts/README.md](scripts/README.md) for complete documentation.

**Active maintenance scripts:**
- `generate-video-previews.ts` - Generate preview clips
- `check-preview-videos.ts` - Verify previews exist
- `check-videos.ts` - List video metadata
- `check-tags.ts` - Validate tags
- `update-reading-times.ts` - Recalculate reading times

**Note:** Many one-time setup scripts have been removed. Only active maintenance utilities remain.

### Create Content via CLI
```bash
# Example: Create sponsored article
SANITY_API_TOKEN="your-token" npx tsx scripts/your-script.ts
```

### Update Reading Times
```bash
pnpm update-reading-times
```

### Build & Deploy
```bash
# Local build test
pnpm build

# Deploy to Vercel
vercel --prod

# Or push to GitHub (auto-deploys)
git push origin main
```

### Revalidate Cache
```bash
# Revalidate specific path
curl -X POST http://localhost:3001/api/revalidate?secret=your-secret&path=/artikels/some-slug

# Or use on-demand revalidation in Sanity webhook
```

---

## Package Scripts

```json
{
  "dev": "next dev -p 3001",
  "build": "next build",
  "start": "next start",
  
  // Content scripts
  "add-stock-photos": "tsx scripts/add-stock-photos.ts",
  "add-video-thumbnails": "tsx scripts/add-video-thumbnails.ts", 
  "add-dossier-images": "tsx scripts/add-dossier-images.ts",
  "generate-video-previews": "tsx scripts/generate-video-previews.ts",
  "update-reading-times": "tsx scripts/update-reading-times.ts",
  
  // Ad system
  "create-test-ads": "tsx scripts/create-test-campaigns.ts",
  "cleanup-ads": "tsx scripts/cleanup-campaigns.ts",
  
  // Sanity
  "sanity": "sanity dev",
  "sanity:deploy": "sanity deploy"
}
```

---

## Tech Stack

- **Framework:** Next.js 14.2.18 (App Router)
- **CMS:** Sanity v3
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** pnpm
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics
- **Video Processing:** yt-dlp, ffmpeg

---

## Environment Setup Checklist

**On new device:**
- [ ] Install Node.js 18+
- [ ] Install pnpm: `npm install -g pnpm`
- [ ] Clone repository
- [ ] Create `.env.local` with Sanity credentials
- [ ] Run `pnpm install`
- [ ] Run `pnpm dev`
- [ ] Verify http://localhost:3001 works
- [ ] Verify http://localhost:3001/studio works
- [ ] (Optional) Install yt-dlp & ffmpeg for video previews

---

## Troubleshooting

### Port already in use
```bash
# Find process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
pnpm dev -- -p 3002
```

### Sanity errors
```bash
# Clear Sanity cache
rm -rf .sanity

# Reinstall Sanity
pnpm add @sanity/client sanity next-sanity
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
pnpm build
```

### Video previews not working
```bash
# Check dependencies
yt-dlp --version
ffmpeg -version

# Test single video
yt-dlp -f "best[height<=360]" --no-audio -o test.webm "https://youtube.com/watch?v=VIDEO_ID"
```

---

## Important Notes

1. **SANITY_API_TOKEN** - Needs write permissions for scripts
2. **Port 3001** - Default dev server port (configurable)
3. **Video previews** - Stored in Sanity as file assets (~300-500KB each)
4. **Ads** - Check `active` status and date ranges in Sanity
5. **Images** - All images should go through Sanity CDN (not public folder)
6. **Search** - Uses client-side fuzzy search (no external service)

---

## Current State (Feb 11, 2026)

**Features deployed to production:**
- ✅ **Video hover previews with AUTOMATIC generation via webhook** (just save and it generates!)
- ✅ Manual preview generation also available via Studio button (backup method)
- ✅ Custom play icon (transparent triangle showing thumbnail)
- ✅ Footer doormat with 18 popular tags
- ✅ Full ad campaign system (6 slots)
- ✅ Sponsored article for Matthieu's Beddenbedrijf
- ✅ Article sidebar ad repositioned below related articles
- ✅ 16 articles, 6 videos (all with previews), 6 dossiers with stock images
- ✅ Automatic preview generation API endpoint + webhook integration
- ✅ Code cleanup (removed 24 obsolete scripts)
- ✅ Complete documentation update

**Known issues:**
- None currently

**Setup Required:**
- ⚠️ Configure Sanity webhook for automatic preview generation (see [WEBHOOK-SETUP.md](WEBHOOK-SETUP.md))

**To do:**
- Add more content (articles, videos, dossiers)
- Create more ad campaigns as partners come in
- Add impression/click tracking (future enhancement)
- Implement tag autocomplete in Studio
- Fix sidebar ad layout issues

---

## Quick Reference Commands

```bash
# Development
pnpm dev                          # Start dev server (localhost:3000)
pnpm build                        # Build for production
pnpm start                        # Start production server
pnpm studio                       # Open Sanity Studio in browser

# Video Management
npx tsx scripts/generate-video-previews.ts  # Generate all missing previews
npx tsx scripts/check-preview-videos.ts     # Check preview status
npx tsx scripts/check-videos.ts             # List all videos

# Content Utilities
npx tsx scripts/update-reading-times.ts     # Update article reading times
npx tsx scripts/check-tags.ts               # Validate tags

# Deployment
git push origin main             # Auto-deploys to Vercel
npx vercel --prod               # Manual production deploy

# Dependencies (for video previews)
brew install yt-dlp ffmpeg      # macOS only - required for preview generation
```

---

## Contact & Resources

- **GitHub:** https://github.com/dk-vision/interieur.expert
- **Vercel:** https://vercel.com/filip-6886s-projects/interieur.expert
- **Sanity Project:** https://www.sanity.io/manage/personal/project/uf111z1c
- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs

---

**Last Updated:** February 6, 2026
