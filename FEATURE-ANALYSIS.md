# Feature Analysis & Recommendations

## Date: January 20, 2026

---

## Request 1: Clickable Tags with Tag Pages ✅ HIGHLY RECOMMENDED

### Current State
- Tags are displayed on article cards as `<Pill>` components
- Tags are visual-only, not clickable
- No dedicated tag pages exist
- Tags exist in Sanity schema and are populated

### Feasibility: ⭐⭐⭐⭐⭐ (Very Easy)

**Complexity**: Low  
**Development Time**: 2-3 hours  
**Value**: High - significantly improves navigation and SEO

### Implementation Plan

#### 1. Create Tag Page Route
```
app/tags/[slug]/page.tsx
```
- Dynamic route for each tag
- Query Sanity for articles with matching tag
- Similar to category filtering on /inspiratie, /advies pages
- Layout: Hero + article grid + sidebar

#### 2. Make Tags Clickable
Update `ContentCard.tsx` tags section:
```tsx
// Current (line 148):
<Pill key={tag} variant="subtle" size="sm">{tag}</Pill>

// New:
<Link href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}>
  <Pill key={tag} variant="subtle" size="sm" className="hover:bg-accent hover:text-white cursor-pointer">
    {tag}
  </Pill>
</Link>
```

#### 3. Create Sanity Query
```groq
*[_type == "article" && $tag in tags] | order(publishedAt desc) {
  // article fields
}
```

#### 4. SEO Benefits
- ✅ Additional indexed pages (25+ tags = 25+ new pages)
- ✅ Internal linking improves site structure
- ✅ Better topic clustering for Google
- ✅ Increased user engagement (more page views)

### Recommendation: **IMPLEMENT IMMEDIATELY** ✅

This is a quick win with high value. Essential for modern content sites.

---

## Request 2: Enhanced Body Text Readability ✅ HIGHLY RECOMMENDED

### Current State
- PortableText supports: headings, paragraphs, lists, blockquotes, bold, italic, links, images
- No visual variety or emphasis in long-form content
- Missing: callouts, highlights, internal article links, pull quotes

### Feasibility: ⭐⭐⭐⭐☆ (Easy to Moderate)

**Complexity**: Low to Medium  
**Development Time**: 3-4 hours  
**Value**: High - improves readability and engagement

### Implementation Plan

#### 1. Enhanced Portable Text Marks (EASY - 1 hour)

Add to `components/editorial/PortableText.tsx`:

**Highlight/Mark**
```tsx
marks: {
  highlight: ({children}) => (
    <mark className="bg-accent/20 text-text px-1 rounded">
      {children}
    </mark>
  ),
}
```

**Inline Code**
```tsx
code: ({children}) => (
  <code className="bg-text/10 text-accent px-2 py-0.5 rounded text-sm font-mono">
    {children}
  </code>
),
```

#### 2. Internal Article Links (MODERATE - 2 hours)

Create custom annotation in Sanity:
```ts
// sanity/schemaTypes/annotations/internalLink.ts
{
  name: 'internalArticleLink',
  type: 'object',
  title: 'Internal Article Link',
  fields: [
    {
      name: 'reference',
      type: 'reference',
      to: [{type: 'article'}]
    }
  ]
}
```

Render in PortableText:
```tsx
marks: {
  internalArticleLink: ({children, value}) => {
    const slug = value?.reference?.slug?.current;
    return (
      <Link 
        href={`/artikels/${slug}`}
        className="text-accent hover:underline font-medium"
      >
        {children}
      </Link>
    );
  }
}
```

#### 3. Callout Boxes (EASY - 1 hour)

Add custom block type:
```tsx
types: {
  callout: ({value}) => (
    <div className="my-6 p-6 bg-accent/5 border-l-4 border-accent rounded-r">
      <p className="text-text leading-relaxed">
        {value.text}
      </p>
    </div>
  ),
}
```

