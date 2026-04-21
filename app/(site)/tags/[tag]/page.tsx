import React from "react";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import type { Article } from "@/lib/content/types";
import { notFound } from "next/navigation";
import { buildBreadcrumbJsonLd, buildCollectionPageJsonLd, buildMetadata } from "@/lib/seo";

const MIN_INDEXABLE_TAG_ARTICLES = 3;

const tagQuery = groq`
  *[_type == "article" && $tag in tags && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
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

const allTagsQuery = groq`
  array::unique(*[_type == "article"].tags[])
`;

const tagArticleCountQuery = groq`
  count(*[_type == "article" && $tag in tags && defined(publishedAt) && publishedAt <= now()])
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const articleCount = await sanityFetch<number>({
    query: tagArticleCountQuery,
    params: { tag },
  });
  const isIndexableTag = articleCount >= MIN_INDEXABLE_TAG_ARTICLES;

  return buildMetadata({
    title: `#${tag} — Artikelen`,
    description: `Alle artikelen over ${tag} op interieur.expert. Ontdek inspiratie, advies en trends.`,
    path: `/tags/${encodeURIComponent(tag)}`,
    ...(isIndexableTag
      ? {}
      : {
          robots: {
            index: false,
            follow: true,
          },
        }),
  });
}

export async function generateStaticParams() {
  const tags = await sanityFetch<string[]>({ query: allTagsQuery });
  const indexedTags = await Promise.all(
    tags
      .filter((tag): tag is string => typeof tag === "string" && tag.length > 0)
      .map(async (tag) => ({
        tag,
        articleCount: await sanityFetch<number>({
          query: tagArticleCountQuery,
          params: { tag },
        }),
      }))
  );

  return indexedTags
    .filter(({ articleCount }) => articleCount >= MIN_INDEXABLE_TAG_ARTICLES)
    .map(({ tag }) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag: encodedTag } = await params;
  const tag = decodeURIComponent(encodedTag);
  const articles = await sanityFetch<Article[]>({
    query: tagQuery,
    params: { tag },
  });

  if (articles.length === 0) {
    notFound();
  }

  const isIndexableTag = articles.length >= MIN_INDEXABLE_TAG_ARTICLES;
  const collectionJsonLd = buildCollectionPageJsonLd({
    title: `#${tag} — Artikelen`,
    description: `Alle artikelen over ${tag} op interieur.expert. Ontdek inspiratie, advies en trends.`,
    path: `/tags/${encodeURIComponent(tag)}`,
    publishedAt: articles[0]?.publishedAt,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: `#${tag}`, path: `/tags/${encodeURIComponent(tag)}` },
  ]);

  return (
    <div>
      {isIndexableTag && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              #{tag}
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl">
              Ontdek {articles.length} artikel{articles.length !== 1 ? "en" : ""} over {tag}. Van inspiratie tot praktische tips.
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <React.Fragment key={article._id}>
                <ContentCard
                  title={article.title}
                  excerpt={article.excerpt}
                  href={`/${article.category || 'artikels'}/${article.slug}`}
                  type="article"
                  category={article.category}
                  tags={article.tags}
                  publishedAt={article.publishedAt}
                  readingTime={article.readingTime}
                />
                {(index + 1) % 6 === 0 && (
                  <div className="md:col-span-2 lg:col-span-3">
                  <AdSlot position="homepage-card" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
