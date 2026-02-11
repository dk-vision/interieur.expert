# interieur.expert

Modern interior design content platform built with Next.js 14, Sanity CMS, and Tailwind CSS.

**Live Site**: https://interieurexpert.vercel.app  
**Sanity Studio**: https://interieurexpert.vercel.app/studio

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- `yt-dlp` and `ffmpeg` (for video previews): `brew install yt-dlp ffmpeg`

### Installation

```bash
# Clone repository
git clone https://github.com/dk-vision/interieur.expert.git
cd interieur.expert

# Install dependencies
pnpm install

# Set up environment (create .env.local)
cp .env.local.example .env.local
# Add your Sanity credentials

# Start development server
pnpm dev
```

**Access Points:**
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

---

## ✨ Features

### Content Types
- **Articles**: Rich text blog posts with SEO, tags, and sponsor support
- **Videos**: YouTube integration with hover preview clips
- **Dossiers**: Curated content collections
- **Partners**: Sponsor/advertiser profiles

### Key Features
- 🎬 **Video Hover Previews**: Fully automatic 8-second preview generation via webhook
- 🔍 **Smart Search**: ⌘K search with real-time autocomplete
- 📱 **Responsive Design**: Mobile-first with fluid typography
- 📊 **Ad System**: 6 ad slots with weighted rotation and targeting
- ⚡ **Performance**: ISR with on-demand revalidation, optimized images
- 🎨 **Rich Text**: Callouts, pull quotes, internal links, image hotspots

---

## 📂 Project Structure

```
interieur.expert/
├── app/                    # Next.js 14 App Router
│   ├── (site)/            # Public pages
│   ├── studio/            # Sanity Studio
│   └── api/               # API routes
├── components/
│   ├── editorial/         # Content components
│   ├── video/             # Video preview system
│   ├── ads/               # Ad system
│   └── ui/                # UI components
├── lib/
│   ├── sanity/            # Sanity client & queries
│   └── content/           # Content types
├── sanity/
│   ├── schemaTypes/       # CMS schemas
│   └── components/        # Studio components
├── scripts/               # Maintenance utilities
└── design/                # Design documentation
```

---

## 🛠️ Common Tasks

### Adding Content

**New Article:**
1. Open Sanity Studio: http://localhost:3000/studio
2. Create new Article document
3. Add content using Portable Text editor
4. Publish

**New Video:**
1. Create Video document in Studio
2. Add YouTube ID and thumbnail
3. Save/Publish
4. Preview generates automatically! (via webhook, takes 30-60s)

*Alternative: Click "Generate Preview" button for instant generation*

### Video Management

```bash
# Generate preview clips for new videos
npx tsx scripts/generate-video-previews.ts

# Check which videos have previews
npx tsx scripts/check-preview-videos.ts

# List all videos
npx tsx scripts/check-videos.ts
```

### Maintenance

```bash
# Update reading times after content edits
npx tsx scripts/update-reading-times.ts

# Validate tags
npx tsx scripts/check-tags.ts

# Check preview video status
npx tsx scripts/check-preview-videos.ts
```

---

## 📚 Documentation

- **[PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md)** - Complete technical documentation
- **[HANDOFF.md](HANDOFF.md)** - Quick reference and setup guide
- **[HANDLEIDING-REDACTIE.md](HANDLEIDING-REDACTIE.md)** - Editorial guide (Dutch)
- **[scripts/README.md](scripts/README.md)** - Scripts documentation
- **[design/design-contract.md](design/design-contract.md)** - Design system

---

## � Development

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

---

## 🚢 Deployment

Push to `main` branch triggers automatic Vercel deployment.

```bash
# Manual deployment
npx vercel --prod
```

---

## 🧰 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **CMS**: Sanity.io v3
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics
- **Fonts**: Space Grotesk (Variable)

---

## 🔐 Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="uf111z1c"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-token-here"
REVALIDATE_SECRET="your-secret"
```

---

## 📝 License

Proprietary - All rights reserved.

---

## 📞 Support

- **GitHub Issues**: https://github.com/dk-vision/interieur.expert/issues
- **Sanity Help**: https://www.sanity.io/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Last Updated**: February 11, 2026