#### 4. Pull Quotes (EASY - 30 min)

```tsx
pullQuote: ({value}) => (
  <blockquote className="my-8 text-center">
    <p className="text-2xl font-heading text-text italic">
      "{value.quote}"
    </p>
  </blockquote>
),
```

### Readability Improvements Checklist

- ✅ **Bold text**: Already supported (`<strong>`)
- ✅ **Italic**: Already supported (`<em>`)
- ✅ **External links**: Already supported
- ⚠️ **Highlights**: Need to add
- ⚠️ **Internal links**: Need to add with reference selector
- ⚠️ **Callouts/alerts**: Need to add custom block
- ⚠️ **Pull quotes**: Need to add for emphasis
- ⚠️ **Inline code**: Need to add for technical content
- ✅ **Lists**: Already supported
- ✅ **Blockquotes**: Already supported

### Current PortableText Features (Already Working)
```tsx
// From components/editorial/PortableText.tsx
- H2, H3, H4 headings ✅
- Normal paragraphs ✅
- Blockquotes ✅
- Bold (strong) ✅
- Italic (em) ✅
- External links ✅
- Images with alt text ✅
- Bullet lists ✅
- Numbered lists ✅
```

### Recommendation: **IMPLEMENT IN PHASES** ✅

**Phase 1 (Now)**: Internal article links - highest value  
**Phase 2 (Soon)**: Highlights and callouts  
**Phase 3 (Later)**: Pull quotes and advanced formatting

---

## Request 3: Analytics & Reporting Dashboard 🚨 COMPLEX BUT VALUABLE

### Current State
- **NO analytics tracking** currently implemented
- AdSlot component is hardcoded (no campaign rotation)
- No click tracking on ads
- No page view tracking
- No database for storing metrics

### Feasibility: ⭐⭐⭐☆☆ (Moderate to Complex)

**Complexity**: Medium to High  
**Development Time**: 20-40 hours (full implementation)  
**Value**: Very High - essential for monetization

### Analysis: What's Needed

#### A. Analytics Foundation

**Option 1: Use Vercel Analytics (RECOMMENDED)** ⭐⭐⭐⭐⭐
- **Pros**: 
  - Built-in, zero configuration
  - Free tier: 2,500 events/month
  - Page views, unique visitors, top pages
  - Web Vitals, performance metrics
  - Privacy-friendly (GDPR compliant)
- **Cons**: 
  - Limited customization
  - No custom events in free tier
  - No advertiser-specific tracking
- **Setup**: 5 minutes
- **Cost**: Free (up to 2,500 events) → $10/month (25k events)

**Option 2: Plausible Analytics** ⭐⭐⭐⭐☆
- **Pros**:
  - Privacy-first, cookie-free
  - Beautiful UI
  - Custom events support
  - Can track tag/category performance
- **Cons**:
  - Paid only ($9/month for 10k pageviews)
  - External service
- **Setup**: 15 minutes
- **Cost**: $9-19/month

**Option 3: Google Analytics 4** ⭐⭐⭐☆☆
- **Pros**:
  - Free, unlimited
  - Extremely powerful
  - Industry standard
  - Custom events, conversions
- **Cons**:
  - Complex setup
  - Privacy concerns (GDPR)
  - Cookie banners required
  - Steep learning curve
- **Setup**: 2-3 hours
- **Cost**: Free

**Option 4: Custom Solution (Database + API)** ⭐⭐☆☆☆
- **Pros**:
  - Complete control
  - Custom metrics
  - Per-advertiser tracking
- **Cons**:
  - High development cost (30+ hours)
  - Database costs
  - Maintenance burden
  - Need to build dashboard UI
- **Setup**: 30-40 hours
- **Cost**: $25-100/month (database + hosting)

#### B. Ad Campaign System

**Current Issue**: AdSlot shows ONE hardcoded placeholder

**What's Needed**:

