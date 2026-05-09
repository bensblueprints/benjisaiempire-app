import type { MetadataRoute } from "next";

const BASE = "https://benjisaiempire.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${BASE}/`, lastModified: now, priority: 1.0 },
    { url: `${BASE}/starter-kit/`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/insider/`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/founders/`, lastModified: now, priority: 0.9 },
    { url: `${BASE}/challenge/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/cold-call-30/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/partners/`, lastModified: now, priority: 0.7 },
    { url: `${BASE}/courses/cold-calling/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/courses/brand-builder/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/courses/marketing-engine/`, lastModified: now, priority: 0.8 },
    { url: `${BASE}/courses/empire-os/`, lastModified: now, priority: 0.8 },
  ];
}
