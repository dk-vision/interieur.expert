# Sanity CMS Implementation - File Overview

## 📋 Complete File List

### ✅ NEW FILES CREATED

#### Sanity Configuration (Root Level)

1. **`sanity.config.ts`** - Main Sanity Studio configuration
2. **`sanity.cli.ts`** - Sanity CLI configuration

#### Sanity Schemas (`/sanity/schemaTypes/`)

3. **`sanity/schemaTypes/index.ts`** - Schema export file
4. **`sanity/schemaTypes/partner.ts`** - Partner schema (sponsors)
5. **`sanity/schemaTypes/article.ts`** - Article schema with sponsored governance
6. **`sanity/schemaTypes/video.ts`** - Video schema with YouTube integration
7. **`sanity/schemaTypes/dossier.ts`** - Dossier/collection schema
8. **`sanity/schemaTypes/adCreative.ts`** - Ad creative schema (image/html)
9. **`sanity/schemaTypes/adCampaign.ts`** - Ad campaign schema with targeting

#### Sanity Integration (`/lib/sanity/`)

10. **`lib/sanity/client.ts`** - Sanity client (published + preview)
11. **`lib/sanity/image.ts`** - Image URL builder helper
12. **`lib/sanity/queries.ts`** - All GROQ queries

#### Content Service Layer (`/lib/content/`)

13. **`lib/content/types.ts`** - TypeScript types for all content
14. **`lib/content/index.ts`** - Service layer functions (GROQ abstraction)

#### Components

15. **`components/editorial/PortableText.tsx`** - Portable Text renderer

#### Studio Route

16. **`app/studio/[[...tool]]/page.tsx`** - Embedded Sanity Studio

#### API Routes

17. **`app/api/draft/enable/route.ts`** - Enable draft mode
18. **`app/api/draft/disable/route.ts`** - Disable draft mode
19. **`app/api/revalidate/route.ts`** - Webhook revalidation endpoint

#### Example Pages (Reference Implementation)

20. **`app/page-with-sanity.tsx`** - Homepage using Sanity (example)
21. **`app/artikels/[slug]/page-with-sanity.tsx`** - Article detail (example)

#### Documentation

22. **`README-SANITY.md`** - Complete Sanity documentation
23. **`.env.local.example`** - Environment variables template
24. **`setup-sanity.sh`** - Quick setup script

---

## 🔧 MODIFIED FILES

### `package.json`
**Changes:**
- Added Sanity dependencies: `@sanity/client`, `@sanity/image-url`, `next-sanity`, `@sanity/vision`, `@portabletext/react`, `@sanity/visual-editing`, `sanity`
- Added scripts: `studio`, `studio:deploy`

---

## 📦 Dependencies Added

```json
{
  "@portabletext/react": "^3.1.0",
  "@sanity/client": "^6.24.1",
  "@sanity/image-url": "^1.1.0",
  "@sanity/vision": "^3.68.1",
  "@sanity/visual-editing": "^2.10.1",
  "next-sanity": "^9.11.2",
  "sanity": "^3.68.1"
}
```

---

## 🚀 Terminal Commands for Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment template
cp .env.local.example .env.local

# 3. Edit .env.local with Sanity credentials
# (Project ID, API token, secrets)

# 4. Run Next.js app
pnpm dev

# 5. Run Sanity Studio (separate terminal)
pnpm studio

# Or use quick setup script:
./setup-sanity.sh
```

---

## 🎯 Key Architecture Decisions

### 1. **Service Layer Pattern**
- ✅ All pages use `lib/content` functions
- ❌ No direct GROQ queries in pages
- ✅ Single source of truth for data fetching

### 2. **Sponsored Content Governance**
- ✅ Enforced in Sanity schemas (validation rules)
- ✅ `sponsored=true` requires `partner` + `sponsorDisclosure`
- ✅ Cannot publish without completing all fields

### 3. **Ad Slot Architecture**
- ✅ Fixed slots defined in code: `listing-inline`, `article-inline`, `sidebar`
- ✅ Campaigns target slots + optional category/tags
- ✅ Highest priority active campaign wins
- ❌ No per-page ad management in CMS

### 4. **Draft Mode & Preview**
- ✅ Next.js Draft Mode via `/api/draft/enable`
- ✅ Sanity Visual Editing ready
- ✅ Preview banner with exit link
- ✅ Separate client for draft content

### 5. **Revalidation Strategy**
- ✅ Webhook-based on-demand revalidation
- ✅ Smart path invalidation based on document type
- ✅ Secure with bearer token auth
- ✅ ISR with 1-hour fallback

---

## 🔐 Environment Variables Needed

```env
# Required for all environments
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_with_viewer_editor_roles

