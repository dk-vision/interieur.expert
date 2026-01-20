import React from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import FeaturedCard from "@/components/editorial/FeaturedCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";

const trendsQuery = groq`
  *[_type == "article" && category == "Trends"] | order(publishedAt desc) {
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

export default async function TrendsPage() {
  const articles = await sanityFetch<Article[]>({
    query: trendsQuery,
  });

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <div>
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
                Trends
              </h1>
              <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
                De laatste ontwikkelingen in interieurdesign. We volgen trends kritisch:
                wat is écht vernieuwend en wat verdwijnt weer snel?
              </p>
            </div>

            {/* Featured Trend */}
            {featuredArticle && (
              <FeaturedCard
                title={featuredArticle.title}
                excerpt={featuredArticle.excerpt}
                href={`/artikels/${featuredArticle.slug}`}
                type="article"
                category={featuredArticle.category}
                publishedAt={new Date(featuredArticle.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                readingTime={featuredArticle.readingTime}
                isSponsored={featuredArticle.sponsored || false}
                image={featuredArticle.featuredImage ? urlForImage(featuredArticle.featuredImage).width(1200).height(600).url() : undefined}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Current Trends Grid */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-12">
            <h2 className="text-3xl font-semibold text-text">Actuele trends</h2>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {otherArticles.map((article) => (
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
              
              {/* Sidebar */}
              <aside className="lg:w-80 space-y-8">
                <AdSlot position="sidebar" />
              </aside>
            </div>
          </div>
        </Container>
      </Section>

      {/* Trend Watch */}
      <Section spacing="lg" background="accent">
        <Container size="content">
          <div className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold text-text">Trend Watch</h2>
            <p className="text-lg text-text/70 leading-relaxed">
              Elke maand analyseren we opkomende trends. Schrijf je in voor onze
              nieuwsbrief en blijf op de hoogte van de laatste ontwikkelingen.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="je@email.nl"
                className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors">
                Inschrijven
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
