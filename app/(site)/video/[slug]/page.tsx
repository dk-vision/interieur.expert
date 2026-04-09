import Container from "@/components/layout/Container";
import ContentWrapper from "@/components/layout/ContentWrapper";
import Section from "@/components/layout/Section";
import MetaRow from "@/components/editorial/MetaRow";
import SponsoredDisclosure from "@/components/editorial/SponsoredDisclosure";
import AdSlot from "@/components/ads/AdSlot";
import { PortableText } from "@/components/editorial/PortableText";
import { sanityFetch } from "@/lib/sanity/client";
import { videoBySlugQuery, relatedVideosQuery, latestVideosQuery } from "@/lib/sanity/queries";
import { notFound } from "next/navigation";
import type { Video } from "@/lib/content/types";
import type { Metadata } from "next";
import { urlForImage } from "@/lib/sanity/image";
import { buildMetadata, buildVideoJsonLd, buildBreadcrumbJsonLd } from "@/lib/seo";
import Link from "next/link";
import { draftMode } from "next/headers";
import PreviewBanner from "@/components/ui/PreviewBanner";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();

  const video = await sanityFetch<Video>({
    query: videoBySlugQuery,
    params: { slug },
    preview: isPreview,
  });

  if (!video) {
    return {
      title: "Video niet gevonden",
    };
  }

  const image = video.thumbnail
    ? urlForImage(video.thumbnail).width(1200).height(630).url()
    : undefined;

  return buildMetadata({
    title: video.seoTitle || video.title,
    description: video.seoDescription || video.excerpt,
    path: `/video/${video.slug}`,
    image,
  });
}

export default async function VideoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { isEnabled: isPreview } = await draftMode();
  
  // Fetch video data
  const video = await sanityFetch<Video>({
    query: videoBySlugQuery,
    params: { slug },
    preview: isPreview,
  });

  if (!video) {
    notFound();
  }

  const isSponsored = video.sponsored;
  const partnerName = video.partner?.name;
  const partnerUrl = video.partner?.website;
  const sponsorDisclosure = video.partner?.sponsorDisclosure;
  const thumbnailUrl = video.thumbnail
    ? urlForImage(video.thumbnail).width(1280).height(720).url()
    : null;

  // Fetch related videos by tags, fallback to latest
  let relatedVideos = await sanityFetch<Video[]>({
    query: relatedVideosQuery,
    params: { currentId: video._id, tags: video.tags || [] },
  });
  if (!relatedVideos || relatedVideos.length === 0) {
    const latest = await sanityFetch<Video[]>({ query: latestVideosQuery });
    relatedVideos = (latest || []).filter((v) => v._id !== video._id).slice(0, 3);
  }

  const videoJsonLd = buildVideoJsonLd({
    title: video.seoTitle || video.title,
    description: video.seoDescription || video.excerpt,
    path: `/video/${video.slug}`,
    publishedAt: video.publishedAt,
    youtubeId: video.youtubeId,
    thumbnail: thumbnailUrl,
    duration: video.duration,
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Video", path: "/video" },
    { name: video.title, path: `/video/${video.slug}` },
  ]);

  return (
    <article>
      {isPreview && <PreviewBanner />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <Section spacing="lg" className="pb-8 md:pb-10">
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
              centered
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
      <Section spacing="sm" className="pt-4 md:pt-6">
        <Container size="layout">
          <div className="aspect-video bg-text/90 rounded-sm overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
              title={`Video: ${video.title}`}
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
                <div className="prose max-w-none prose-headings:font-semibold prose-headings:text-text prose-h2:text-h4 prose-h3:text-h5 prose-p:text-body prose-p:text-text prose-a:text-accent prose-a:font-medium prose-a:no-underline prose-a:border-b prose-a:border-accent prose-a:transition-colors hover:prose-a:text-accent/70 hover:prose-a:border-accent/70">
                  <PortableText value={video.transcript} fullImage />
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

      {/* Related Videos */}
      {relatedVideos.length > 0 && (
        <Section spacing="md">
          <Container size="layout">
            <h2 className="text-h4 font-semibold text-text mb-8 text-center">
              Meer video&apos;s
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedVideos.map((rv) => {
                const rvThumb = rv.thumbnail
                  ? urlForImage(rv.thumbnail).width(640).height(360).url()
                  : null;
                return (
                  <Link
                    key={rv._id}
                    href={`/video/${rv.slug}`}
                    className="group block"
                  >
                    <div className="aspect-video bg-text/10 rounded-sm overflow-hidden mb-3 relative">
                      {rvThumb && (
                        <img
                          src={rvThumb}
                          alt={rv.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-medium text-text group-hover:text-accent transition-colors line-clamp-2">
                      {rv.title}
                    </h3>
                    {rv.duration && (
                      <p className="text-sm text-text/50 mt-1">{rv.duration}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          </Container>
        </Section>
      )}
    </article>
  );
}
