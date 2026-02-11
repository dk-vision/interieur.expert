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
  // Use custom disclosure if provided, otherwise use default template
  const disclosureText = disclosure || `Deze content is mogelijk gemaakt door ${partnerName}. Redactionele onafhankelijkheid blijft gegarandeerd.`;
  
  return (
    <div className="border-l-2 border-brand/30 pl-4 py-3 bg-brand/5">
      <p className="text-sm text-text/70 leading-relaxed">
        <span className="font-semibold text-brand">Gesponsord</span> —{" "}
        {disclosureText.includes(partnerName) ? (
          // If partner name is in disclosure, try to linkify it
          disclosureText.split(partnerName).map((part, i, arr) => (
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
          // If partner name is not in disclosure, just show the text
          disclosureText
        )}
      </p>
    </div>
  );
}
