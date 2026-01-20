# Deployment Checklist

## ✅ Pre-Deployment

- [x] All 4 "DO NOW" features implemented
- [x] No TypeScript errors in new code
- [x] Documentation created (3 guides)
- [ ] Test locally with `pnpm dev`

## 📦 Files to Deploy

### New Files (5)
- [x] `app/tags/[slug]/page.tsx` - Dynamic tag pages
- [x] `lib/ads/campaigns.ts` - Ad selection logic
- [x] `sanity/schemaTypes/annotations/internalArticleLink.ts` - Internal link annotation
- [x] `AD-CAMPAIGN-GUIDE.md` - Campaign setup guide
- [x] `FEATURE-IMPLEMENTATION.md` - Implementation summary

### Modified Files (5)
- [x] `app/layout.tsx` - Added Analytics
- [x] `components/ads/AdSlot.tsx` - Dynamic ad rendering
- [x] `components/editorial/ContentCard.tsx` - Clickable tags
- [x] `components/editorial/PortableText.tsx` - Enhanced rendering
- [x] `sanity/schemaTypes/article.ts` - Enhanced body field

### Documentation Files (2)
- [x] `FEATURE-ANALYSIS.md` - Original analysis
- [x] `scripts/create-test-campaigns.ts` - Test campaign script

## 🚀 Deployment Steps

### 1. Local Testing
```bash
cd /home/dkvision/staging/interieur.expert
pnpm dev
```

Test:
- [ ] Homepage loads
- [ ] Articles load
- [ ] Click a tag → Goes to tag page
- [ ] Tag page shows filtered articles
- [ ] Ads show fallback placeholder (no campaigns yet)

### 2. Git Commit
```bash
git add .
git commit -m "feat: Implement Phase 1 features - analytics, clickable tags, internal links, dynamic ads

- Add Vercel Analytics for page view tracking
- Create dynamic tag pages with article filtering
- Implement internal article link annotation in Sanity
- Add highlight decorator for emphasized text
- Build dynamic ad selection system with priority weighting
- Support image and HTML ad formats
- Add optional targeting by category and tags
- Create comprehensive documentation

Closes #feature-request-tags
Closes #feature-request-readability
Closes #feature-request-analytics"
```

### 3. Deploy to Vercel
```bash
vercel --prod
```

Or push to main branch for auto-deploy:
```bash
git push origin main
```

### 4. Post-Deployment Verification

#### A. Test Site Functionality
- [ ] Visit https://interieurexpert.vercel.app
- [ ] Click article → Check it loads
- [ ] Click tag on article → Check tag page loads
- [ ] Check sidebar ads show placeholder

#### B. Test Sanity Studio
- [ ] Visit https://interieurexpert.vercel.app/studio
- [ ] Open an article for editing
- [ ] Select text → Verify "Highlight" button appears
- [ ] Select text → Verify "Internal Article Link" appears
- [ ] Save article → Verify no errors

#### C. Create Test Campaigns
Follow [AD-CAMPAIGN-GUIDE.md](AD-CAMPAIGN-GUIDE.md):

1. **Create Ad Creatives**
   - [ ] Create Creative 1: Premium Meubels (upload image)
   - [ ] Create Creative 2: Duurzame Verlichting (upload image)
   - [ ] Create Creative 3: Winter Sale (HTML ad)

2. **Create Ad Campaigns**
   - [ ] Create Campaign 1: Sidebar, Priority 8, Stijlen category
   - [ ] Create Campaign 2: Listing, Priority 5, No targeting
   - [ ] Create Campaign 3: Sidebar, Priority 6, No targeting

3. **Verify Campaigns**
   - [ ] Refresh homepage → See ad in sidebar
   - [ ] Refresh multiple times → Ads rotate (Campaign 1 vs 3)
   - [ ] Visit Stijlen article → Campaign 1 should have higher chance
   - [ ] Visit non-Stijlen article → Both campaigns equal chance

#### D. Test Tag System
- [ ] Visit any article
- [ ] Click on a tag (e.g., "minimalism")
- [ ] Verify tag page shows all articles with that tag
- [ ] Verify breadcrumb works
- [ ] Verify SEO title shows "#{tag}"