1. **Dynamic Ad Selection** (8 hours)
   - Query active campaigns from Sanity
   - Filter by slot position (sidebar, inline, etc.)
   - Filter by category/tags (if targeted)
   - Handle date ranges (start/end date)
   - Respect priority (1-10 scale)

2. **Rotation Logic** (4 hours)
   - **Round-robin**: Equal impressions per campaign
   - **Weighted**: Based on priority field
   - **Time-based**: Rotate every N seconds
   - **User-based**: Different ad per user session

3. **Impression Tracking** (6 hours)
   - Fire event when ad is viewed
   - Store: campaign ID, timestamp, page URL, user session
   - Requires: Database (Supabase/Firestore) OR API route + storage

4. **Click Tracking** (3 hours)
   - Intercept ad clicks
   - Store: campaign ID, timestamp, destination URL
   - Calculate CTR (Click-Through Rate)

5. **Reporting Dashboard** (15-20 hours)
   - Admin UI to view metrics
   - Per-campaign stats (impressions, clicks, CTR)
   - Per-advertiser aggregated reports
   - Time range filters (today, week, month, custom)
   - Export to CSV/PDF
   - Charts and visualizations

### Current Ad Schema (Already in Sanity)

```typescript
// adCampaign schema (EXISTS):
- title: Campaign name
- slot: Position (sidebar, inline, etc.)
- creative: Reference to adCreative
- targetCategory: Optional category filtering
- targetTags: Optional tag filtering
- startDate, endDate: Date range
- priority: 1-10 (for weighting)
- active: Boolean on/off switch

// adCreative schema (EXISTS):
- title
- image/video
- headline, description
- clickUrl
- partner reference
```

**This is 80% ready for dynamic ad serving!**

### Multiple Campaigns: How Would It Work?

**Scenario**: 3 campaigns targeting same slot

```
Campaign A: Priority 8, sidebar, all pages
Campaign B: Priority 5, sidebar, category="Stijlen"
Campaign C: Priority 3, sidebar, tags=["minimalism"]
```

**Option 1: Priority-Weighted Random Selection** ⭐ RECOMMENDED
```
Total weight = 8 + 5 + 3 = 16
Campaign A: 50% chance (8/16)
Campaign B: 31% chance (5/16)
Campaign C: 19% chance (3/16)
```
Result: Higher priority = more impressions, but all campaigns get traffic.

**Option 2: Strict Priority (Waterfall)**
```
Always show Campaign A (highest priority)
Only show B if A is not eligible
Only show C if A and B are not eligible
```
Result: Lower priority campaigns rarely show.

**Option 3: Equal Rotation**
```
Ignore priority, rotate equally
Campaign A, B, C each get 33% impressions
```
Result: Fair distribution, but ignores advertiser pricing.

### Reporting Requirements

#### Organic Content Analytics
- **Page Views**: Total per article
- **Unique Visitors**: Per article
- **Time on Page**: Average reading time
- **Bounce Rate**: % who leave immediately
- **Popular Articles**: Top 10 by views
- **Popular Tags**: Most viewed tags
- **Popular Categories**: Most viewed categories
- **Traffic Sources**: Direct, search, social, referral

#### Sponsored Content Analytics
- **Impressions**: How many times ad was shown
- **Clicks**: How many times ad was clicked
- **CTR**: Click-through rate (clicks/impressions)
- **Per Campaign**: Individual campaign stats
- **Per Advertiser**: Aggregated across all campaigns
- **Per Slot**: Performance by position
- **Date Range**: Filter by time period

### Implementation Complexity

