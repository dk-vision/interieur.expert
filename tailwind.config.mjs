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
