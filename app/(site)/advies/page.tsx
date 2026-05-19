import React from "react";
import { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Article } from "@/lib/content/types";
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd, buildMetadata } from "@/lib/seo";
import Link from "next/link";
import Image from "next/image";

const PAGE_TITLE = "Advies";
const PAGE_DESCRIPTION =
  "Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke tips tot grondige uitleg over materialen en technieken.";

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: "/advies",
});

export const revalidate = 3600; // Revalidate every hour
const DOSSIER_PREVIEW_COUNT = 10;

const adviesQuery = groq`
  *[_type == "article" && category == "advies" && defined(publishedAt) && publishedAt <= now() && count(*[_type == "dossier" && references(^._id)]) == 0] | order(select(pinned == true => 0, 1), publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    tags,
    publishedAt,
    sponsored,
    pinned,
    pinnedAt,
    "partner": partner->{_id, name, website},
    featuredImage,
    readingTime
  }
`;

const dossierAdviesQuery = groq`
  *[_type == "article" && category == "advies" && defined(publishedAt) && publishedAt <= now() && count(*[_type == "dossier" && references(^._id)]) > 0] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    featuredImage,
    "dossierTitle": *[_type == "dossier" && references(^._id)][0].title,
    "dossierSlug": *[_type == "dossier" && references(^._id)][0].slug.current
  }
`;

type DossierAdviesArticle = {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  publishedAt: string;
  featuredImage?: unknown;
  dossierTitle?: string;
  dossierSlug?: string;
};

export default async function AdviesPage() {
  const articles = await sanityFetch<Article[]>({
    query: adviesQuery,
  });
  const dossierArticles = await sanityFetch<DossierAdviesArticle[]>({
    query: dossierAdviesQuery,
  });
  const dossierPreviewArticles = dossierArticles.slice(0, DOSSIER_PREVIEW_COUNT);
  const dossierRemainingArticles = dossierArticles.slice(DOSSIER_PREVIEW_COUNT);

  const collectionJsonLd = buildCollectionPageJsonLd({
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    path: "/advies",
    publishedAt: articles[0]?.publishedAt,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: PAGE_TITLE, path: "/advies" },
  ]);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Advies
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl">
              Praktisch en eerlijk advies voor het inrichten van je huis. Van budgetvriendelijke
              tips tot grondige uitleg over materialen en technieken.
            </p>
          </div>
        </Container>
      </Section>

      {/* Content Grid */}
      <Section spacing="sm" className="!pt-0">
        <Container>
          <div className="space-y-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content */}
              <div className="flex-1 space-y-12">
                {/* Featured article - wide format (kept within main column for consistent layout) */}
                {articles[0] && (
                  <ContentCard
                    key={articles[0]._id}
                    title={articles[0].title}
                    excerpt={articles[0].excerpt}
                    href={`/${articles[0].category || 'artikels'}/${articles[0].slug}`}
                    type="article"
                    category={articles[0].category}
                    publishedAt={new Date(articles[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    readingTime={articles[0].readingTime}
                    tags={articles[0].tags}
                    isSponsored={articles[0].sponsored || false}
                    partnerName={articles[0].partner?.name}
                    partnerUrl={articles[0].partner?.website}
                    image={articles[0].featuredImage ? urlForImage(articles[0].featuredImage).width(1200).height(675).url() : undefined}
                    size="wide"
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
                  {articles.slice(1).map((article) => (
                    <ContentCard
                      key={article._id}
                      title={article.title}
                      excerpt={article.excerpt}
                      href={`/${article.category || 'artikels'}/${article.slug}`}
                      type="article"
                      category={article.category}
                      publishedAt={new Date(article.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                      readingTime={article.readingTime}
                      tags={article.tags}
                      isSponsored={article.sponsored || false}
                      partnerName={article.partner?.name}
                      partnerUrl={article.partner?.website}
                      image={article.featuredImage ? urlForImage(article.featuredImage).width(800).height(450).url() : undefined}
                    />
                  ))}
                </div>
              </div>
            
              {/* Sidebar */}
              <aside className="lg:w-80 space-y-8">
                <StickyContainer offset={100}>
                  <AdSlot position="listing-sidebar" />
                </StickyContainer>
              </aside>
            </div>

            {dossierArticles.length > 0 && (
              <div className="border-t border-text/10 pt-10">
                <div className="space-y-4 mb-8">
                  <h2 className="text-h4 font-semibold text-text">Ook relevant uit dossiers</h2>
                  <p className="text-body text-text/70 max-w-3xl">
                    Zin om dieper te gaan? Deze geselecteerde artikelen uit onze dossiers geven extra context,
                    voorbeelden en praktische keuzes per ruimte.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {dossierPreviewArticles.map((article) => (
                    <Link
                      key={article._id}
                      href={`/${article.category || "artikels"}/${article.slug}`}
                      className="group flex items-start gap-4 rounded-sm border border-text/10 p-4 hover:border-accent/40 transition-colors"
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-sm bg-text/5 mt-0.5">
                        {article.featuredImage ? (
                          <Image
                            src={urlForImage(article.featuredImage).width(128).height(128).url()}
                            alt={article.title}
                            width={64}
                            height={64}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-text/10" />
                        )}
                      </div>
                      <div className="min-w-0 space-y-1.5">
                        <h3 className="text-body font-medium text-text group-hover:text-accent transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm text-text/60 line-clamp-1">
                          {new Date(article.publishedAt).toLocaleDateString("nl-NL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                          {article.dossierTitle ? ` · ${article.dossierTitle}` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                {dossierRemainingArticles.length > 0 && (
                  <p className="mt-6 text-sm text-text/60">
                    + {dossierRemainingArticles.length} extra dossierartikelen in het archief.
                  </p>
                )}

                <div className="mt-6">
                  <Link
                    href="/dossiers"
                    className="inline-flex items-center rounded-sm border border-text/15 px-4 py-2 text-sm font-medium text-text hover:border-accent/50 hover:text-accent transition-colors"
                  >
                    Bekijk alle dossiers
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Container>
      </Section>
    </div>
  );
}
