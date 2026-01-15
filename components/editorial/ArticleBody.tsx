import { ReactNode } from "react";

interface ArticleBodyProps {
  children: ReactNode;
}

export default function ArticleBody({ children }: ArticleBodyProps) {
  return (
    <div
      className="prose prose-lg max-w-none 
        prose-headings:font-semibold prose-headings:text-text
        prose-p:text-text prose-p:leading-relaxed
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:pl-6 prose-blockquote:not-italic prose-blockquote:text-text/80
        prose-strong:text-text prose-strong:font-semibold
        prose-ul:text-text prose-ol:text-text
        prose-li:text-text prose-li:leading-relaxed
        prose-img:rounded-sm"
    >
      {children}
    </div>
  );
}
