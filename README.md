# interieur.expert

A modern interior design content platform built with Next.js 14, Sanity CMS, and deployed on Vercel.

**Live Site**: https://interieurexpert.vercel.app  
**Sanity Studio**: https://interieurexpert.vercel.app/studio

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Sanity credentials

# Run development server
pnpm dev
```

**Access points:**
- Website: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
REVALIDATE_SECRET=your_secret_token
```

---

## 📚 Documentation

- **[PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md)** - Complete technical documentation
- **[HANDLEIDING-REDACTIE.md](HANDLEIDING-REDACTIE.md)** - Editorial guide (Dutch)
- **[handleiding-print.html](handleiding-print.html)** - Printable manual
- **[AD-CAMPAIGN-GUIDE.md](AD-CAMPAIGN-GUIDE.md)** - Ad system guide
- **[design/design-contract.md](design/design-contract.md)** - Design system

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14.2.18 (App Router)
- **CMS**: Sanity.io v3
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript 5
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

---

## ✨ Features

- 📝 **Articles & Videos**: Rich content with SEO optimization
- 🏷️ **Smart Tags**: Dynamic tag pages with filtering
- 🔍 **Search**: ⌘K shortcut with autocomplete
- 💼 **Ad System**: Priority-based campaign management
- 📊 **Analytics**: Built-in page view tracking
- 🔗 **Internal Links**: Cross-reference articles
- 📱 **Responsive**: Mobile-first design

---

## 📂 Project Structure

```
app/                    # Next.js App Router
├── artikels/[slug]/   # Article pages
├── video/[slug]/      # Video pages  
├── tags/[tag]/        # Tag filtering
├── studio/            # Sanity Studio
└── api/               # API routes

components/
├── editorial/         # Content components
├── ads/              # Ad components
├── layout/           # Layout components
└── ui/               # UI components

lib/
├── sanity/           # Sanity integration
└── content/          # Content fetching

sanity/schemaTypes/   # CMS schemas
```

---

## 🚀 Deployment

### Manual Deploy
```bash
npx vercel --prod
```

### Automatic Deploy
Push to main branch triggers automatic deployment.

---

## 📝 Content Management

**Access Sanity Studio**: https://interieurexpert.vercel.app/studio

**Content Types:**
- Articles (inspiratie, advies, trends)
- Videos (with YouTube integration)
- Dossiers (content collections)
- Partners (advertisers)
- Ad Campaigns

**Publishing**: Content updates are instant via webhook revalidation.

---

## 🛠️ Development

```bash
# Run dev server
pnpm dev

# Build for production
pnpm run build

# Start production server
pnpm start

# Lint code
pnpm lint

# Sanity CLI
pnpm sanity [command]
```

---

## 📊 Analytics

View analytics in Vercel Dashboard → Analytics tab

**Tracked metrics:**
- Page views
- Unique visitors
- Web Vitals (LCP, FID, CLS)
- Geographic data

---

## 🐛 Troubleshooting

**Build fails:**
```bash
pnpm run build
# Check TypeScript errors
```

**Sanity connection:**
```bash
pnpm sanity dataset list
```

**Search not working:**
```bash
# Test API endpoint
curl http://localhost:3000/api/search?q=test
```

For detailed troubleshooting, see [PROJECT-DOCUMENTATION.md](PROJECT-DOCUMENTATION.md#troubleshooting).

---

## 📄 License

Proprietary - All rights reserved

---

**Last Updated**: January 20, 2026