| Feature | Complexity | Time | Value |
|---------|-----------|------|-------|
| Basic Analytics (Vercel) | ⭐☆☆☆☆ | 5 min | ⭐⭐⭐⭐☆ |
| Dynamic Ad Selection | ⭐⭐⭐☆☆ | 8 hrs | ⭐⭐⭐⭐⭐ |
| Ad Rotation Logic | ⭐⭐☆☆☆ | 4 hrs | ⭐⭐⭐⭐⭐ |
| Impression Tracking | ⭐⭐⭐☆☆ | 6 hrs | ⭐⭐⭐⭐⭐ |
| Click Tracking | ⭐⭐☆☆☆ | 3 hrs | ⭐⭐⭐⭐⭐ |
| Reporting Dashboard | ⭐⭐⭐⭐☆ | 20 hrs | ⭐⭐⭐⭐⭐ |
| **TOTAL** | **Medium-High** | **41+ hrs** | **Essential** |

### Database Choice for Ad Tracking

**Recommended: Supabase (PostgreSQL)** ⭐⭐⭐⭐⭐
- **Pros**:
  - Free tier: 500MB database, 2GB bandwidth
  - Built-in auth (if needed for admin)
  - Real-time subscriptions
  - RESTful API auto-generated
  - JavaScript SDK
  - Row-level security
- **Cons**:
  - Additional service to manage
- **Cost**: Free → $25/month (8GB database)

**Alternative: Vercel KV (Redis)** ⭐⭐⭐☆☆
- **Pros**:
  - Integrated with Vercel
  - Very fast (in-memory)
  - Simple key-value store
- **Cons**:
  - Not ideal for complex queries
  - No relationships
  - Limited free tier (256MB)
- **Cost**: Free → $20/month (1GB)

### Recommendation: **PHASED IMPLEMENTATION** 🎯

#### Phase 1: Foundation (Week 1) - 8 hours
1. ✅ Add Vercel Analytics (5 min)
2. ✅ Implement dynamic ad selection (8 hrs)
   - Query active campaigns from Sanity
   - Filter by slot, category, tags, dates
   - Weighted random selection based on priority

**Result**: Multiple campaigns can run simultaneously with fair distribution

#### Phase 2: Tracking (Week 2) - 12 hours
1. ✅ Set up Supabase project (1 hr)
2. ✅ Create impressions/clicks tables (1 hr)
3. ✅ Implement impression tracking (6 hrs)
4. ✅ Implement click tracking (3 hrs)
5. ✅ Test and verify data collection (1 hr)

**Result**: Start collecting ad performance data

#### Phase 3: Reporting (Week 3-4) - 20 hours
1. ✅ Create admin route `/studio/analytics` (2 hrs)
2. ✅ Build campaign stats queries (4 hrs)
3. ✅ Build advertiser aggregation (3 hrs)
4. ✅ Create dashboard UI with charts (8 hrs)
5. ✅ Add export functionality (3 hrs)

**Result**: Full visibility into ad performance

#### Phase 4: Advanced (Future) - Optional
- A/B testing different creatives
- Audience segmentation
- Conversion tracking beyond clicks
- Integration with advertiser dashboards (API)
- Automated reporting emails

### Cost Analysis

| Component | Monthly Cost |
|-----------|--------------|
| Vercel Hosting | $0 (Hobby) or $20 (Pro) |
| Vercel Analytics | $0 (free tier OK for start) |
| Supabase Database | $0 (free tier) → $25 (growth) |
| Domain | ~$15/year |
| **Total** | **$0-45/month** |

### ROI Consideration

If you sell ads:
- **Scenario**: 3 advertisers, €200/month each = €600/month revenue
- **Cost**: €45/month for infrastructure
- **Margin**: €555/month
- **ROI**: Analytics and proper ad serving pays for itself 12x over

Without tracking:
- Can't prove value to advertisers
- No data for pricing decisions
- Risk of unfair distribution between campaigns
- No optimization insights

### Comparison: Build vs. Use Existing Solutions

**Build Custom Dashboard**
- **Pros**: Perfect fit, full control, custom metrics
- **Cons**: 40+ hours, ongoing maintenance, custom UI
- **Cost**: Development time (€2000+ at €50/hr)

