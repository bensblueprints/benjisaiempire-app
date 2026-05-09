/**
 * Centralised env loader.
 *
 * Throws on missing required keys at startup (clear error message).
 * Optional keys default to "" so they can be lazily filled by setup-stripe.
 */

function required(name: string, value: string | undefined): string {
  if (!value || value.length === 0) {
    throw new Error(
      `[env] Missing required environment variable: ${name}. ` +
        `Set it in .env (or your hosting provider's env panel) before booting the app.`,
    );
  }
  return value;
}

export const env = {
  STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY", process.env.STRIPE_SECRET_KEY),
  STRIPE_PUBLISHABLE_KEY: required(
    "STRIPE_PUBLISHABLE_KEY",
    process.env.STRIPE_PUBLISHABLE_KEY,
  ),
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET ?? "",
  STRIPE_PRICE_INSIDER: process.env.STRIPE_PRICE_INSIDER ?? "",
  STRIPE_PRICE_WHOLESALE: process.env.STRIPE_PRICE_WHOLESALE ?? "",
  RESEND_API_KEY: required("RESEND_API_KEY", process.env.RESEND_API_KEY),
  EMAIL_FROM: required("EMAIL_FROM", process.env.EMAIL_FROM),
  ADMIN_EMAILS: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://benjisaiempire.com",
} as const;

export type Env = typeof env;
