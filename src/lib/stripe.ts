import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const STRIPE_CONFIG = {
  insiderPriceId: process.env.STRIPE_PRICE_INSIDER ?? "",
  wholesalePriceId: process.env.STRIPE_PRICE_WHOLESALE ?? "",
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
};
