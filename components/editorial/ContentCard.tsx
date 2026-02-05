"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import MetaRow from "./MetaRow";
import Pill from "@/components/ui/Pill";
import Image from "next/image";

interface ContentCardProps {
  title: string;
  excerpt: string;
  href: string;
  type: "article" | "video" | "dossier";
  category?: string;
  tags?: string[];
  publishedAt: string;
  readingTime?: number;
  isSponsored?: boolean;
  partnerName?: string;
  partnerUrl?: string;
  sponsors?: Array<{ name: string; slug: string }>; // For dossiers with multiple sponsors
  size?: "normal" | "large" | "wide";
  image?: string;
}

export default function ContentCard({
  title,
  excerpt,
  href,
  type,
  category,
  tags,
  publishedAt,
  readingTime,
  isSponsored = false,
  partnerName,
  partnerUrl,
  sponsors,
  size = "normal",
  image,
}: ContentCardProps) {
  const router = useRouter();
  const isLarge = size === "large";
  const isWide = size === "wide";
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a link inside the card
    if ((e.target as HTMLElement).closest('a[href]')) {
      return;
    }
    router.push(href);
  };
  
  // Wide variant: 2 columns, same height, content overlay on image
  if (isWide) {
    return (
      <div
        onClick={handleCardClick}
        className={`group block md:col-span-2 cursor-pointer ${isSponsored ? "border-t-2 border-brand/40 pt-4" : ""}`}
      >
        <div className="aspect-[4/3] bg-text/5 rounded-sm overflow-hidden relative">
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          )}
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-0 left-0 p-4">
              <Pill variant="subtle" size="md">
                {category}
              </Pill>
            </div>
          )}
          
          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-3 text-white">
            <MetaRow
              publishedAt={publishedAt}
              readingTime={readingTime}
              type={type}
              isSponsored={isSponsored}
            />
            
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight transition-opacity group-hover:opacity-90">
              {title}
            </h3>
            
            <p className="text-white/90 leading-relaxed line-clamp-2 md:line-clamp-3">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div
      onClick={handleCardClick}
      className={`group block hover:opacity-75 transition-opacity cursor-pointer ${isLarge ? "md:col-span-2" : ""} ${isSponsored ? "border-t-2 border-brand/40 pt-4" : ""}`}
    >
      <div className={`${isLarge ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "space-y-4"}`}>
      {/* Image */}
      <div className={`${isLarge ? "aspect-[16/9] md:aspect-square" : "aspect-[4/3]"} bg-text/5 rounded-sm overflow-hidden relative`}>
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          )}
          {category && (
            <div className={`absolute top-0 left-0 ${isLarge ? "p-6" : "p-4"}`}>
              <Pill variant="subtle" size="md">
                {category}
              </Pill>
            </div>
          )}
        </div>

        {/* Content */}
        <div className={`space-y-3 ${isLarge ? "flex flex-col justify-center" : ""}`}>
          <MetaRow
            publishedAt={publishedAt}
            readingTime={readingTime}
            type={type}
            isSponsored={isSponsored}
          />

          <h3 className={`${isLarge ? "text-2xl lg:text-3xl" : "text-xl"} font-semibold text-text leading-tight group-hover:text-accent transition-colors`}>
            {title}
          </h3>

          <p className={`text-text/70 leading-relaxed ${isLarge ? "text-lg line-clamp-4" : "line-clamp-3"}`}>{excerpt}</p>

          {sponsors && sponsors.length > 0 && type === "dossier" && (
            <p className="text-sm text-text/60">
              Mogelijk gemaakt door{" "}
              {sponsors.map((sponsor, idx) => (
                <span key={sponsor.slug}>
                  <Link 
                    href={`/partners/${sponsor.slug}`}
                    className="font-medium text-[#dc2626] hover:underline"
                  >
                    {sponsor.name}
                  </Link>
                  {idx < sponsors.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}

          {isSponsored && partnerName && (
            <p className="text-sm text-text/60">
              In samenwerking met{" "}
              <span className="font-medium text-brand">
                {partnerName}
              </span>
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                  className="hover:scale-105 transition-transform"
                >
                  <Pill variant="subtle" size="sm">
                    {tag}
                  </Pill>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
