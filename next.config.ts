import type { NextConfig } from "next";

/** Coolify/Docker uses standalone; Netlify sets NETLIFY=true and uses @netlify/plugin-nextjs. */
const isNetlify = process.env.NETLIFY === "true";

const config: NextConfig = {
  ...(isNetlify ? {} : { output: "standalone" }),
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.youtube.com" },
      { protocol: "https", hostname: "**.vimeo.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  experimental: {
    serverActions: { bodySizeLimit: "10mb" },
  },
};

export default config;
