import { PortableText as BasePortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity/image";
import { ReactNode } from "react";

interface PortableTextProps {
  value: PortableTextBlock[];
}

interface BaseComponentProps {
  children?: ReactNode;
}

interface LinkValueProps {
  href?: string;
}

interface InternalArticleLinkValueProps {
  reference?: {
    slug?: {
      current?: string;
    };
    category?: string;
  };
}

interface ImageValueProps {
  asset?: unknown;
  alt?: string;
  caption?: string;
}

interface CalloutValueProps {
  type: "info" | "warning" | "tip" | "danger";
  title?: string;
  content: PortableTextBlock[];
}

interface PullQuoteValueProps {
  text: string;
  author?: string;
  role?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }: BaseComponentProps) => <p className="mb-6 text-body">{children}</p>,
    h2: ({ children }: BaseComponentProps) => (
      <h2 className="text-h4 font-semibold mt-12 mb-6 text-text">
        {children}
      </h2>
    ),
    h3: ({ children }: BaseComponentProps) => (
      <h3 className="text-h5 font-semibold mt-8 mb-4 text-text">{children}</h3>
    ),
    blockquote: ({ children }: BaseComponentProps) => (
      <blockquote className="border-l-4 border-accent pl-6 my-8 italic text-body-lg text-text/80">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: BaseComponentProps) => (
      <ul className="mb-6 space-y-2 list-disc list-inside marker:text-accent/60 text-body">{children}</ul>
    ),
    number: ({ children }: BaseComponentProps) => (
      <ol className="mb-6 space-y-2 list-decimal list-inside marker:text-accent/60 text-body">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: BaseComponentProps) => {
      // Check if content is short (single line, no complex children)
      const textContent = typeof children === 'string' ? children : '';
      const isShort = textContent.length < 80;
      
      return (
        <li className={isShort ? "text-body text-text/90" : "text-body text-text/90 my-2"}>
          {children}
        </li>
      );
    },
    number: ({ children }: BaseComponentProps) => {
      const textContent = typeof children === 'string' ? children : '';
      const isShort = textContent.length < 80;
      
      return (
        <li className={isShort ? "text-body text-text/90" : "text-body text-text/90 my-2"}>
          {children}
        </li>
      );
    },
  },
  marks: {
    strong: ({ children }: BaseComponentProps) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: BaseComponentProps) => <em className="italic">{children}</em>,
    highlight: ({ children }: BaseComponentProps) => (
      <mark className="bg-accent/20 text-text px-1 rounded">{children}</mark>
    ),
    link: ({ children, value }: BaseComponentProps & { value?: LinkValueProps }) => {
      const href = value?.href || "";
      const isExternal = href.startsWith("http");
      return (
        <a
          href={href}
          className="text-accent font-medium border-b border-accent hover:text-accent/70 hover:border-accent/70 transition-colors"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
    internalArticleLink: ({ children, value }: BaseComponentProps & { value?: InternalArticleLinkValueProps }) => {
      const slug = value?.reference?.slug?.current;
      const category = value?.reference?.category;
      if (!slug) return <span>{children}</span>;
      
      return (
        <Link 
          href={`/${category || 'artikels'}/${slug}`}
          className="text-accent font-medium border-b border-accent hover:text-accent/70 hover:border-accent/70 transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }: { value?: ImageValueProps }) => {
      if (!value?.asset) return null;
      
      const imageUrl = urlForImage(value).width(1200).height(800).url();
      
      return (
        <div className="my-8 -mx-4 md:mx-0">
          <div className="relative aspect-[3/2] rounded-sm overflow-hidden">
            <Image
              src={imageUrl}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
          {value.caption && (
            <p className="text-meta text-text/60 mt-3 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    callout: ({ value }: { value?: CalloutValueProps }) => {
      if (!value) return null;
      
      const styles = {
        info: {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-800",
          icon: "💡",
          title: "Info",
        },
        warning: {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-200 dark:border-yellow-800",
          icon: "⚠️",
          title: "Let op",
        },
        tip: {
          bg: "bg-green-50 dark:bg-green-950/20",
          border: "border-green-200 dark:border-green-800",
          icon: "✅",
          title: "Tip",
        },
        danger: {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          icon: "❌",
          title: "Belangrijk",
        },
      };
      
      const style = styles[value.type] || styles.info;
      
      return (
        <div className={`my-8 p-6 rounded-lg border-2 ${style.bg} ${style.border}`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{style.icon}</span>
            <div className="flex-1">
              {value.title && (
                <h4 className="font-semibold text-h6 mb-2 text-text">
                  {value.title}
                </h4>
              )}
              <div className="text-text/90">
                <BasePortableText value={value.content} components={components} />
              </div>
            </div>
          </div>
        </div>
      );
    },
    pullQuote: ({ value }: { value?: PullQuoteValueProps }) => {
      if (!value) return null;
      
      return (
        <div className="my-12 py-8 px-6 md:px-12 border-l-4 border-accent bg-background/50">
          <blockquote className="text-h5 md:text-h4 font-serif italic text-text">
            "{value.text}"
          </blockquote>
          {(value.author || value.role) && (
            <div className="mt-4 text-text/70">
              {value.author && (
                <p className="font-semibold">{value.author}</p>
              )}
              {value.role && (
                <p className="text-meta">{value.role}</p>
              )}
            </div>
          )}
        </div>
      );
    },
  },
};

export function PortableText({ value }: PortableTextProps) {
  return (
    <BasePortableText value={value} components={components} />
  );
}

export default PortableText;