**Use Existing Ad Platform (e.g., Google Ad Manager)**
- **Pros**: Professional solution, proven, full-featured
- **Cons**: Overkill for small site, complex, expensive
- **Cost**: Free for small publishers, but invasive tracking

**Recommended: Hybrid Approach**
- Use Vercel Analytics for organic content
- Build minimal custom ad tracking (Phase 1-2)
- Start with simple reports (Phase 3 minimal)
- Expand as needed when revenue justifies investment

---

## Summary & Priorities

### 🟢 Implement Now (This Week)

1. **Clickable Tags + Tag Pages** (3 hours)
   - High value, low effort
   - Improves SEO and navigation
   - Quick win for users

2. **Internal Article Links in PortableText** (2 hours)
   - Increases time-on-site
   - Better internal linking for SEO
   - Helps readers discover related content

### 🟡 Implement Soon (Next 2 Weeks)

3. **Dynamic Ad Selection** (8 hours)
   - Critical for multiple advertisers
   - Use existing Sanity ad schema
   - Weighted rotation by priority

4. **Vercel Analytics Setup** (5 minutes)
   - No-brainer, instant value
   - Start collecting baseline data

5. **Enhanced Readability** (2 hours)
   - Highlights, callouts, pull quotes
   - Makes long-form content more engaging

### 🔴 Plan for Later (When Revenue Justifies)

6. **Ad Tracking System** (12 hours)
   - Essential for proving value to advertisers
   - Requires database setup
   - Worth it once you have paying campaigns

7. **Reporting Dashboard** (20 hours)
   - Significant investment
   - Build incrementally
   - Start with basic metrics, expand as needed

---

## Recommended Tech Stack for Analytics

```
Organic Content Analytics:
└── Vercel Analytics (built-in, free)

Ad Performance Tracking:
├── Database: Supabase (PostgreSQL)
├── API Routes: Next.js API routes
├── Frontend: React + Chart.js or Recharts
└── Admin UI: /studio/analytics

Ad Serving:
├── Data Source: Sanity CMS (campaigns already there)
├── Selection Logic: Server component
├── Rotation: Weighted random by priority
└── Tracking: Client-side events → API → Supabase
```

---

## Final Recommendation

**Start with the easy wins**:
1. Clickable tags (3 hrs) ✅ DO NOW
2. Internal links (2 hrs) ✅ DO NOW
3. Vercel Analytics (5 min) ✅ DO NOW

**Then prepare for monetization**:
4. Dynamic ad selection (8 hrs) ✅ DO THIS WEEK
5. Set up Supabase for tracking ✅ DO NEXT WEEK
6. Build minimal reporting ✅ DO WHEN YOU HAVE FIRST PAYING ADVERTISER

**Total initial investment**: ~13 hours for massive improvements

**ROI**: High for all Phase 1 features. Phase 2-3 pays for itself once you have advertisers.

---

## Questions to Answer Before Building

1. **How many advertisers do you expect?**
   - If 1-2: Simple rotation is fine
   - If 5+: Need sophisticated weighting

2. **What's your revenue model?**
   - CPM (cost per 1000 impressions): Need impression tracking
   - CPC (cost per click): Need click tracking
   - Flat fee: Basic metrics sufficient

3. **How often will you check reports?**
   - Daily: Build full dashboard
   - Weekly: Simple CSV exports fine
   - Monthly: Quarterly: Really basic is OK

4. **Do advertisers need self-service access?**
   - No: Admin-only dashboard is fine
   - Yes: Need login, per-advertiser views (add 20 hrs)

5. **How important is real-time data?**
   - Critical: Use real-time database subscriptions
   - Nice-to-have: Daily batched updates are fine
   - Not important: Manual exports work

---

Would you like me to proceed with implementing any of these features? I recommend starting with:
1. **Clickable tags** (immediate value)
2. **Vercel Analytics** (literally 5 minutes)
3. **Dynamic ad selection** (unlocks multiple advertisers)

Then we can tackle the analytics dashboard once you have paying campaigns and real data to track.
