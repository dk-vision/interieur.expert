"use client";

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "already" | "error";

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    <div className="bg-text/5 border border-text/10 rounded-sm p-8 lg:p-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <Mail size={32} className="text-accent" />
        </div>
        <h3 className="text-h5 font-semibold text-text">
          Wekelijkse interieurinspiratie in je inbox
        </h3>
        <p className="text-text/70 leading-relaxed">
          Ontvang elke week de beste artikelen, tips en trends. Geen spam, altijd relevante content.
        </p>

        {status === "success" && (
          <div className="flex items-center justify-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-sm px-4 py-3">
            <CheckCircle size={18} />
            <span className="font-medium">Gelukt! Je staat nu ingeschreven.</span>
          </div>
        )}

        {status === "already" && (
          <div className="flex items-center justify-center gap-2 text-blue-700 bg-blue-50 border border-blue-200 rounded-sm px-4 py-3">
            <CheckCircle size={18} />
            <span className="font-medium">Je was al ingeschreven — welkom terug!</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center justify-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-sm px-4 py-3">
            <AlertCircle size={18} />
            <span className="font-medium">{errorMsg}</span>
          </div>
        )}

        {status !== "success" && status !== "already" && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="je@email.nl"
              required
              disabled={status === "loading"}
              className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors disabled:opacity-60"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
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

