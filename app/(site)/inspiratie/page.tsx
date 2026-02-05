import React from "next";
import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Inspiratie | Interieur.Expert",
  description: "Ontdek stijlen, kleuren en materialen die je interieur naar een hoger niveau tillen. Van tijdloze klassiekers tot verfrissende nieuwe trends.",
};

export const revalidate = 3600;

const inspiratieQuery = groq`
  *[_type == "article" && category == "inspiratie"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    sponsored,
    "partner": partner->{_id, name, website},
    featuredImage,
    readingTime
  }
`;

export default async function InspiratiePage() {
  const articles = await sanityFetch<Article[]>({
    query: inspiratieQuery,
  });

  return (
    <div>
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              Inspiratie
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              Ontdek stijlen, kleuren en materialen die je interieur naar een hoger
              niveau tillen. Van tijdloze klassiekers tot verfrissende nieuwe trends.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                {/* First article: Wide card spanning 2 cols with image overlay */}
                {articles[0] && (
                  <ContentCard
                    key={articles[0]._id}
                    title={articles[0].title}
                    excerpt={articles[0].excerpt}
                    href={`/artikels/${articles[0].slug}`}
                    type="article"
                    category={articles[0].category}
                    publishedAt={new Date(articles[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={articles[0].readingTime}
                    tags={articles[0].tags}
                    isSponsored={articles[0].sponsored || false}
                    partnerName={articles[0].partner?.name}
                    partnerUrl={articles[0].partner?.website}
                    image={articles[0].featuredImage ? urlForImage(articles[0].featuredImage).width(1200).height(600).url() : undefined}
                    size="wide"
                  />
                )}
                
                {/* Articles 2-4: Regular cards */}
                {articles.slice(1, 4).map((article) => (
                  <ContentCard
                    key={article._id}
                    title={article.title}
                    excerpt={article.excerpt}
                    href={`/artikels/${article.slug}`}
                    type="article"
                    category={article.category}
                    publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={article.readingTime}
                    tags={article.tags}
                    isSponsored={article.sponsored || false}
                    partnerName={article.partner?.name}
                    partnerUrl={article.partner?.website}
                    image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(600).url() : undefined}
                  />
                ))}
                
                {/* Remaining articles: Regular cards */}
                {articles.slice(4).map((article) => (
                  <ContentCard
                    key={article._id}
                    title={article.title}
                    excerpt={article.excerpt}
                    href={`/artikels/${article.slug}`}
                    type="article"
                    category={article.category}
                    publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={article.readingTime}
                    tags={article.tags}
                    isSponsored={article.sponsored || false}
                    partnerName={article.partner?.name}
                    partnerUrl={article.partner?.website}
                    image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(600).url() : undefined}
                  />
                ))}
              </div>
            </div>
            
            <aside className="lg:w-80 space-y-8">
              <AdSlot position="listing-sidebar" />
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
