import Link from "next/link";

interface SponsoredDisclosureProps {
  partnerName: string;
  partnerUrl?: string;
}

export default function SponsoredDisclosure({
  partnerName,
  partnerUrl,
}: SponsoredDisclosureProps) {
  return (
    <div className="border-l-2 border-brand/30 pl-4 py-3 bg-brand/5">
      <p className="text-sm text-text/70 leading-relaxed">
        <span className="font-semibold text-brand">Gesponsord</span> — Deze
        content is mogelijk gemaakt door{" "}
        {partnerUrl ? (
          <Link
            href={partnerUrl}
            className="text-brand hover:underline font-medium"
            target="_blank"
            rel="noopener sponsored"
          >
            {partnerName}
          </Link>
        ) : (
          <span className="font-medium text-text">{partnerName}</span>
        )}
        . Redactionele onafhankelijkheid blijft gegarandeerd.
      </p>
    </div>
  );
}
