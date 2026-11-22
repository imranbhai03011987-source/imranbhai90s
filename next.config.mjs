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
          source: "/posts/full-house-cast-then-and-now-untold-secrets-olsen-twins",
          destination: "/posts/full-house-cast-then-and-now",
          permanent: true,
        },
        {
          source: "/posts/home-improvement-cast-then-and-now",
          destination: "/posts/home-improvement-cast-then-and-now-where-are-they-in-2026",
          permanent: true,
        },
        {
          source: "/posts/saved-by-the-bell-dustin-diamond-tragedy-backstage-secrets",
          destination: "/posts/saved-by-the-bell-cast-then-and-now",
          permanent: true,
        },
        {
          source: "/posts/full-house-secrets-heartbreaking-tragedies-cast-today",
          destination: "/posts/full-house-cast-then-and-now",
          permanent: true,
        },
      ];
    },
    async rewrites() {
      return [
        {
          source: "/:slug(full-house-cast-then-and-now|saved-by-the-bell-cast-then-and-now|family-matters-cast-then-and-now|boy-meets-world-cast-then-and-now|fresh-prince-cast-then-and-now|friends-cast-then-and-now|top-20-90s-sitcoms|15-forgotten-90s-tv-shows|best-90s-cartoon-themes|why-90s-tv-was-better)",
          destination: "/posts/:slug",
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
