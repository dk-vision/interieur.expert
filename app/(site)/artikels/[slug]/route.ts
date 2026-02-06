import { NextResponse } from 'next/server';
import { sanityFetch } from '@/lib/sanity/client';

// Redirect old /artikels/[slug] URLs to new /[category]/[slug] URLs
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;

  try {
    // Fetch the article to get its category
    const article = await sanityFetch<{ category: string }>({
      query: `*[_type == "article" && slug.current == $slug][0]{category}`,
      params: { slug },
    });

    if (!article || !article.category) {
      // If no article found or no category, return 404
      return new NextResponse('Not Found', { status: 404 });
    }

    // Redirect to new URL structure
    const newUrl = `/${article.category}/${slug}`;
    return NextResponse.redirect(new URL(newUrl, request.url), 301);
  } catch (error) {
    console.error('Error redirecting article:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
