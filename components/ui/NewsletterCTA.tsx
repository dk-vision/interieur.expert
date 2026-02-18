"use client";

import { Mail } from "lucide-react";

export default function NewsletterCTA() {
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
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="je@email.nl"
            className="flex-1 px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
          />
          <button
            type="button"
            className="px-6 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent hover:text-text transition-colors"
          >
            Inschrijven
          </button>
        </div>
        <p className="text-meta text-text/50">
          Je kunt je altijd weer uitschrijven. Privacy gegarandeerd.
        </p>
      </div>
    </div>
  );
}
