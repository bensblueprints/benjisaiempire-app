import type { Tier } from "@prisma/client";

/** External software / partner links shown in Portal → Software (also seeded to DB). */
export const GHL_BIG_LOOP_STRIPE_URL =
  "https://buy.stripe.com/3cI3cvgQ50vc0lO2u59Ve1Q";

export type PortalSoftwareEntry = {
  slug: string;
  title: string;
  description: string;
  url: string;
  buttonLabel: string;
  badge?: string;
  tier: Tier;
  sortOrder: number;
};

export const PORTAL_SOFTWARE_CATALOG: PortalSoftwareEntry[] = [
  {
    slug: "ghl-big-loop-flow",
    title: "GoHighLevel — Big Loop Flow",
    description:
      "Get your own GoHighLevel sub-account for $1/month. Pipeline, contacts, dialer, and tasks — everything you need before you start the 100-calls-a-day sprint.",
    url: GHL_BIG_LOOP_STRIPE_URL,
    buttonLabel: "Get GHL for $1/mo →",
    badge: "Required for dialing",
    tier: "INSIDER",
    sortOrder: 0,
  },
];
