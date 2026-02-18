import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        // 1.25 modular scale (base = 1rem)
        meta: ["0.8rem", { lineHeight: "1.5" }],
        "body-sm": ["0.8rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-lg": ["1.25rem", { lineHeight: "1.6" }],

        h6: ["1.25rem", { lineHeight: "1.35" }],
        h5: ["1.563rem", { lineHeight: "1.3" }],
        h4: ["1.953rem", { lineHeight: "1.25" }],
        h3: ["2.441rem", { lineHeight: "1.2" }],
        h2: ["3.052rem", { lineHeight: "1.15" }],
        h1: ["3.815rem", { lineHeight: "1.1" }],
        display: ["4.768rem", { lineHeight: "1.05" }],
      },
      colors: {
        background: "#F6F4F1",
        text: "#2A2A2A",
        accent: "#0000ff",
        brand: "#ff6666",
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["system-ui", "-apple-system", "sans-serif"],
      },
      maxWidth: {
        content: "720px",
        layout: "1280px",
      },
    },
  },
  plugins: [typography],
};

export default config;
