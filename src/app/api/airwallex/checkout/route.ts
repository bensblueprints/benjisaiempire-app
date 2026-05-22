import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  AIRWALLEX_CONFIG,
  airwallexRequest,
  newRequestId,
} from "@/lib/airwallex";
import { env } from "@/lib/env";
import { findOrCreateUserByEmail, normalizeCheckoutEmail } from "@/lib/checkout-user";
import { type CheckoutTier, guestCheckoutPath } from "@/lib/payments";
import {
  type DfyBillingPlan,
  externalDfyCheckoutUrl,
} from "@/lib/done-with-you";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type BillingCheckoutCreateResponse = {
  id?: string;
  url?: string;
  status?: string;
};

function parsePlan(raw: string | null): DfyBillingPlan {
  return raw === "yearly" ? "yearly" : "monthly";
}

function isCheckoutTier(t: string | null): t is CheckoutTier {
  return t === "INSIDER" || t === "WHOLESALE" || t === "DONE_WITH_YOU";
}

function priceFor(tier: CheckoutTier, plan: DfyBillingPlan): string | null {
  if (tier === "INSIDER") return AIRWALLEX_CONFIG.insiderPriceId || null;
  if (tier === "WHOLESALE") return AIRWALLEX_CONFIG.wholesalePriceId || null;
  if (tier === "DONE_WITH_YOU") {
    return plan === "yearly"
      ? AIRWALLEX_CONFIG.dwyYearlyPriceId || null
      : AIRWALLEX_CONFIG.dwyMonthlyPriceId || null;
  }
  return null;
}

function cancelUrlFor(tier: CheckoutTier): string {
  if (tier === "WHOLESALE") return `${env.SITE_URL}/founders/?canceled=1`;
  if (tier === "DONE_WITH_YOU") return `${env.SITE_URL}/checkout/done-with-you?canceled=1`;
  return `${env.SITE_URL}/insider/?canceled=1`;
}

function successUrlFor(tier: CheckoutTier): string {
  if (tier === "WHOLESALE") return `${env.SITE_URL}/founders/welcome?paid=1`;
  if (tier === "DONE_WITH_YOU") return `${env.SITE_URL}/done-with-you/welcome?paid=1`;
  return `${env.SITE_URL}/insider/welcome?paid=1`;
}

function guestCheckoutRedirect(req: Request, tier: CheckoutTier): Response {
  return NextResponse.redirect(new URL(guestCheckoutPath(tier), req.url));
}

async function ensureBillingCustomer(
  user: { id: string; email: string; name: string | null; airwallexBillingCustomerId: string | null },
): Promise<string> {
  if (user.airwallexBillingCustomerId) return user.airwallexBillingCustomerId;

  const created = await airwallexRequest<{ id: string }>(
    "/api/v1/billing_customers/create",
    {
      method: "POST",
      json: {
        request_id: newRequestId(),
        email: user.email,
        name: user.name ?? undefined,
        type: "INDIVIDUAL",
        metadata: { userId: user.id, app: "benjisaiempire" },
        ...(AIRWALLEX_CONFIG.legalEntityId
          ? { default_legal_entity_id: AIRWALLEX_CONFIG.legalEntityId }
          : {}),
      },
    },
  );

  await prisma.user.update({
    where: { id: user.id },
    data: {
      airwallexBillingCustomerId: created.id,
      paymentProvider: "airwallex",
    },
  });

  return created.id;
}

