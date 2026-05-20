import Stripe from "stripe";

let _stripe: Stripe | null = null;

/** Lazy Stripe client — only required when Stripe is the active payment provider. */
export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

/** @deprecated Prefer getStripe() — kept for existing Stripe routes. */
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client, prop, receiver);
    return typeof value === "function" ? value.bind(client) : value;
  },
});

export const STRIPE_CONFIG = {
  insiderPriceId: process.env.STRIPE_PRICE_INSIDER ?? "",
  wholesalePriceId: process.env.STRIPE_PRICE_WHOLESALE ?? "",
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
};
