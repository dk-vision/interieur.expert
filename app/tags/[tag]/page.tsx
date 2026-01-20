import React from "react";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ContentCard from "@/components/editorial/ContentCard";
import AdSlot from "@/components/ads/AdSlot";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import type { Article } from "@/lib/content/types";
import { notFound } from "next/navigation";

const tagQuery = groq`
  *[_type == "article" && $tag in tags] | order(publishedAt desc) {
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

export async function generateStaticParams() {
  const tags = await sanityFetch<string[]>({ query: allTagsQuery });
  return tags.map((tag) => ({ tag }));
}

export default async function TagPage({
  params,
}: {
  params: { tag: string };
}) {
  const { tag } = params;
  const articles = await sanityFetch<Article[]>({
    query: tagQuery,
    params: { tag },
  });

  if (articles.length === 0) {
    notFound();
  }

  return (
    <div>
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-5xl font-semibold text-text leading-tight">
              #{tag}
            </h1>
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl">
              {articles.length} artikel{articles.length !== 1 ? "en" : ""} met deze tag
            </p>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <React.Fragment key={article._id}>
                <ContentCard content={article} />
                {(index + 1) % 6 === 0 && (
                  <div className="md:col-span-2 lg:col-span-3">
                    <AdSlot slot="content-feed" />
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
