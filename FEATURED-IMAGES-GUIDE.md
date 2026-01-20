# Featured Images Guide

## Overview
All articles now have comprehensive SEO content (600-800 words), but they're missing **featured images** which are required by the schema.

## How to Add Images

### Option 1: Via Sanity Studio (Recommended)
1. Go to https://interieurexpert.vercel.app/studio
2. Navigate to **Content** → **Articles**
3. For each article:
   - Click on the article title
   - Scroll to "Featured Image" field
   - Click "Select image" or drag & drop
   - Upload relevant interior design photo
   - Add alt text for SEO
   - Click **Publish**

### Option 2: Free Stock Photos
Use these sources for high-quality, royalty-free interior images:

- **Unsplash**: https://unsplash.com/s/photos/interior-design
- **Pexels**: https://www.pexels.com/search/interior/
- **Pixabay**: https://pixabay.com/images/search/interior/

Search terms per article category:
- **Japandi articles**: "japandi interior", "minimalist scandinavian"
- **Color articles**: "color psychology interior", "neutral interior"
- **Material articles**: "natural materials interior", "wood texture"
- **Small spaces**: "small apartment", "compact living"
- **Lighting**: "layered lighting interior", "ambient light"
- **Trends**: "modern interior 2024", "textured furniture"

### Option 3: AI-Generated Images
Use AI tools to generate custom interior images:
- **Midjourney**: `/imagine modern japandi living room, natural light, minimalist`
- **DALL-E**: "Photorealistic interior design, warm minimalism, natural materials"
- **Stable Diffusion**: "Interior design photography, scandinavian style, 8k"

## Image Requirements

### Technical Specs
- **Format**: JPG or PNG
- **Dimensions**: Minimum 1200x800px (aspect ratio 3:2 or 16:9)
- **File Size**: Under 2MB (Sanity will optimize)
- **Quality**: High resolution, well-lit, professional

### Content Guidelines
- Relevant to article topic
- Professional photography quality
- Good composition and lighting
- No watermarks or text overlays
- Avoid overly staged or cliché shots

## Articles Needing Images

All 25+ articles currently lack featured images:

1. **Japandi Style**
   - Japandi: de perfecte balans tussen Japans en Scandinavisch design
   - Image idea: Minimalist living room with wood, neutral tones, plants

2. **Color & Psychology**
   - Kleurpsychologie in interieur: hoe kleuren je stemming beïnvloeden
   - Neutrale kleuren slim combineren: meer dan grijs en beige
   - Image idea: Color swatches or beautifully lit neutral interior

3. **Materials**
   - De kracht van natuurlijke materialen in moderne interieurs
   - Vloeren vergelijken: hout, tegel, vinyl of beton?
   - Image idea: Close-up of wood grain, material textures

4. **Minimalism**
   - Warm minimalisme: zo creëer je een minimalistisch interieur dat uitnodigt
   - Minimalisme zonder koud te worden
   - Image idea: Cozy minimalist space with textiles

5. **Small Spaces**
   - Kleine ruimtes groter laten lijken: wat werkt écht
   - Image idea: Small but stylish apartment interior

6. **Lighting**
   - Verlichting in lagen: algemeen, taak en accent
   - Image idea: Room with multiple light sources, different layers

7. **Practical Guides**
   - Gordijnen ophangen: hoogte en breedte bepalen
   - Je eerste woning inrichten: waar begin je?
   - Budget inrichten zonder concessies: waar investeer je in?
   - Image idea: DIY installation or styled room on budget

8. **Acoustic & Technical**
   - Akoestiek verbeteren in open ruimtes
   - Image idea: Open plan living with textiles and soft furnishings

9. **Trends**
   - Interieurtrends 2026: textuur en ambacht
   - Image idea: Textured furniture, handmade ceramics, bouclé

## Batch Upload Tips

1. **Download images first**: Save all images locally with descriptive names
2. **Rename files**: Use article slug as filename (e.g., `japandi-interior.jpg`)
3. **Batch process**: Open multiple articles in tabs, upload simultaneously
4. **Add alt text**: Use SEO-friendly descriptions (e.g., "Modern japandi living room with natural wood and neutral textiles")
5. **Publish all at once**: After uploading to all articles, publish together

## SEO Benefits of Images

Adding featured images will:
- ✅ Improve Google image search rankings
- ✅ Increase social media engagement (Open Graph)
- ✅ Enhance user experience and time-on-page
- ✅ Reduce bounce rate
- ✅ Make content more shareable

## After Adding Images

The webhook will automatically:
1. Detect the article update in Sanity
2. Trigger revalidation of affected pages
3. Update live site within 5-10 seconds
4. Generate optimized image formats (WebP, etc.)

## Need Help?

If you encounter issues:
- Check Sanity Studio console for errors
- Verify image file size (under 2MB)
- Ensure image format is supported (JPG/PNG)
- Clear browser cache if images don't appear
- Check webhook logs in Vercel dashboard

---

**Priority**: Add featured images as soon as possible to complete the SEO optimization and improve user experience!
