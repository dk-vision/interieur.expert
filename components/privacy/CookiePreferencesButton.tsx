"use client";

import { COOKIE_PREFERENCES_EVENT } from "@/lib/site";

interface CookiePreferencesButtonProps {
  className?: string;
}

export default function CookiePreferencesButton({
  className = "",
}: CookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(COOKIE_PREFERENCES_EVENT))}
      className={className}
    >
      Cookie-instellingen
    </button>
  );
}