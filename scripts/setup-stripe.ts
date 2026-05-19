/**
 * Bootstrap script — creates the two Benji's AI Empire subscription products
 * in Stripe (Insider $10/mo, Wholesale GHL $49/mo) and a customer-portal
 * configuration. Idempotent: re-running does NOT create dupes.
 *
 * Run via: `npm run setup-stripe`
 *
 * Looks up products by metadata { app: "benjisaiempire", tier: <TIER> } and
 * reuses them if found. Same for the active price (matches by unit_amount +
 * recurring interval). Outputs the price IDs so Ben can paste them into .env.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import Stripe from "stripe";

// Tiny .env loader — avoid adding `dotenv` as a dep just for this script.
function loadDotEnv(file: string): void {
  if (!fs.existsSync(file)) return;
  const text = fs.readFileSync(file, "utf8");
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq < 0) continue;
    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadDotEnv(path.resolve(process.cwd(), ".env"));

const APP_KEY = "benjisaiempire";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("[setup-stripe] STRIPE_SECRET_KEY is not set in env.");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

type TierKey = "INSIDER" | "WHOLESALE";

interface ProductSpec {
  tier: TierKey;
  name: string;
  description: string;
  unitAmount: number; // cents
  envVar: string;
}

const PRODUCTS: ProductSpec[] = [
  {
    tier: "INSIDER",
    name: "Insider — Everything Bucket",
    description:
      "Empire Insider — $9/month. All 4 courses, every prompt & script, free GoHighLevel sub-account, Tuesday Cold Call Live replays, and private Insider community.",
    unitAmount: 900,
    envVar: "STRIPE_PRICE_INSIDER",
  },
  {
    tier: "WHOLESALE",
    name: "Wholesale GHL",
    description:
      "Wholesale GHL — $49/month. Sub-account access at Benji's wholesale rate, with concierge onboarding and credentials within 24 hours.",
    unitAmount: 4900,
    envVar: "STRIPE_PRICE_WHOLESALE",
  },
];

async function findProductByTier(tier: TierKey): Promise<Stripe.Product | null> {
  // Stripe's product list is paginated; we scan up to ~300 active products
  // looking for one whose metadata matches our app+tier. In practice Ben's
  // account has very few products so this is effectively a no-op cost.
  let starting_after: string | undefined;
  for (let i = 0; i < 3; i++) {
    const page = await stripe.products.list({ limit: 100, active: true, starting_after });
    for (const p of page.data) {
      if (p.metadata?.app === APP_KEY && p.metadata?.tier === tier) {
        return p;
      }
    }
    if (!page.has_more) break;
    starting_after = page.data[page.data.length - 1]?.id;
  }
  return null;
}

async function findActivePriceForProduct(
  productId: string,
  unitAmount: number,
): Promise<Stripe.Price | null> {
  const prices = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  return (
    prices.data.find(
      (pr) =>
        pr.unit_amount === unitAmount &&
        pr.currency === "usd" &&
        pr.recurring?.interval === "month",
    ) ?? null
  );
}

async function ensureProductAndPrice(spec: ProductSpec): Promise<{
  product: Stripe.Product;
  price: Stripe.Price;
  created: { product: boolean; price: boolean };
}> {
  let product = await findProductByTier(spec.tier);
  let createdProduct = false;

  if (!product) {
    product = await stripe.products.create({
      name: spec.name,
      description: spec.description,
      metadata: { app: APP_KEY, tier: spec.tier },
    });
    createdProduct = true;
  } else {
    // Keep the description up-to-date in case the marketing copy drifts.
    if (product.name !== spec.name || product.description !== spec.description) {
      product = await stripe.products.update(product.id, {
        name: spec.name,
        description: spec.description,
        metadata: { app: APP_KEY, tier: spec.tier },
      });
    }
  }

  let price = await findActivePriceForProduct(product.id, spec.unitAmount);
  let createdPrice = false;
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      currency: "usd",
      unit_amount: spec.unitAmount,
      recurring: { interval: "month" },
      metadata: { app: APP_KEY, tier: spec.tier },
    });
    createdPrice = true;
  }

  return { product, price, created: { product: createdProduct, price: createdPrice } };
}

async function ensureCustomerPortalConfiguration(): Promise<Stripe.BillingPortal.Configuration> {
  // Find an existing config tagged for this app, otherwise create one.
  const list = await stripe.billingPortal.configurations.list({ limit: 100, active: true });
  const existing = list.data.find((c) => c.metadata?.app === APP_KEY);

  const config: Stripe.BillingPortal.ConfigurationCreateParams = {
    business_profile: {
      headline: "Benji's AI Empire — manage your membership",
    },
    features: {
      customer_update: {
        enabled: true,
        allowed_updates: ["email", "name", "address", "phone", "tax_id"],
      },
      invoice_history: { enabled: true },
      payment_method_update: { enabled: true },
      subscription_cancel: {
        enabled: true,
        mode: "at_period_end",
        cancellation_reason: {
          enabled: true,
          options: [
            "too_expensive",
            "missing_features",
            "switched_service",
            "unused",
            "customer_service",
            "too_complex",
            "low_quality",
            "other",
          ],
        },
      },
    },
    metadata: { app: APP_KEY },
  };

  if (existing) {
    return stripe.billingPortal.configurations.update(existing.id, {
      business_profile: config.business_profile,
      features: config.features,
      metadata: config.metadata,
    });
  }
  return stripe.billingPortal.configurations.create(config);
}

async function main(): Promise<void> {
  console.log("[setup-stripe] Bootstrapping products & prices...\n");

  const results: { tier: TierKey; envVar: string; priceId: string }[] = [];

  for (const spec of PRODUCTS) {
    const { product, price, created } = await ensureProductAndPrice(spec);
    console.log(
      `  ${spec.tier.padEnd(10)} → product=${product.id} ${
        created.product ? "(created)" : "(reused)"
      }  price=${price.id} ${created.price ? "(created)" : "(reused)"}`,
    );
    results.push({ tier: spec.tier, envVar: spec.envVar, priceId: price.id });
  }

  console.log("\n[setup-stripe] Ensuring customer-portal configuration...");
  const portal = await ensureCustomerPortalConfiguration();
  console.log(`  portal.config=${portal.id}`);

  console.log("\n=========================================================");
  console.log(" Paste these into your .env (Coolify env panel) and redeploy:");
  console.log("=========================================================\n");
  for (const r of results) {
    console.log(`${r.envVar}=${r.priceId}`);
  }
  console.log(
    "\nAlso set STRIPE_WEBHOOK_SECRET after registering the webhook endpoint:\n" +
      `  https://benjisaiempire.com/api/stripe/webhook\n` +
      `  events: checkout.session.completed, customer.subscription.updated,\n` +
      `          customer.subscription.deleted, invoice.payment_failed\n`,
  );
}

main().catch((err) => {
  console.error("[setup-stripe] FAILED:", err?.message ?? err);
  process.exit(1);
});
