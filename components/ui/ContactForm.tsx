"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Status = "idle" | "loading" | "error";

export default function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        setErrorMsg(json.error ?? "Verzenden mislukt. Probeer het opnieuw.");
        setStatus("error");
        return;
      }

      router.push("/contact/bedankt");
    } catch {
      setErrorMsg("Er is een fout opgetreden. Probeer het opnieuw.");
      setStatus("error");
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-meta font-medium text-text">
            Naam *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
            placeholder="Je naam"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-meta font-medium text-text">
            E-mail *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
            placeholder="je@email.nl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="block text-meta font-medium text-text">
          Onderwerp *
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent"
          placeholder="Waar gaat je bericht over?"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-meta font-medium text-text">
          Bericht *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-3 rounded-sm border border-text/20 bg-background text-text placeholder:text-text/40 focus:outline-none focus:border-accent resize-none"
          placeholder="Vertel ons meer..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-8 py-3 bg-text text-background font-medium rounded-sm hover:bg-accent transition-colors disabled:opacity-50"
        >
          {status === "loading" ? "Versturen..." : "Verstuur bericht"}
        </button>
        <p className="text-meta text-text/60">
          We reageren meestal binnen 2 werkdagen
        </p>
      </div>
    </form>
  );
}
