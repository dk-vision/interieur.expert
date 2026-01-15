# interieur.expert

Editorial platform voor interieur design, gebouwd met Next.js App Router, Tailwind CSS en Sanity CMS.

## 🏗️ Tech Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (ESM config)
- **Sanity CMS** (Headless content management)
- **TypeScript**
- **Lucide React** (Icons)

## 📁 Project Structure

```
/app                    # Next.js App Router pages
  /artikels/[slug]     # Article detail pages
  /video/[slug]        # Video detail pages
  /studio/[[...tool]]  # Embedded Sanity Studio
  /api
    /draft             # Draft mode endpoints
    /revalidate        # Webhook revalidation
/components
  /editorial           # ContentCard, FeaturedCard, MetaRow, PortableText
  /layout              # Container, Section, Header, Footer
  /ui                  # Pill, Icon, AdLabel
  /ads                 # AdSlot component
/lib
  /sanity              # Sanity client & queries
  /content             # Content service layer (GROQ abstraction)
/sanity
  /schemaTypes         # Sanity schemas (article, video, partner, ads)
/design                # Design contract documentation
```

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Sanity

1. **Create Sanity Project**: Visit [sanity.io](https://sanity.io) and create a new project
2. **Copy Environment Variables**:

```bash
cp .env.local.example .env.local
```

3. **Fill in Sanity Credentials** in `.env.local`:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Sanity API Token (create in sanity.io dashboard with Viewer/Editor role)
SANITY_API_TOKEN=your_api_token_here

# Draft Mode Secret (generate random string)
DRAFT_SECRET=generate_random_secret_here

# Revalidation Secret (generate random string for webhooks)
REVALIDATE_SECRET=generate_random_secret_here
```

### 3. Deploy Sanity Schemas

Initialize your Sanity dataset with the schemas:

```bash
pnpm sanity deploy
```

### 4. Run Development Servers

**Next.js Frontend:**

```bash
pnpm dev
# Open http://localhost:3000
```

**Sanity Studio (in separate terminal):**

```bash
pnpm studio
# Open http://localhost:3333 or visit /studio in your Next.js app
```

## 📝 Content Management

### Sanity Studio

Access the CMS at `http://localhost:3000/studio` (embedded) or run separately with `pnpm studio`.

### Content Types

#### 1. **Partner** (Sponsors)

- Name, website, logo, brand color
- Required for sponsored content

#### 2. **Article**

- Title, slug, excerpt, featured image
- Body (Portable Text with images)
- Category, tags, publish date
- **Sponsored governance**: 
  - `sponsored=true` requires `partner` reference + `sponsorDisclosure`
- SEO fields

#### 3. **Video**

- YouTube ID, thumbnail, transcript
- Same sponsored governance as articles
- Category, tags

#### 4. **Dossier**

- Collection of articles/videos
- Intro text, featured image
- References to content

#### 5. **Ad Creative**

- Image or HTML format
- Link URL, alt text

#### 6. **Ad Campaign**

- Fixed slot: `listing-inline`, `article-inline`, or `sidebar`
- Creative reference
- Optional targeting (category, tags)
- Start/end dates, priority
- Active toggle

### Sponsored Content Rules (Enforced in Schema)

- ✅ `sponsored=true` → partner reference **required**
- ✅ `sponsored=true` → `sponsorDisclosure` text **required**
- ❌ Cannot publish sponsored content without partner + disclosure

### Ad Placement Rules

- **Slots are fixed in code** (not per-page in CMS)
- Campaigns target slots + optional category/tags
- System picks highest priority active campaign per slot
- Ad serving is handled by `getAdForSlot()` in content service

## 🔄 Content Service Layer

All pages use `lib/content/index.ts` - **no direct GROQ queries in pages**.

### Available Functions

```typescript
// Homepage
const data = await getHomepageContent({ draft });

// Article detail
const article = await getArticleBySlug(slug, { draft });

// Video detail
const video = await getVideoBySlug(slug, { draft });

// Listings (articles, videos, dossiers)
const items = await getListing({ 
  type: "article", 
  category: "Stijlen",
  tag: "Minimalisme",
  draft 
});

// Ad serving
const ad = await getAdForSlot("listing-inline", { category: "Advies" }, { draft });
```

## 👁️ Preview & Draft Mode

### For Editors

1. **Enable Preview** in Sanity Studio (uses `/api/draft/enable`)
2. System redirects to content page in Draft Mode
3. See unpublished changes live
4. **Exit Preview** via banner link (`/api/draft/disable`)

### Setup Preview in Sanity

Add this to your Sanity desk config (optional, for custom preview button):

```typescript
// sanity.config.ts - add to actions
import { previewAction } from '@sanity/preview-action'

export default defineConfig({
  // ... other config
  document: {
    actions: (prev, context) => {
      return [
        ...prev,
        previewAction({
          previewUrl: {
            origin: 'https://interieur.expert', // Your domain
            draftMode: {
              enable: '/api/draft/enable',
            },
          },
        }),
      ]
    },
  },
})
```

### Draft Mode Flow

1. Editor clicks preview in Sanity
2. Requests `/api/draft/enable?secret=XXX&slug=article-slug&type=article`
3. Next.js enables draft mode cookie
4. Redirects to content page
5. Page fetches draft content via `getClient(true)`
6. Shows preview banner with exit link

## 🔔 Webhooks & Revalidation

### Setup Sanity Webhook

1. Go to **Sanity Dashboard** → Your Project → API → Webhooks
2. Add new webhook:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **HTTP Headers**: 
     ```
     Authorization: Bearer YOUR_REVALIDATE_SECRET
     ```
   - **Projection**: `{_type, "slug": slug}`

### Revalidation Rules

The webhook handler automatically revalidates:

- **Article**: `/artikels/[slug]` + homepage + category pages
- **Video**: `/video/[slug]` + homepage + video page
- **Dossier**: `/dossiers/[slug]` + homepage
- **Partner/Ad changes**: All listing pages (homepage, category pages)

### Manual Revalidation

Test webhook locally:

```bash
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer YOUR_REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"_type":"article","slug":{"current":"test-article"}}'
```

## 🎨 Design System

See `design/design-contract.md` for full design guidelines.

### Tokens

- **Background**: `#F6F4F1` (warm beige)
- **Text**: `#2A2A2A` (dark gray)
- **Accent**: `#0000ff` (blue)
- **Brand**: `#ff6666` (coral-red, for commercial content only)

### Typography

- **Headings**: Space Grotesk
- **Body**: System fonts

### Layout Constraints

- **Content**: `max-w-content` (720px for longform)
- **Layout**: `max-w-layout` (1280px for grids)

## 🔐 Environment Variables

### Required

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=       # From sanity.io dashboard
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=                    # Create in Sanity (Viewer + Editor roles)
DRAFT_SECRET=                        # Random string for draft mode auth
REVALIDATE_SECRET=                   # Random string for webhook auth
```

### Optional

```env
NEXT_PUBLIC_SANITY_DATASET=development  # For staging environment
```

## 📦 Build & Deploy

### Production Build

```bash
pnpm build
pnpm start
```

### Deploy Sanity Studio

Deploy Studio to Sanity's hosting:

```bash
pnpm studio:deploy
```

Access at: `https://your-project.sanity.studio`

## 🧪 Development Guidelines

### Adding New Content Types

1. Create schema in `/sanity/schemaTypes/`
2. Export from `/sanity/schemaTypes/index.ts`
3. Add GROQ query in `/lib/sanity/queries.ts`
4. Add type in `/lib/content/types.ts`
5. Add service function in `/lib/content/index.ts`
6. Use in pages via service layer (no direct queries!)

### Sponsored Content

- Always use `SponsoredBadge` + `SponsoredDisclosure` components
- Badge shows `Megaphone` icon + "Gesponsord"
- Disclosure shows partner info with link
- Brand color (`#ff6666`) used for borders/accents

### Ad Slots

- Use `<AdSlot position="slot-name" />` in pages
- Slots: `listing-inline`, `article-inline`, `sidebar`
- System fetches active campaign automatically
- Falls back to placeholder if no campaign

## 🤝 Contributing

1. Follow existing patterns (service layer, no direct GROQ in pages)
2. Enforce sponsored governance in schemas
3. Use fixed ad slots (not per-page management)
4. Keep design tokens in Tailwind config
5. Document breaking changes

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Portable Text](https://portabletext.org/)

## 🐛 Troubleshooting

### "Cannot find module" errors

Ensure dependencies are installed:

```bash
pnpm install
```

### Sanity Studio not loading

1. Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
2. Verify Sanity project exists on sanity.io
3. Check browser console for CORS errors (add domain to Sanity CORS origins)

### Preview mode not working

1. Verify `DRAFT_SECRET` matches in env and preview URL
2. Check `SANITY_API_TOKEN` has correct permissions
3. Ensure content has drafts to preview

### Webhook revalidation failing

1. Check `Authorization` header in webhook config
2. Verify `REVALIDATE_SECRET` matches
3. Check webhook logs in Sanity dashboard
4. Test endpoint manually with curl

---

Built with ❤️ for interieur.expert
