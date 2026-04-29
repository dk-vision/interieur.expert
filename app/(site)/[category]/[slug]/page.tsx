import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import ArticleBody from "@/components/editorial/ArticleBody";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import RelatedArticles from "@/components/editorial/RelatedArticles";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
import { sanityFetch } from "@/lib/sanity/client";
import { articleBySlugQuery, relatedArticlesQuery } from "@/lib/sanity/queries";
import { PortableText } from "@/components/editorial/PortableText";
import { urlForImage } from "@/lib/sanity/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { Article } from "@/lib/content/types";
import { calculateReadingTime } from "@/lib/utils/reading-time";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildMetadata, buildFAQJsonLd } from "@/lib/seo";
import { getDisplayAuthorName } from "@/lib/content/authors";
import { draftMode } from "next/headers";
import PreviewBanner from "@/components/ui/PreviewBanner";

interface PageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  const article = await sanityFetch<Article>({
    query: articleBySlugQuery,
    params: { slug },
    preview: isPreview,
  });

  if (!article || (article.category && article.category !== category)) {
    return {
      title: "Artikel niet gevonden",
    };
  }

  const image = article.featuredImage
    ? urlForImage(article.featuredImage).width(1200).height(630).url()
    : undefined;

  return buildMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/${article.category || category}/${article.slug}`,
    image,
    type: "article",
    publishedTime: article.publishedAt,
    section: article.category,
    tags: article.tags,
  });
}

export default async function ArtikelPage({ params }: PageProps) {
  const { category, slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  
  // Fetch article data
  const article = await sanityFetch<Article>({
    query: articleBySlugQuery,
    params: { slug },
    preview: isPreview,
  });

  if (!article) {
    notFound();
  }

  // Block access to unpublished/future articles unless in preview mode
  if (!isPreview) {
    if (!article.publishedAt || new Date(article.publishedAt) > new Date()) {
      notFound();
    }
    // Verify the category matches
    if (article.category && article.category !== category) {
      notFound();
    }
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
  const authorName = getDisplayAuthorName();
  const articleJsonLd = buildArticleJsonLd({
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    path: `/${article.category || category}/${article.slug}`,
    publishedAt: article.publishedAt,
    image: imageUrl,
    author: authorName,
    section: article.category,
    tags: article.tags,
    wordCount: article.body
      ? article.body
          .filter((b: any) => b._type === "block")
          .map((b: any) => b.children?.map((c: any) => c.text).join("") || "")
          .join(" ")
          .split(/\s+/).length
      : undefined,
  });

  const categoryLabel =
    article.category?.charAt(0).toUpperCase() + article.category?.slice(1);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: categoryLabel || category, path: `/${article.category || category}` },
    { name: article.title, path: `/${article.category || category}/${article.slug}` },
  ]);

  const dossierSiblingArticles = (article.dossier?.articles || []).filter(
    (item) =>
      item &&
      item._type === "article" &&
      item._id !== article._id &&
      item.publishedAt &&
      new Date(item.publishedAt) <= new Date()
  );
  const dossierMeta = article.dossier;

  return (
    <article>
      {isPreview && <PreviewBanner />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {article.faq && article.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQJsonLd(article.faq)) }}
        />
      )}
      {/* Hero Section */}
      <Section spacing="lg">
        <Container size="layout">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6 text-center">
              {article.dossier && (
                <div className="inline-flex items-center gap-2 text-sm text-text/60">
                  <Link href="/dossiers" className="hover:text-accent transition-colors">Dossiers</Link>
                  <span aria-hidden="true">/</span>
                  <Link
                    href={`/dossiers/${article.dossier.slug}`}
                    className="text-accent font-medium hover:text-accent/70 transition-colors"
                  >
                    {article.dossier.title}
                  </Link>
                </div>
              )}

              <MetaRow
                publishedAt={new Date(article.publishedAt).toLocaleDateString("nl-NL", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                readingTime={readingTime}
                type="article"
                isSponsored={article.sponsored}
                centered
                authorName={authorName}
              />

              <h1 className="text-h2 lg:text-h1 font-semibold text-text tracking-tight">
                {article.title}
              </h1>

              {article.excerpt && (
                <p className="text-body-lg text-text/70 max-w-3xl mx-auto">
                  {article.excerpt}
                </p>
              )}

              {article.sponsored && article.partner && (
                <div className="pt-4">
                  <SponsoredDisclosure
                    partnerName={article.partner.name}
                    partnerUrl={article.partner.website}
                    disclosure={article.partner.sponsorDisclosure}
                  />
                </div>
              )}
            </div>

            {/* Hero Image */}
            {imageUrl && (
              <div className="bg-text/5 rounded-sm overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={article.title}
                  width={1280}
                  height={720}
                  priority
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 960px"
                />
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Article Content with Sidebar */}
      <Section spacing="lg">
        <Container size="layout">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:gap-x-16 lg:items-start">
            {/* Main Content */}
            <div className="lg:col-span-8 mb-12 lg:mb-0">
              <ArticleBody>
                <PortableText value={article.body} fullImage />
              </ArticleBody>

              {/* Sponsor link at bottom of sponsored articles */}
              {article.sponsored && article.partner?.website && (
                <div className="mt-10 border-t border-text/10 pt-6 flex items-center gap-3">
                  <span className="text-sm text-text/60">Bezoek website:</span>
                  <a
                    href={article.partner.website}
                    target="_blank"
                    rel="noopener sponsored"
                    className="text-sm font-medium text-brand hover:underline"
                  >
                    {article.partner.name} →
                  </a>
                </div>
              )}
              
              {/* Inline Ad Banner - only show if not sponsored */}
              {!article.sponsored && (
                <div className="my-12">
                  <AdSlot position="article-inline" category={article.category} tags={article.tags} />
                </div>
              )}
            </div>

            {/* Sidebar Container */}
            <div className="lg:col-span-4">
              <div className="space-y-8 mb-8">
                {/* Article Info Card */}
                <div className="bg-background border border-text/10 rounded-sm p-6 space-y-4">
                    <h3 className="text-meta font-semibold uppercase tracking-wide text-text/60">
                      Over dit artikel
                    </h3>
                  
                  <div className="space-y-3 text-meta text-text/70">
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
                            className="text-meta px-3 py-1.5 bg-text/5 hover:bg-text/10 rounded-full text-text/70 hover:text-text transition-colors"
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
                    <h3 className="text-meta font-semibold uppercase tracking-wide text-text/60">
                      Meer lezen
                    </h3>
                    
                    <div className="space-y-6">
                      {relatedArticles.slice(0, 3).map((related) => (
                        <a
                          key={related._id}
                          href={`/${related.category}/${related.slug}`}
                          className="group block"
                        >
                          <div className="space-y-3">
                            {related.featuredImage ? (
                              <div className="aspect-video bg-background overflow-hidden rounded-sm">
                                <img
                                  src={urlForImage(related.featuredImage)
                                    .width(400)
                                    .height(225)
                                    .url()}
                                  alt={related.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : null}
                            
                            <div className="space-y-2">
                              {related.category && (
                                <span className="text-meta text-accent font-medium uppercase tracking-wide">
                                  {related.category}
                                </span>
                              )}
                              
                              <h4 className="text-body font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
                                {related.title}
                              </h4>
                              
                              {related.readingTime && (
                                <p className="text-meta text-text/50">
                                  {related.readingTime} min lezen
                                </p>
                              )}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ad Slot in Sidebar - below related articles - only show if not sponsored */}
              </div>
              {!article.sponsored && (
                <StickyContainer offset={100}>
                  <AdSlot position="article-sidebar" category={article.category} tags={article.tags} />
                </StickyContainer>
              )}
            </div>
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

      {/* FAQ Section */}
      {article.faq && article.faq.length > 0 && (
        <Section spacing="lg">
          <Container size="content">
            <div className="space-y-8">
              <h2 className="text-h4 font-semibold text-text">Veelgestelde vragen</h2>
              <dl className="space-y-6">
                {article.faq.map((item, i) => (
                  <div key={item._key || i} className="border-b border-text/10 pb-6 last:border-b-0">
                    <dt className="text-body font-semibold text-text mb-2">{item.question}</dt>
                    <dd className="text-body text-text/70 leading-relaxed">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Container>
        </Section>
      )}

      {/* Dossier Articles */}
      {dossierMeta && dossierSiblingArticles.length > 0 && (
        <Section spacing="lg" background="accent">
          <Container>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-h4 font-semibold text-text">
                  Meer in dossier: {dossierMeta.title}
                </h2>
                <Link
                  href={`/dossiers/${dossierMeta.slug}`}
                  className="text-sm text-accent hover:text-text transition-colors font-medium"
                >
                  Bekijk dossier →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {dossierSiblingArticles.map((sibling) => (
                    <Link
                      key={sibling._id}
                      href={`/${sibling.category || 'artikels'}/${sibling.slug}`}
                      className="group block space-y-3"
                    >
                      {sibling.featuredImage && (
                        <div className="aspect-video bg-background overflow-hidden rounded-sm">
                          <img
                            src={urlForImage(sibling.featuredImage).width(600).height(338).url()}
                            alt={sibling.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        {sibling.category && (
                          <span className="text-meta text-accent font-medium uppercase tracking-wide">
                            {sibling.category}
                          </span>
                        )}
                        <h3 className="text-body font-semibold text-text group-hover:text-accent transition-colors line-clamp-2">
                          {sibling.title}
                        </h3>
                        {sibling.readingTime && (
                          <p className="text-meta text-text/50">{sibling.readingTime} min lezen</p>
                        )}
                      </div>
                    </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </article>
  );
}
