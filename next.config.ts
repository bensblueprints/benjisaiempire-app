import type { NextConfig } from "next";

/** Coolify/Docker uses standalone; Netlify sets NETLIFY=true and uses @netlify/plugin-nextjs. */
const isNetlify = process.env.NETLIFY === "true";

const config: NextConfig = {
  // outputFileTracingRoot breaks CI file-tracing (ENOENT *.nft.json) and skips public/ on Netlify.
  ...(isNetlify ? {} : { output: "standalone" }),
  eslint: { ignoreDuringBuilds: isNetlify },
  typescript: { ignoreBuildErrors: isNetlify },
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/starter-kit", destination: "/insider", permanent: false },
      { source: "/starter-kit/:path*", destination: "/insider", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.youtube.com" },
      { protocol: "https", hostname: "**.vimeo.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "25mb" },
  },
};

export default config;
