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
import type { Article } from "@/lib/content/types";

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
      {/* Hero */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <MetaRow
              publishedAt={new Date(article.publishedAt).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              readingTime={article.readingTime}
              type="article"
              isSponsored={article.sponsored}
            />

            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              {article.title}
            </h1>

            <p className="text-xl text-text/70 leading-relaxed">
              {article.excerpt}
            </p>

            {article.sponsored && article.partner && (
              <SponsoredDisclosure
                partnerName={article.partner.name}
                partnerUrl={article.partner.website}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      {imageUrl && (
        <Section spacing="sm">
          <Container size="layout">
            <div className="aspect-[16/9] bg-text/5 rounded-sm overflow-hidden">
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </Container>
        </Section>
      )}

      {/* Article Content */}
      <Section spacing="md">
        <Container size="content">
          <ContentWrapper>
            <ArticleBody>
              <PortableText value={article.body} />
            </ArticleBody>

            {/* Related Articles */}
            <RelatedArticles articles={relatedArticles} />
          </ContentWrapper>
        </Container>
      </Section>
    </article>
  );
}
