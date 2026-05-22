/**
 * Payment provider routing — Stripe (legacy) vs Airwallex.
 * Set USE_AIRWALLEX=true (and NEXT_PUBLIC_USE_AIRWALLEX=true for client checkout UI).
 */

export function useAirwallex(): boolean {
  return (
    process.env.USE_AIRWALLEX === "true" ||
    process.env.NEXT_PUBLIC_USE_AIRWALLEX === "true"
  );
}

export type PaymentProvider = "stripe" | "airwallex";

export function activePaymentProvider(): PaymentProvider {
  return useAirwallex() ? "airwallex" : "stripe";
}

export function checkoutApiPath(): string {
  return useAirwallex() ? "/api/airwallex/checkout" : "/api/stripe/checkout";
}

export function portalApiPath(): string {
  return useAirwallex() ? "/api/airwallex/portal" : "/api/stripe/portal";
}

/** Guest checkout landing (email → hosted payment). */
export type CheckoutTier = "INSIDER" | "WHOLESALE" | "DONE_WITH_YOU";

export function guestCheckoutPath(tier: CheckoutTier): string {
  if (tier === "WHOLESALE") return "/checkout/founders";
  if (tier === "DONE_WITH_YOU") return "/checkout/done-with-you";
  return "/checkout/insider";
}