async function createCheckoutResponse(
  userId: string,
  tier: CheckoutTier,
  plan: DfyBillingPlan,
): Promise<Response> {
  const externalUrl =
    tier === "DONE_WITH_YOU" ? externalDfyCheckoutUrl(plan) : null;
  if (externalUrl) {
    return NextResponse.json({ url: externalUrl });
  }

  const priceId = priceFor(tier, plan);
  if (!priceId) {
    const envHint =
      tier === "DONE_WITH_YOU"
        ? plan === "yearly"
          ? "AIRWALLEX_PRICE_DONE_WITH_YOU_YEARLY or AIRWALLEX_CHECKOUT_DFY_YEARLY_URL"
          : "AIRWALLEX_PRICE_DONE_WITH_YOU_MONTHLY or AIRWALLEX_CHECKOUT_DFY_MONTHLY_URL"
        : `AIRWALLEX_PRICE_${tier}`;
    return NextResponse.json(
      {
        error: `No Airwallex price configured for ${tier}${tier === "DONE_WITH_YOU" ? ` (${plan})` : ""}. Set ${envHint} in env.`,
      },
      { status: 500 },
    );
  }

  if (!AIRWALLEX_CONFIG.legalEntityId || !AIRWALLEX_CONFIG.paymentAccountId) {
    return NextResponse.json(
      {
        error:
          "AIRWALLEX_LEGAL_ENTITY_ID and AIRWALLEX_PAYMENT_ACCOUNT_ID are required. See AIRWALLEX.md.",
      },
      { status: 500 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      airwallexBillingCustomerId: true,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User record not found" }, { status: 404 });
  }

  try {
    const billingCustomerId = await ensureBillingCustomer(user);
    const meta = {
      userId: user.id,
      tier,
      email: user.email,
      app: "benjisaiempire",
      ...(tier === "DONE_WITH_YOU" ? { billingPlan: plan } : {}),
    };

    const checkout = await airwallexRequest<BillingCheckoutCreateResponse>(
      "/api/v1/billing_checkouts/create",
      {
        method: "POST",
        json: {
          request_id: newRequestId(),
          mode: "SUBSCRIPTION",
          legal_entity_id: AIRWALLEX_CONFIG.legalEntityId,
          linked_payment_account_id: AIRWALLEX_CONFIG.paymentAccountId,
          billing_customer_id: billingCustomerId,
          success_url: successUrlFor(tier),
          back_url: cancelUrlFor(tier),
          line_items: [{ price_id: priceId, quantity: 1 }],
          metadata: meta,
          subscription_data: { metadata: meta },
        },
      },
    );

    if (!checkout.url) {
      return NextResponse.json({ error: "Airwallex did not return a checkout URL" }, { status: 500 });
    }

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Airwallex error";
    console.error("[airwallex/checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function createGuestCheckoutResponse(
  email: string,
  tier: CheckoutTier,
  plan: DfyBillingPlan,
): Promise<Response> {
  const normalized = normalizeCheckoutEmail(email);
  if (!normalized) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  try {
    const user = await findOrCreateUserByEmail(normalized);
    if (!user) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    return createCheckoutResponse(user.id, tier, plan);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Database error during checkout";
    console.error("[airwallex/checkout] guest user error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function checkoutErrorResponse(err: unknown, context: string): Response {
  const message = err instanceof Error ? err.message : "Checkout failed";
  console.error(`[airwallex/checkout] ${context}:`, message);
  return NextResponse.json({ error: message }, { status: 500 });
}

async function redirectFromCheckoutResult(result: Response): Promise<Response> {
  if (!result.ok) return result;
  const data = (await result.json()) as { url?: string };
  if (!data.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }
  return NextResponse.redirect(data.url);
}

/** GET: signed-in → Airwallex; guest with ?email= → checkout; else → guest landing page */
export async function GET(req: Request): Promise<Response> {
  try {
    const url = new URL(req.url);
    const tierRaw = url.searchParams.get("tier");
    if (!isCheckoutTier(tierRaw)) {
      return NextResponse.json(
        { error: "Invalid tier — use INSIDER, WHOLESALE, or DONE_WITH_YOU" },
        { status: 400 },
      );
    }
    const plan = parsePlan(url.searchParams.get("plan"));

    const session = await auth();
    if (session?.user?.id) {
      return redirectFromCheckoutResult(
        await createCheckoutResponse(session.user.id, tierRaw, plan),
      );
    }

    const email = url.searchParams.get("email");
    if (email) {
      return redirectFromCheckoutResult(
        await createGuestCheckoutResponse(email, tierRaw, plan),
      );
    }

    return guestCheckoutRedirect(req, tierRaw);
  } catch (err) {
    return checkoutErrorResponse(err, "GET");
  }
}

export async function POST(req: Request): Promise<Response> {
  try {
    let body: { tier?: string; email?: string; plan?: string } = {};
    try {
      body = (await req.json()) as { tier?: string; email?: string; plan?: string };
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const tier = body.tier ?? null;
    if (!isCheckoutTier(tier)) {
      return NextResponse.json(
        { error: "Invalid tier — must be INSIDER, WHOLESALE, or DONE_WITH_YOU" },
        { status: 400 },
      );
    }

    const plan = parsePlan(body.plan ?? null);
    const session = await auth();
    if (session?.user?.id) {
      return createCheckoutResponse(session.user.id, tier, plan);
    }

    if (body.email) {
      return createGuestCheckoutResponse(body.email, tier, plan);
    }

    return NextResponse.json(
      { error: "Email required for guest checkout", redirectTo: guestCheckoutPath(tier) },
      { status: 400 },
    );
  } catch (err) {
    return checkoutErrorResponse(err, "POST");
  }
}
