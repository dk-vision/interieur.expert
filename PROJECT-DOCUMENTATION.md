# interieur.expert — Project Documentation

## 📋 Project Overview

**interieur.expert** is a modern interior design content platform built with Next.js 14, Sanity CMS, and deployed on Vercel. The platform provides inspiration, practical advice, and trends for interior design enthusiasts.

**Live Site**: https://interieurexpert.vercel.app  
**Sanity Studio**: https://interieurexpert.vercel.app/studio

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: Next.js 14.2.18 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Font**: Space Grotesk (Google Fonts)
- **Analytics**: Vercel Analytics

### Backend & CMS
- **CMS**: Sanity.io v3
- **Content**: Sanity Portable Text
- **Image Optimization**: Sanity Image Pipeline
- **Real-time**: ISR (Incremental Static Regeneration) + Webhooks

### Deployment
- **Platform**: Vercel
- **Package Manager**: pnpm
- **Node Version**: 20.x (recommended)

---

## 📁 Project Structure

```
interieur.expert/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # Root layout (Analytics, Header, Footer)
│   ├── page.tsx               # Homepage
│   ├── advies/                # Advice category page
│   ├── inspiratie/            # Inspiration category page
│   ├── trends/                # Trends category page
│   ├── video/                 # Video overview + detail pages
│   ├── artikels/[slug]/       # Article detail pages
│   ├── dossiers/              # Dossier overview + detail pages
│   ├── tags/[tag]/            # Tag filtering pages
│   ├── contact/               # Contact page
│   ├── over/                  # About page
│   ├── studio/                # Embedded Sanity Studio
│   └── api/                   # API routes
│       ├── draft/             # Draft mode enable/disable
│       ├── revalidate/        # Webhook for ISR
│       └── search/            # Search endpoint
├── components/
│   ├── ads/                   # Ad components
│   │   └── AdSlot.tsx         # Dynamic ad renderer
│   ├── editorial/             # Content components
│   │   ├── ArticleBody.tsx
│   │   ├── ContentCard.tsx
│   │   ├── PortableText.tsx   # Rich text renderer
│   │   └── ...
│   ├── layout/                # Layout components
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   └── ...
│   └── ui/                    # UI components
│       ├── SmartSearch.tsx    # Search modal (⌘K)
│       └── ...
├── lib/
│   ├── sanity/                # Sanity integration
│   │   ├── client.ts          # Sanity client
│   │   ├── image.ts           # Image URL builder
│   │   └── queries.ts         # GROQ queries
│   ├── content/               # Content service layer
│   │   ├── index.ts           # Content fetching functions
│   │   └── types.ts           # TypeScript types
│   └── ads/                   # Ad selection logic
│       └── campaigns.ts       # Campaign query system
├── sanity/
│   └── schemaTypes/           # Sanity schemas
│       ├── article.ts         # Article schema
│       ├── video.ts           # Video schema
│       ├── dossier.ts         # Dossier schema
│       ├── partner.ts         # Partner schema
│       ├── adCreative.ts      # Ad creative schema
│       ├── adCampaign.ts      # Ad campaign schema
│       └── annotations/       # Custom annotations
│           └── internalArticleLink.ts
├── scripts/                   # Utility scripts
│   ├── recreate-videos.ts     # Video content creation
│   └── create-test-campaigns.ts
├── design/
│   └── design-contract.md     # Design system documentation
├── sanity.config.ts           # Sanity Studio config
├── sanity.cli.ts              # Sanity CLI config
└── HANDLEIDING-REDACTIE.md    # User manual (Dutch)
```

---

## ✨ Key Features

### Content Management
- **Articles**: Full-featured blog posts with rich text, images, callouts, pull quotes
- **Videos**: YouTube video integration with transcripts
- **Dossiers**: Collections of related content
- **Categories**: inspiratie, advies, trends (lowercase enforced)
- **Tags**: Dynamic tag pages with filtering
- **Internal Links**: Link between articles in content
- **Search**: Smart search with ⌘K shortcut, autocomplete, keyboard navigation

