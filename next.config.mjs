/** @type {import('next').NextConfig} */
const config = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
    async redirects() {
      return [
        { source: "/about-us", destination: "/about", permanent: true },
        { source: "/contact-us", destination: "/contact", permanent: true },
        {
          source: "/posts/home-improvement-why-wilsons-face-was-never-shown-real-reason",
          destination: "/posts/why-wilsons-face-was-never-shown-home-improvement",
          permanent: true,
        },
        {
          source: "/posts/now-and-then-beverly-hills-90210-cast",
          destination: "/posts/beverly-hills-90210-cast-then-and-now-where-are-they-today",
          permanent: true,
        },
        {
          source: "/posts/beverly-hills-90210-cast-then-and-now",
          destination: "/posts/beverly-hills-90210-cast-then-and-now-where-are-they-today",
          permanent: true,
        },
        {
          source: "/posts/full-house-cast-then-and-now",
          destination: "/posts/full-house-cast-then-and-now-untold-secrets-olsen-twins",
          permanent: true,
        },
        {
          source: "/posts/home-improvement-cast-then-and-now",
          destination: "/posts/home-improvement-cast-then-and-now-where-are-they-in-2026",
          permanent: true,
        },
      ];
    },
  images: { remotePatterns: [{ protocol: "https", hostname: "**" }] },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default config;