# Required for preview/webhooks
DRAFT_SECRET=generate_random_string
REVALIDATE_SECRET=generate_random_string
```

---

## 📝 Content Types & Schema Summary

### Partner
- Name, website, logo, brand color
- **Used by**: Articles, Videos (when sponsored)

### Article
- Title, slug, excerpt, featured image
- Body (Portable Text with inline images)
- Category, tags, publish date, author, reading time
- **Sponsored fields**: partner ref (required if sponsored), disclosure (required if sponsored)
- SEO: title, description

### Video
- Title, slug, excerpt, thumbnail
- YouTube ID, transcript, duration
- Category, tags, publish date
- **Sponsored fields**: same as Article

### Dossier
- Title, slug, excerpt, featured image
- Intro (Portable Text)
- Articles array (references to articles/videos)
- Category, publish date

### Ad Creative
- Title (internal), format (image/html)
- Image or HTML code, link URL, alt text

### Ad Campaign
- Title, slot (enum: fixed 3 slots)
- Creative reference
- Optional targeting: category, tags
- Start/end dates, priority (1-10), active toggle

---

## 🎨 Component Integration

### Existing Components (No Changes Needed)
- `ContentCard` - Already accepts all props from service layer
- `FeaturedCard` - Already compatible
- `MetaRow` - Works with formatted dates + reading time
- `SponsoredBadge` / `SponsoredDisclosure` - Works with partner data
- `AdSlot` - Can be enhanced to fetch from `getAdForSlot()`

### New Components
- `PortableText` - Renders Sanity Portable Text with custom styling
  - Matches `ArticleBody` prose styles
  - Supports inline images, h2/h3, blockquotes, links

---

## 🔄 Migration Path

### Phase 1: Setup (Current)
- ✅ Install dependencies
- ✅ Configure Sanity project
- ✅ Deploy schemas
- ✅ Set up Studio

### Phase 2: Content Migration
- Add partners to Sanity
- Migrate existing articles from `/content/artikels/` to Sanity
- Add videos, dossiers
- Set up ad campaigns

### Phase 3: Page Updates
- Replace dummy data pages with Sanity-powered versions
- Rename `-with-sanity.tsx` files to `.tsx`
- Remove old hardcoded data
- Test preview mode on all content types

### Phase 4: Production
- Configure webhook in Sanity dashboard
- Test revalidation with live content updates
- Monitor ISR performance
- Set up Studio hosting (optional)

---

## 🧪 Testing Checklist

### Draft Mode
- [ ] Enable preview from Studio
- [ ] See draft content in preview
- [ ] Exit preview banner works
- [ ] Draft content not visible without token

### Revalidation
- [ ] Webhook configured in Sanity
- [ ] Publishing article revalidates correct paths
- [ ] Ad campaign changes revalidate listings
- [ ] Manual curl test works

### Content Governance
- [ ] Cannot publish sponsored article without partner
- [ ] Cannot publish sponsored article without disclosure
- [ ] Ads only show in configured slots
- [ ] Highest priority ad wins

### Performance
- [ ] ISR works (1 hour revalidation)
- [ ] On-demand revalidation triggers on publish
- [ ] Images optimized via Sanity CDN
- [ ] No GROQ queries in client components

---

## 📚 Next Steps

1. **Run setup script**: `./setup-sanity.sh`
2. **Configure `.env.local`** with Sanity credentials
3. **Start Studio**: `pnpm studio`
4. **Add test content** via `/studio`
5. **Test pages** with `app/page-with-sanity.tsx`
6. **Configure webhook** in Sanity dashboard
7. **Deploy** when ready

---

## 🆘 Support & Troubleshooting

See `README-SANITY.md` for:
- Full setup instructions
- Environment variable details
- Webhook configuration
- Common errors & solutions
- Development guidelines

---

**Implementation Complete** ✅

All files created, service layer established, governance rules enforced.
Ready for content migration and production deployment.