### Editorial Features
- **Portable Text**: Rich text editor with custom blocks
  - Headings (H2, H3)
  - Bold, italic, highlight
  - External and internal links
  - Images with hotspot
  - Callout boxes (info, warning, tip, error)
  - Pull quotes with author attribution
- **List Formatting**: Conditional spacing (short items vs multiline)
- **SEO**: Custom titles, descriptions, structured data

### Advertising System
- **Partners**: Advertiser/sponsor management
- **Ad Creatives**: Image and HTML ad formats
- **Ad Campaigns**: 
  - Three slots: Listing Inline, Article Inline, Sidebar
  - Priority-based weighted selection
  - Optional targeting (category, tags)
  - Date range scheduling
  - Active/paused status

### Performance
- **ISR**: Incremental Static Regeneration with on-demand revalidation
- **Webhooks**: Automatic content updates on publish
- **Image Optimization**: Sanity image pipeline with automatic resizing
- **Analytics**: Vercel Analytics for page views and Web Vitals

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or higher
- pnpm 8.x or higher
- Sanity account

### Installation

```bash
# Clone repository
cd /home/dkvision/staging/interieur.expert

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

Required in `.env.local`:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Revalidation
REVALIDATE_SECRET=your_secret_token
```

---

## 📝 Content Types

### Article Schema
```typescript
{
  title: string
  slug: string
  excerpt: string
  featuredImage?: SanityImage
  body: PortableText[]
  category: 'inspiratie' | 'advies' | 'trends'
  tags: string[]
  publishedAt: datetime
  author?: string
  readingTime?: number
  seoTitle?: string
  seoDescription?: string
  sponsored?: boolean
  partner?: Partner
  sponsorDisclosure?: PortableText[]
}
```

### Video Schema
```typescript
{
  title: string
  slug: string
  excerpt: string
  thumbnail: SanityImage
  youtubeId: string
  duration: number
  transcript?: PortableText[]
  category: 'Tours' | 'DIY' | 'Advies' | 'Voor & Na' | 'Styling'
  tags: string[]
  publishedAt: datetime
}
```

### Ad Campaign Schema
```typescript
{
  campaignTitle: string
  slot: 'listingInline' | 'articleInline' | 'sidebar'
  creative: AdCreative
  startDate: datetime
  endDate: datetime
  priority: number (1-10)
  active: boolean
  targetCategory?: string
  targetTags?: string[]
}
```

---

## 🔍 Search Implementation

### Features
- ⌘K (Mac) / Ctrl+K (Windows) keyboard shortcut
- Real-time autocomplete with 300ms debounce
- Searches articles AND videos
- Arrow key navigation (↑↓)
- Enter to select, Escape to close
- Shows article type badge, excerpt, category

### Technical Details
- **Component**: `components/ui/SmartSearch.tsx` (client component)
- **API**: `app/api/search/route.ts`
- **Query**: GROQ full-text search on title, excerpt, tags
- **Results**: Top 10 ordered by relevance score

---

## 🎨 Design System

