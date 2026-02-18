import { ReactNode } from "react";

interface ArticleBodyProps {
  children: ReactNode;
}

export default function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <div
      className="prose max-w-none 
        prose-headings:font-semibold prose-headings:text-text
        prose-h2:text-h4 prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-h5 prose-h3:mt-10 prose-h3:mb-5
        prose-h4:text-h6
        prose-p:text-body prose-p:text-text prose-p:mb-6
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-blockquote:font-[family-name:var(--font-family-heading)] prose-blockquote:border-l-0 prose-blockquote:pl-24 prose-blockquote:pr-12 prose-blockquote:not-italic prose-blockquote:text-text prose-blockquote:text-h4 prose-blockquote:font-semibold prose-blockquote:my-16 prose-blockquote:py-0 prose-blockquote:relative prose-blockquote:before:content-['❝'] prose-blockquote:before:absolute prose-blockquote:before:left-0 prose-blockquote:before:top-0 prose-blockquote:before:text-7xl prose-blockquote:before:text-accent prose-blockquote:before:leading-none prose-blockquote:before:font-[family-name:var(--font-family-heading)]
        prose-strong:text-text prose-strong:font-semibold
        prose-ul:text-text prose-ol:text-text
        prose-li:text-body prose-li:text-text
        prose-img:rounded-sm prose-img:my-12"
    >
      {children}
    </div>
  );
}
