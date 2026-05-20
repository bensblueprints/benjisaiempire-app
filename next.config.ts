import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = path.dirname(fileURLToPath(import.meta.url));

/** Coolify/Docker uses standalone; Netlify sets NETLIFY=true and uses @netlify/plugin-nextjs. */
const isNetlify = process.env.NETLIFY === "true";

const config: NextConfig = {
  // Avoid Windows/monorepo parent paths in the serverless bundle (breaks Lambda on Linux).
  ...(isNetlify ? { outputFileTracingRoot: appRoot } : { output: "standalone" }),
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
