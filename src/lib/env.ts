/**
 * Centralised env loader.
 *
 * Throws on missing required keys at startup (clear error message).
 * When USE_AIRWALLEX=true, Stripe keys are optional (legacy webhooks may still need them).
 */

import { useAirwallex } from "@/lib/payments";

function required(name: string, value: string | undefined): string {
  if (!value || value.length === 0) {
    throw new Error(
      `[env] Missing required environment variable: ${name}. ` +
        `Set it in .env (or your hosting provider's env panel) before booting the app.`,
    );
  }
  return value;
}

function optional(value: string | undefined): string {
  return value ?? "";
}

const airwallexActive = useAirwallex();

export const env = {
  USE_AIRWALLEX: airwallexActive,

  STRIPE_SECRET_KEY: airwallexActive
    ? optional(process.env.STRIPE_SECRET_KEY)
    : required("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY),
  STRIPE_PUBLISHABLE_KEY: airwallexActive
    ? optional(process.env.STRIPE_PUBLISHABLE_KEY)
    : required("STRIPE_PUBLISHABLE_KEY", process.env.STRIPE_PUBLISHABLE_KEY),
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  STRIPE_PRICE_INSIDER: process.env.STRIPE_PRICE_INSIDER ?? "",
  STRIPE_PRICE_WHOLESALE: process.env.STRIPE_PRICE_WHOLESALE ?? "",

  AIRWALLEX_CLIENT_ID: airwallexActive
    ? required("AIRWALLEX_CLIENT_ID", process.env.AIRWALLEX_CLIENT_ID)
    : optional(process.env.AIRWALLEX_CLIENT_ID),
  AIRWALLEX_API_KEY: airwallexActive
    ? required("AIRWALLEX_API_KEY", process.env.AIRWALLEX_API_KEY)
    : optional(process.env.AIRWALLEX_API_KEY),
  AIRWALLEX_WEBHOOK_SECRET: process.env.AIRWALLEX_WEBHOOK_SECRET ?? "",
  AIRWALLEX_LEGAL_ENTITY_ID: process.env.AIRWALLEX_LEGAL_ENTITY_ID ?? "",
  AIRWALLEX_PAYMENT_ACCOUNT_ID: process.env.AIRWALLEX_PAYMENT_ACCOUNT_ID ?? "",
  AIRWALLEX_PRICE_INSIDER: process.env.AIRWALLEX_PRICE_INSIDER ?? "",
  AIRWALLEX_PRICE_WHOLESALE: process.env.AIRWALLEX_PRICE_WHOLESALE ?? "",
  AIRWALLEX_SANDBOX: process.env.AIRWALLEX_SANDBOX === "true",

  RESEND_API_KEY: required("RESEND_API_KEY", process.env.RESEND_API_KEY),
  EMAIL_FROM: required("EMAIL_FROM", process.env.EMAIL_FROM),
  ADMIN_EMAILS: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://benjisaiempire.com",
} as const;

export type Env = typeof env;
