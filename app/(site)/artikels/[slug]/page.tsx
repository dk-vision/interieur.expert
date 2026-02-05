import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import ArticleBody from "@/components/editorial/ArticleBody";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import RelatedArticles from "@/components/editorial/RelatedArticles";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { articleBySlugQuery, relatedArticlesQuery } from "@/lib/sanity/queries";
import { PortableText } from "@/components/editorial/PortableText";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Article } from "@/lib/content/types";
import { calculateReadingTime } from "@/lib/utils/reading-time";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArtikelPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch article data
  const article = await sanityFetch<Article>({
    query: articleBySlugQuery,
    params: { slug },
  });

  if (!article) {
    notFound();
  }

  // Auto-calculate reading time if not set
  const readingTime = article.readingTime || calculateReadingTime(article.body);

  // Fetch related articles based on tags
  const relatedArticles: Article[] =
    article.tags && article.tags.length > 0
      ? await sanityFetch<Article[]>({
          query: relatedArticlesQuery,
          params: {
            currentId: article._id,
            tags: article.tags,
          },
        })
      : [];

  const imageUrl = article.featuredImage
    ? urlForImage(article.featuredImage).width(1280).height(720).url()
    : null;

  return (
    <article>
      {/* Hero Section */}
      <Section spacing="lg">
        <Container size="layout">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6 text-center">
              <MetaRow
                publishedAt={new Date(article.publishedAt).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                readingTime={readingTime}
                type="article"
                isSponsored={article.sponsored}
              />

              <h1 className="text-5xl lg:text-6xl font-semibold text-text leading-[1.1] tracking-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-xl lg:text-2xl text-text/70 leading-relaxed max-w-3xl mx-auto">
                  {article.excerpt}
                </p>
              )}

              {article.sponsored && article.partner && (
                <div className="pt-4">
                  <SponsoredDisclosure
                    partnerName={article.partner.name}
                    partnerUrl={article.partner.website}
                  />
                </div>
              )}
            </div>

            {/* Hero Image */}
            {imageUrl && (
              <div className="aspect-[21/9] bg-text/5 rounded-sm overflow-hidden">
                <img
                  src={imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Article Content with Sidebar */}
      <Section spacing="lg">
        <Container size="layout">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <ArticleBody>
                <PortableText value={article.body} />
              </ArticleBody>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-8">
                {/* Article Info Card */}
                <div className="bg-background border border-text/10 rounded-sm p-6 space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-text/60">
                    Over dit artikel
                  </h3>
                  
                  <div className="space-y-3 text-sm text-text/70">
                    <div className="flex justify-between">
                      <span>Gepubliceerd</span>
                      <time className="text-text">
                        {new Date(article.publishedAt).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Leestijd</span>
                      <span className="text-text">{readingTime} min</span>
                    </div>

                    {article.category && (
                      <div className="flex justify-between">
                        <span>Categorie</span>
                        <span className="text-text">{article.category}</span>
                      </div>
                    )}
                  </div>

                  {article.tags && article.tags.length > 0 && (
                    <div className="pt-4 border-t border-text/10">
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <Link
                            key={tag}
                            href={`/tags/${encodeURIComponent(tag)}`}
                            className="text-xs px-3 py-1.5 bg-text/5 hover:bg-text/10 rounded-full text-text/70 hover:text-text transition-colors"
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Related Articles in Sidebar */}
                {relatedArticles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-text/60">
                      Meer lezen
                    </h3>
                    
                    <div className="space-y-6">
                      {relatedArticles.slice(0, 3).map((related) => (
                        <Link
                          key={related._id}
                          href={`/artikels/${related.slug}`}
                          className="group block"
                        >
                          <article className="space-y-3">
                            {related.featuredImage && (
                              <div className="aspect-[16/10] bg-background overflow-hidden rounded-sm">
                                <img
                                  src={urlForImage(related.featuredImage)
                                    .width(400)
                                    .height(250)
                                    .url()}
                                  alt={related.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            )}
                            
                            <div className="space-y-2">
                              {related.category && (
                                <span className="text-xs text-accent font-medium uppercase tracking-wide">
                                  {related.category}
                                </span>
                              )}
                              
                              <h4 className="text-base font-semibold text-text group-hover:text-accent transition-colors leading-snug line-clamp-2">
                                {related.title}
                              </h4>
                              
                              {related.readingTime && (
                                <p className="text-xs text-text/50">
                                  {related.readingTime} min lezen
                                </p>
                              )}
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Full-width Related Articles at Bottom */}
      {relatedArticles.length > 3 && (
        <Section spacing="md">
          <Container size="content">
            <RelatedArticles articles={relatedArticles.slice(3)} />
          </Container>
        </Section>
      )}
    </article>
  );
}
