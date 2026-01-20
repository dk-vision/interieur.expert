# Quick Start Guide - New Features

## 🎯 What's New?

You now have 4 powerful new features:
1. ✅ **Vercel Analytics** - Automatic page view tracking
2. ✅ **Clickable Tags** - Tags now link to filtered article pages
3. ✅ **Internal Article Links** - Link between articles in content
4. ✅ **Dynamic Ads** - Run multiple ad campaigns with smart rotation

---

## 🚀 Quick Start (5 Minutes)

### 1. Deploy to Production
```bash
cd /home/dkvision/staging/interieur.expert
git add .
git commit -m "feat: Add Phase 1 features"
vercel --prod
```

### 2. Create Your First Ad Campaign

Go to: https://interieurexpert.vercel.app/studio

**Step A: Create Ad Creative**
1. Content → Ad Creative → Create
2. Title: `Test Ad`
3. Format: `HTML`
4. Link URL: `https://www.example.com`
5. HTML Code:
```html
<div style="padding: 2rem; background: #f3f4f6; text-align: center;">
  <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem;">Test Advertisement</h3>
  <p>Your ad content here</p>
</div>
```
6. Publish

**Step B: Create Ad Campaign**
1. Content → Ad Campaign → Create
2. Campaign Title: `Test Campaign`
3. Ad Slot: `Sidebar`
4. Creative: Select "Test Ad"
5. Start Date: Today
6. End Date: 1 month from now
7. Priority: `5`
8. Active: ✓ Enabled
9. Publish

**Step C: Verify**
- Visit your site
- Look at sidebar → Ad should appear!

---

## 📝 Using New Content Features

### Highlight Text
In Sanity Studio article editor:
1. Select text you want to emphasize
2. Click **"Highlight"** button
3. Text will show with colored background on site

### Link to Another Article
1. Select text in article
2. Click **"Internal Article Link"**
3. Select article from dropdown
4. Publish
5. Text becomes clickable link to that article

### External Links
1. Select text
2. Click **"External URL"** (formerly "link")
3. Enter URL
4. Publish

---

## 🏷️ Tag System

**Automatic**: Tags are now automatically clickable!
- Every tag on every article is a link
- Clicking takes you to `/tags/[tag-name]`
- Shows all articles with that tag

**Example**:
- Article has tag "minimalism"
- Click tag → Goes to `/tags/minimalism`
- Shows all minimalism articles

---

## 💰 Ad Campaign System

### Priority System (Important!)
When multiple campaigns target same slot:
- Priority 8 + Priority 6 = Total 14
- Campaign 1 (8): Shows **57%** of time (8/14)
- Campaign 2 (6): Shows **43%** of time (6/14)

**Use this to control ad rotation!**

### Targeting (Optional)
**Category targeting**: Show only on specific category pages
- Example: `Stijlen` category → Only shows on Stijlen articles

**Tag targeting**: Show only on pages with specific tags
- Example: `minimalism, scandinavisch` → Only shows on articles with these tags

**Tip**: Leave empty to show everywhere

### Ad Slots
- **Sidebar**: Right side of pages (desktop only)
- **Listing Inline**: Between content on listing pages
- **Article Inline**: Within article content

---

## 📊 Analytics

**Automatic**: Vercel Analytics tracks everything!
- Page views
- Which pages are popular
- User locations
- Device types

**View data**: Vercel Dashboard → Analytics

**Note**: Takes 10-15 minutes for first data to appear

---

## 🔍 Quick Troubleshooting

### "Ad not showing"
- ✅ Check campaign is Active
- ✅ Check dates include today
- ✅ Check slot name matches page

### "Tag page is empty"
- ✅ Check articles have that exact tag
- ✅ Tags are case-sensitive
- ✅ Try lowercase URL

### "Internal link doesn't work"
- ✅ Check article reference is selected
- ✅ Check referenced article is published
- ✅ Refresh Sanity Studio

### "Highlight not showing"
- ✅ Re-publish article
- ✅ Clear browser cache
- ✅ Check in incognito mode

---

## 📚 Full Documentation

- **[AD-CAMPAIGN-GUIDE.md](AD-CAMPAIGN-GUIDE.md)** - Complete ad setup guide
- **[FEATURE-IMPLEMENTATION.md](FEATURE-IMPLEMENTATION.md)** - What was implemented
- **[DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)** - Deployment steps
- **[FEATURE-ANALYSIS.md](FEATURE-ANALYSIS.md)** - Full feature analysis

---

## 🎨 Examples to Try

### Create Multiple Campaigns (Test Priority)
1. Create 2 creatives with different colors
2. Create 2 campaigns, same slot, different priorities
3. Refresh page multiple times
4. Higher priority shows more often!

### Use Internal Links
1. Write article about "Minimalism"
2. In body, mention "Scandinavian design"
3. Link that text to your Scandinavian article
4. Visitors can discover related content!

### Test Tag Navigation
1. Add diverse tags to articles
2. Click any tag
3. See all related articles
4. Great for content discovery!

---

## ⏭️ What's Next? (Optional Phase 2)

If you want more features later:
- 📊 Ad performance dashboard (impressions, clicks)
- 💬 Pull quotes and callouts
- 🎨 Better typography spacing
- ⏱️ Article read time estimator
- 🔗 Related articles algorithm

See [FEATURE-ANALYSIS.md](FEATURE-ANALYSIS.md) for details.

---

## 🆘 Need Help?

**Check Documentation**:
1. Find your issue in troubleshooting sections
2. Search in the 4 documentation files
3. Check Vercel logs for errors

**Common Solutions**:
- Restart Sanity Studio (close/reopen tab)
- Clear browser cache
- Wait 15 minutes for changes to appear
- Redeploy if needed: `vercel --prod`

---

**Quick Links**:
- Live Site: https://interieurexpert.vercel.app
- Sanity Studio: https://interieurexpert.vercel.app/studio
- Vercel Dashboard: https://vercel.com/dashboard

✅ **All features are production-ready and tested!**
