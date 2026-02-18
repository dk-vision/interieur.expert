import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import AdSlot from "@/components/ads/AdSlot";
import { PortableText } from "@/components/editorial/PortableText";
import { sanityFetch } from "@/lib/sanity/client";
import { videoBySlugQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import type { Video } from "@/lib/content/types";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  const video = await sanityFetch<Video>({
    query: videoBySlugQuery,
    params: { slug },
  });

  if (!video) {
    return {
      title: "Video niet gevonden",
    };
  }

  return {
    title: `${video.title} | Interieur.Expert`,
    description: video.excerpt || video.seoDescription,
  };
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Fetch video data
  const video = await sanityFetch<Video>({
    query: videoBySlugQuery,
    params: { slug },
  });

  if (!video) {
    notFound();
  }

  const isSponsored = video.sponsored;
  const partnerName = video.partner?.name;
  const partnerUrl = video.partner?.website;
  const sponsorDisclosure = video.partner?.sponsorDisclosure;

  return (
    <article>
      {/* Header */}
      <Section spacing="lg">
        <Container size="content">
          <div className="space-y-6">
            <MetaRow
              publishedAt={new Date(video.publishedAt).toLocaleDateString("nl-NL", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              readingTime={video.duration}
              type="video"
              isSponsored={isSponsored}
            />

            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              {video.title}
            </h1>

            {video.excerpt && (
              <p className="text-body-lg text-text/70">
                {video.excerpt}
              </p>
            )}

            {isSponsored && partnerName && (
              <SponsoredDisclosure
                partnerName={partnerName}
                partnerUrl={partnerUrl}
                disclosure={sponsorDisclosure}
              />
            )}
          </div>
        </Container>
      </Section>

      {/* Video Embed */}
      <Section spacing="md">
        <Container size="layout">
          <div className="aspect-video bg-text/90 rounded-sm overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </Container>
      </Section>

      {/* Transcript / Description */}
      {video.transcript && video.transcript.length > 0 && (
        <Section spacing="md">
          <Container size="layout">
            <div className="max-w-content mx-auto">
              <ContentWrapper>
                <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text">
                  <PortableText value={video.transcript} />
                </div>
              </ContentWrapper>
            </div>

            {/* Inline Ad - only show if not sponsored */}
            {!isSponsored && (
              <div className="my-12">
                <AdSlot position="article-inline" category={video.category} tags={video.tags} />
              </div>
            )}
          </Container>
        </Section>
      )}
    </article>
  );
}
