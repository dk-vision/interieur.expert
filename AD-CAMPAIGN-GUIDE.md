# Ad Campaign Setup Guide

## Overview
The dynamic ad system is now fully implemented! Ads are selected based on:
- **Active status** and **date ranges** (only shows between startDate and endDate)
- **Priority weighting** (1-10 scale, higher = more often shown)
- **Optional targeting** (category and tags)

## Creating Test Campaigns

### Step 1: Create Ad Creatives

Go to Sanity Studio → Content → Ad Creative → Create New

**Creative 1: Premium Meubels (Image Ad)**
- Title: `Premium Meubels Sidebar Ad`
- Format: `Image`
- Link URL: `https://www.example.com/meubels`
- Alt Text: `Premium meubels voor uw interieur`
- Image: Upload a furniture/interior image (600x338px recommended)

**Creative 2: Duurzame Verlichting (Image Ad)**
- Title: `Duurzame Verlichting Listing Ad`
- Format: `Image`
- Link URL: `https://www.example.com/verlichting`
- Alt Text: `Duurzame verlichting voor iedere ruimte`
- Image: Upload a lighting/lamp image

**Creative 3: Winter Sale (HTML Ad)**
- Title: `Winter Sale HTML Ad`
- Format: `HTML`
- Link URL: `https://www.example.com/offers`
- HTML Code:
```html
<div style="padding: 2rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
  <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">Winter Sale!</h3>
  <p style="font-size: 1rem; margin-bottom: 1rem;">Tot 50% korting op interieur items</p>
  <div style="background: white; color: #667eea; padding: 0.5rem 1.5rem; border-radius: 0.25rem; font-weight: bold; display: inline-block;">
    Bekijk Aanbiedingen
  </div>
</div>
```

### Step 2: Create Ad Campaigns

Go to Sanity Studio → Content → Ad Campaign → Create New

**Campaign 1: Premium Meubels - Sidebar (High Priority)**
- Campaign Title: `Premium Meubels - Sidebar`
- Ad Slot: `Sidebar`
- Creative: Select "Premium Meubels Sidebar Ad"
- Target Category: `Stijlen` (optional - shows only on Stijlen category pages)
- Target Tags: `minimalism, scandinavisch` (optional - shows only on pages with these tags)
- Start Date: Today's date
- End Date: 1 month from now
- Priority: `8` (high priority = shows 57% of the time vs campaign 3)
- Active: ✓ Enabled

**Campaign 2: Duurzame Verlichting - Listing (Medium Priority)**
- Campaign Title: `Duurzame Verlichting - Listing`
- Ad Slot: `Listing Inline`
- Creative: Select "Duurzame Verlichting Listing Ad"
- Target Category: Leave empty (shows everywhere)
- Target Tags: Leave empty
- Start Date: Today's date
- End Date: 1 month from now
- Priority: `5` (medium priority)
- Active: ✓ Enabled

**Campaign 3: Winter Sale - Sidebar (Medium Priority)**
- Campaign Title: `Winter Sale - Sidebar`
- Ad Slot: `Sidebar`
- Creative: Select "Winter Sale HTML Ad"
- Target Category: Leave empty
- Target Tags: Leave empty
- Start Date: Today's date
- End Date: 1 month from now
- Priority: `6` (medium-high priority = shows 43% of the time vs campaign 1)
- Active: ✓ Enabled

## How Priority Works

When multiple campaigns target the same slot, the system uses **weighted random selection**:

**Example: Sidebar Slot**
- Campaign 1 (priority 8) + Campaign 3 (priority 6) = Total weight 14
- Campaign 1 probability: 8/14 = **57% chance**
- Campaign 3 probability: 6/14 = **43% chance**

This ensures:
- Higher priority campaigns show more often
- Lower priority campaigns still get impressions
- Fair distribution based on advertiser importance

## Testing the System

1. **Create campaigns** in Sanity Studio (above steps)
2. **Refresh pages** to see ads appear
3. **Test targeting**:
   - Visit article with "minimalism" tag → Should see Campaign 1 in sidebar
   - Visit article without tags → Should see Campaign 1 or 3 randomly
4. **Test rotation**: Refresh page multiple times → Ads should rotate based on priority
5. **Test slots**: Check different pages (listing, article) → Different ads in different slots

## Ad Slot Positions

- **Sidebar**: Appears on right side of listing and article pages (desktop only)
- **Listing Inline**: Could be placed between content cards on listing pages
- **Article Inline**: Could be placed within article content

## Next Steps

1. Create real campaigns with actual advertiser content
2. Upload professional images for image-based ads
3. Monitor which campaigns perform best
4. Adjust priorities based on advertiser contracts
5. Use targeting to show relevant ads on specific pages

## Analytics Setup

✅ Vercel Analytics is installed and tracking page views automatically
- No additional setup required
- View analytics in Vercel dashboard
- Track which pages get most traffic to optimize ad placement

## Future Enhancements (Phase 3)

When you have actual advertisers:
- Add impression tracking (count how many times each ad is shown)
- Add click tracking (count clicks per campaign)
- Create analytics dashboard in Sanity Studio
- Generate reports for advertisers
- A/B testing for ad creatives
- Time-of-day targeting
