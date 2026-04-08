/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

    if (!projectId || !dataset) return [];

    try {
      const query = encodeURIComponent(
        `*[_type == "redirect"]{ source, destination, permanent }`
      );
      const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`;
      const res = await fetch(url);
      const { result } = await res.json();

      if (!Array.isArray(result)) return [];

      return result
        .filter((r) => r.source && r.destination)
        .map((r) => ({
          source: r.source,
          destination: r.destination,
          permanent: r.permanent ?? true,
        }));
    } catch (e) {
      console.error("Failed to fetch redirects from Sanity:", e);
      return [];
    }
  },
};

export default nextConfig;
