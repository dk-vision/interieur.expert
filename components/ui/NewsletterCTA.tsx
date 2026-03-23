"use client";

import { useState } from "react";

function MailIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
  );
}

function CheckCircleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
  );
}

function AlertCircleIcon({ size = 24 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
  );
}

function SpinnerIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
  );
}

type Status = "idle" | "loading" | "success" | "already" | "error";

interface NewsletterCTAProps {
  variant?: "card" | "inline";
  title?: string;
  description?: string;
}

export default function NewsletterCTA({
  variant = "card",
  title = "Wekelijkse interieurinspiratie in je inbox",
  description = "Ontvang elke week de beste artikelen, tips en trends. Geen spam, altijd relevante content.",
}: NewsletterCTAProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const messageId = "newsletter-status";
  const isInline = variant === "inline";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? "Inschrijving mislukt. Probeer het opnieuw.");
        setStatus("error");
        return;
      }

      setStatus(data.alreadySubscribed ? "already" : "success");
      setEmail("");
    } catch {
      setErrorMsg("Verbindingsfout. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  return (
    <div className={isInline ? "max-w-md mx-auto" : "bg-text/5 border border-text/10 rounded-sm p-8 lg:p-12"}>
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {!isInline && (
          <div className="flex justify-center">
            <MailIcon size={32} className="text-accent" />
          </div>
        )}
        {title ? (
          <h3 className="text-h5 font-semibold text-text">{title}</h3>
        ) : null}
        {description ? (
          <p className="text-text/70 leading-relaxed">{description}</p>
        ) : null}

        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-sm px-4 py-3" role="status" id={messageId}>
            <CheckCircleIcon size={18} />
            <span className="font-medium">Gelukt! Je staat nu ingeschreven.</span>
          </div>
        )}

        {status === "already" && (
          <div className="flex items-center justify-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-sm px-4 py-3" role="status" id={messageId}>
            <CheckCircleIcon size={18} />
            <span className="font-medium">Je was al ingeschreven — welkom terug!</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3" role="alert" id={messageId}>
            <AlertCircleIcon size={18} />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {status !== "success" && status !== "already" && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            aria-busy={status === "loading"}
            noValidate
            suppressHydrationWarning
          >
            <label htmlFor="newsletter-email" className="sr-only">
              E-mailadres
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je@email.nl"
              required
              autoComplete="email"
              inputMode="email"
              disabled={status === "loading"}
              aria-describedby={status !== "idle" ? messageId : undefined}
              aria-invalid={status === "error" ? true : undefined}
              className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <SpinnerIcon size={16} className="animate-spin" />
                  Moment…
                </>
              ) : (
                "Inschrijven"
              )}
            </button>
          </form>
        )}

        <p className="text-meta text-text/50">
          Je kunt je altijd weer uitschrijven. Privacy gegarandeerd.
        </p>
      </div>
    </div>
  );
}

