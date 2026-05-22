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

export const WISPR_FLOW_URL = "https://wisprflow.com";

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
  {
    slug: "wispr-flow",
    title: "Wispr Flow — Unlimited Voice Dictation",
    description:
      "Talk in any app — email, Slack, Cursor, docs — and get polished text instantly. Unlimited voice dictation on Mac, Windows, iPhone, and Android. $49 for life (one-time).",
    url: WISPR_FLOW_URL,
    buttonLabel: "Get Wispr Flow — $49 lifetime →",
    badge: "Voice dictation",
    tier: "INSIDER",
    sortOrder: 1,
  },
];
