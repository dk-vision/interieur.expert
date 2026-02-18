"use client";

import { useRouter } from "next/navigation";
import MetaRow from "./MetaRow";
import Pill from "@/components/ui/Pill";
import Image from "next/image";

interface FeaturedCardProps {
  title: string;
  excerpt: string;
  href: string;
  type: "article" | "video" | "dossier";
  category?: string;
  publishedAt: string;
  readingTime?: number;
  isSponsored?: boolean;
  image?: string;
}

export default function FeaturedCard({
  title,
  excerpt,
  href,
  type,
  category,
  publishedAt,
  readingTime,
  isSponsored = false,
  image,
}: FeaturedCardProps) {
  const router = useRouter();
  
  return (
    <div
      onClick={() => router.push(href)}
      className="group block hover:opacity-90 transition-opacity cursor-pointer"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <div className="lg:col-span-7">
          <div className={`${type === "article" || type === "video" ? "aspect-video lg:aspect-[4/3]" : "aspect-[16/9] lg:aspect-square"} bg-text/5 rounded-sm overflow-hidden relative`}>
            {image && (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            )}
            {category && (
              <div className="absolute top-0 left-0 p-6">
                <Pill variant="subtle" size="md">
                  {category}
                </Pill>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:space-y-8">
          <MetaRow
            publishedAt={publishedAt}
            readingTime={readingTime}
            type={type}
            isSponsored={isSponsored}
          />

          <h2 className="text-h3 md:text-h2 lg:text-h2 font-semibold text-text group-hover:text-accent transition-colors">
            {title}
          </h2>

          <p className="text-body lg:text-body-lg text-text/70">{excerpt}</p>
        </div>
      </div>
    </div>
  );
}
