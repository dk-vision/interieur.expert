import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import AdSlot from "@/components/ads/AdSlot";
import StickyContainer from "@/components/ui/StickyContainer";
import VideoThumbnail from "@/components/video/VideoThumbnail";
import { sanityFetch } from "@/lib/sanity/client";
import { groq } from "next-sanity";
import { urlForImage } from "@/lib/sanity/image";
import type { Video } from "@/lib/content/types";

export const metadata = {
  title: "Video's | Interieur.Expert",
  description: "Inspirerende interieur tours, praktische DIY-projecten en advies van experts.",
};

export const revalidate = 3600;

const videosQuery = groq`
  *[_type == "video"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    "slug": slug.current,
    excerpt,
    category,
    publishedAt,
    thumbnail,
    "previewVideoUrl": previewVideo.asset->url,
    duration,
    sponsored,
    "partner": partner->{
      _id,
      name,
      "slug": slug.current,
      website
    }
  }
`;

export default async function VideoPage() {
  const videos = await sanityFetch<Video[]>({
    query: videosQuery,
  });

  return (
    <div>
      {/* Header */}
      <Section spacing="lg">
        <Container>
          <div className="space-y-4">
            <h1 className="text-h2 lg:text-h1 font-semibold text-text">
              Video&apos;s
            </h1>
            <p className="text-body-lg text-text/70 max-w-2xl">
              Inspirerende interieur tours, praktische DIY-projecten en advies van experts.
            </p>
          </div>
        </Container>
      </Section>

      {/* Video Grid - YouTube-style layout */}
      <Section spacing="sm" className="!pt-0">
        <Container>
          {videos.length === 0 ? (
            <div className="text-center py-12">
                <p className="text-body-lg text-text/70">
                Er zijn nog geen video&apos;s gepubliceerd.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Main content */}
                <div className="flex-1 space-y-8">
                  <VideoThumbnail
                    href={`/video/${videos[0].slug}`}
                    title={videos[0].title}
                    thumbnail={urlForImage(videos[0].thumbnail).width(1200).height(675).url()}
                    previewVideo={(videos[0] as any).previewVideoUrl}
                    duration={videos[0].duration}
                    publishedAt={new Date(videos[0].publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                    excerpt={videos[0].excerpt}
                    isSponsored={videos[0].sponsored || false}
                    partnerName={(videos[0] as any).partner?.name}
                    size="featured"
                  />

                  {videos.length > 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                      {videos.slice(1).map((video) => (
                        <VideoThumbnail
                          key={video._id}
                          href={`/video/${video.slug}`}
                          title={video.title}
                          thumbnail={urlForImage(video.thumbnail).width(640).height(360).url()}
                          previewVideo={(video as any).previewVideoUrl}
                          duration={video.duration}
                          publishedAt={new Date(video.publishedAt).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}
                          isSponsored={video.sponsored || false}
                          partnerName={(video as any).partner?.name}
                          size="grid"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="lg:w-80 space-y-8">
                  <StickyContainer offset={100}>
                    <AdSlot position="listing-sidebar" />
                  </StickyContainer>
                </aside>
              </div>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