#### E. Test Internal Links
- [ ] Edit an article in Sanity Studio
- [ ] Add internal link to another article
- [ ] Publish changes
- [ ] Visit article page → Verify link appears
- [ ] Click link → Verify navigation works

#### F. Test Highlights
- [ ] Edit article in Sanity Studio
- [ ] Select text → Click "Highlight"
- [ ] Publish changes
- [ ] Visit article → Verify text has colored background

#### G. Check Analytics
- [ ] Visit Vercel Dashboard → Analytics
- [ ] Wait 5-10 minutes for data
- [ ] Verify page views are tracked
- [ ] Check which pages get most traffic

## 🐛 Common Issues & Solutions

### Issue: Ads not showing
**Solution**: 
- Check campaigns are active in Sanity
- Verify date ranges include today
- Check slot name matches exactly
- Ensure creative is linked to campaign

### Issue: Tag page shows no articles
**Solution**:
- Verify tag spelling matches exactly (case-sensitive)
- Check articles have that tag in Sanity
- Try lowercase tag slug: `/tags/minimalism`

### Issue: Internal links don't work
**Solution**:
- Verify article reference is set in Sanity
- Check referenced article exists and is published
- Check slug is correct

### Issue: Analytics not showing data
**Solution**:
- Wait 10-15 minutes for initial data
- Verify deployment succeeded
- Check Vercel dashboard, not Sanity

### Issue: Sanity Studio errors
**Solution**:
- Sanity Studio needs restart after schema changes
- Close studio tab → Reopen
- Clear browser cache if needed

## 📊 Success Metrics

### Immediate (Day 1)
- [ ] All pages load without errors
- [ ] Analytics tracking page views
- [ ] Ads showing when campaigns exist
- [ ] Tags clickable and working

### Short-term (Week 1)
- [ ] Tag navigation being used (check analytics)
- [ ] Ad campaigns running smoothly
- [ ] No reported bugs from users
- [ ] Content editors using new features

### Medium-term (Month 1)
- [ ] Increased pages per session (from tag navigation)
- [ ] Ad click-through data (Phase 3)
- [ ] Content with internal links performing better
- [ ] More tags being created

## 🔄 Rollback Plan

If critical issues occur:

1. **Revert deployment**:
```bash
vercel rollback
```

2. **Revert git commit**:
```bash
git revert HEAD
git push origin main
```

3. **Emergency hotfix**:
- Disable problematic campaigns in Sanity (set active = false)
- Fix issue locally
- Redeploy

## 📝 Post-Deployment Tasks

### Content Team
- [ ] Share AD-CAMPAIGN-GUIDE.md with ad managers
- [ ] Train content editors on highlight and internal links
- [ ] Create style guide for when to use highlights
- [ ] Document tag naming conventions

### Development
- [ ] Monitor Vercel logs for errors
- [ ] Check Sentry (if configured) for exceptions
- [ ] Review analytics data weekly
- [ ] Plan Phase 2 features

### Business
- [ ] Reach out to potential advertisers
- [ ] Set pricing for different priority levels
- [ ] Document ad specs (image sizes, formats)
- [ ] Create advertiser onboarding guide

## ✅ Sign-off

When all checklist items complete:

- [ ] Development: All features working ✅
- [ ] Testing: No critical bugs found ✅
- [ ] Documentation: All guides created ✅
- [ ] Deployment: Live on production ✅
- [ ] Verification: Post-deployment tests passed ✅

**Deployed by**: _________________
**Date**: _________________
**Version**: Phase 1 - Analytics, Tags, Internal Links, Dynamic Ads
**Status**: ✅ Production Ready

---

## 🎉 Next Steps

After successful deployment:

1. Create test campaigns to demonstrate system
2. Monitor analytics for traffic patterns
3. Gather feedback from content editors
4. Plan Phase 2 features (enhanced readability)
5. Consider Phase 3 (ad performance dashboard)

See [FEATURE-ANALYSIS.md](FEATURE-ANALYSIS.md) for full roadmap.
