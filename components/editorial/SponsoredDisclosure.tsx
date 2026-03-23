import Link from "next/link";

interface SponsoredDisclosureProps {
  partnerName: string;
  partnerUrl?: string;
  disclosure?: string;
}

export default function SponsoredDisclosure({
  partnerName,
  partnerUrl,
  disclosure,
}: SponsoredDisclosureProps) {
  // Replace generic "dit merk" placeholder with the actual partner name
  const rawDisclosure = disclosure
    ? disclosure.replace(/dit merk/gi, partnerName)
    : `Deze content is mogelijk gemaakt door ${partnerName}. Redactionele onafhankelijkheid blijft gegarandeerd.`;
  
  return (
    <div className="border-l-2 border-brand/30 pl-4 py-3 bg-brand/5">
      <p className="text-sm text-text/70 leading-relaxed">
        <span className="font-semibold text-brand">Gesponsord</span> —{" "}
        {rawDisclosure.includes(partnerName) ? (
          // If partner name is in disclosure, linkify it
          rawDisclosure.split(partnerName).map((part, i, arr) => (
            <span key={i}>
              {part}
              {i < arr.length - 1 && partnerUrl ? (
                <Link
                  href={partnerUrl}
                  className="text-brand hover:underline font-medium"
                  target="_blank"
                  rel="noopener sponsored"
                >
                  {partnerName}
                </Link>
              ) : i < arr.length - 1 ? (
                <span className="font-medium text-text">{partnerName}</span>
              ) : null}
            </span>
          ))
        ) : (
          rawDisclosure
        )}
      </p>
    </div>
  );
}