### Colors
- **Primary**: Blue (#0000ff)
- **Background**: Beige (#F6F4F1)
- **Text**: Dark gray (#2A2A2A)
- **Accent**: Yellow/Gold (#FFD700)

### Typography
- **Font**: Space Grotesk (Variable)
- **Scale**: Fluid typography using clamp()

### Components
See [design/design-contract.md](design/design-contract.md) for full design specifications.

---

## 📊 Analytics

### Vercel Analytics
Automatically tracks:
- Page views
- Unique visitors
- Web Vitals (LCP, FID, CLS)
- Device/browser info
- Geographic data

**Access**: Vercel Dashboard → Analytics tab

---

## 🔄 Deployment

### Automatic Deployment
Push to main branch triggers automatic Vercel deployment.

### Manual Deployment
```bash
# Deploy to production
npx vercel --prod

# Deploy to preview
npx vercel
```

### Post-Deployment
- Content updates via Sanity are instant (webhook revalidation)
- Code changes require rebuild
- Static pages regenerate on-demand (ISR)

---

## 📚 Content Guidelines

### Article Writing
- **Length**: 600-800 words minimum
- **Structure**: Intro + 3-5 H2 sections + Conclusion
- **SEO**: Keyword-rich title (50-60 chars), compelling excerpt (150-160 chars)
- **Images**: Minimum 1 featured image, add inline images every 2-3 paragraphs
- **Links**: Use internal links to related articles (3-5 per article)
- **Readability**: Short paragraphs (3-5 sentences), use callouts for tips

### Video Content
- **YouTube ID**: Extract from URL (after `v=`)
- **Thumbnail**: High-quality screenshot or custom design
- **Transcript**: Optional but recommended for SEO
- **Duration**: Accurate video length in minutes

### SEO Best Practices
- Use descriptive slugs (kebab-case)
- Fill seoTitle and seoDescription for critical pages
- Add alt text to all images
- Use H2/H3 hierarchy correctly
- Include 3-5 relevant tags per article

---

## 🛠️ Maintenance

### Regular Tasks
- **Weekly**: Check for expired ad campaigns
- **Monthly**: Review analytics, identify top content
- **Quarterly**: Update design components, dependency updates

### Content Audit
- Remove duplicate articles
- Update outdated information
- Add featured images to all articles
- Improve internal linking structure

### Technical Debt
- None currently identified
- Next.js security advisory (minor, will upgrade when stable patch available)

---

## 📖 User Manuals

### For Editors
- **[HANDLEIDING-REDACTIE.md](HANDLEIDING-REDACTIE.md)**: Complete editorial guide (Dutch)
- **[handleiding-print.html](handleiding-print.html)**: Printable version

### For Developers
- **[AD-CAMPAIGN-GUIDE.md](AD-CAMPAIGN-GUIDE.md)**: Technical ad system guide
- **[design/design-contract.md](design/design-contract.md)**: Design system documentation

---

## 🐛 Troubleshooting

### Common Issues

**Category pages empty:**
- Check article categories are lowercase (inspiratie/advies/trends)
- Verify Sanity schema matches published articles

**Search not working:**
- Check API route is accessible
- Verify GROQ query syntax
- Test with simple queries first

**Ads not showing:**
- Verify campaign is active (checkbox)
- Check start/end dates
- Confirm creative is published
- Test without targeting first

**Build failures:**
- Check TypeScript errors: `pnpm run build`
- Verify Server/Client component boundaries
- Check for missing imports

### Debug Mode
```bash
# Check Sanity connection
pnpm sanity dataset list

# Test API routes
curl http://localhost:3000/api/search?q=test

# View build logs
pnpm run build 2>&1 | less
```

---

## 🔐 Security

### Content Security
- Sanity content is sanitized
- HTML ads are sandboxed (use with caution)
- No user-generated content (CMS access only)

### API Security
- Revalidation webhook uses bearer token
- Draft mode requires secret token
- Sanity API token is server-side only

---

## 📞 Support

### Sanity CMS Issues
- Sanity Documentation: https://www.sanity.io/docs
- Sanity Slack: https://slack.sanity.io

### Next.js Issues
- Next.js Documentation: https://nextjs.org/docs
- Next.js GitHub: https://github.com/vercel/next.js

### Vercel Deployment
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support

---

## 📜 Changelog

### January 2026
- ✅ Fixed category schema validation (uppercase → lowercase)
- ✅ Created 6 quality video articles with transcripts
- ✅ Implemented smart search with ⌘K shortcut
- ✅ Added conditional list spacing (short vs multiline)
- ✅ Created tag pages with dynamic filtering
- ✅ Made ContentCard client component for event handlers
- ✅ Removed package-lock.json conflict
- ✅ Added missing peer dependencies
- ✅ Successfully deployed to production

---

## 📄 License

Proprietary - All rights reserved.

---

**Last Updated**: January 20, 2026
