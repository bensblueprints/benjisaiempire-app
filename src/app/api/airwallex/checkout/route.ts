import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import {
  AIRWALLEX_CONFIG,
  airwallexRequest,
  newRequestId,
} from "@/lib/airwallex";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tier = "INSIDER" | "WHOLESALE";

type BillingCheckoutCreateResponse = {
  id?: string;
  url?: string;
  status?: string;
};

function priceFor(tier: Tier): string | null {
  if (tier === "INSIDER") return AIRWALLEX_CONFIG.insiderPriceId || null;
  if (tier === "WHOLESALE") return AIRWALLEX_CONFIG.wholesalePriceId || null;
  return null;
}

function cancelUrlFor(tier: Tier): string {
  const slug = tier === "WHOLESALE" ? "founders" : "insider";
  return `${env.SITE_URL}/${slug}/?canceled=1`;
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
  tier: Tier,
): Promise<Response> {
  const priceId = priceFor(tier);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          `No Airwallex price configured for tier ${tier}. ` +
          `Set AIRWALLEX_PRICE_${tier} in env (create recurring prices in the Airwallex dashboard).`,
      },
      { status: 500 },
    );
  }

  if (!AIRWALLEX_CONFIG.legalEntityId || !AIRWALLEX_CONFIG.paymentAccountId) {
    return NextResponse.json(
      {
        error:
          "AIRWALLEX_LEGAL_ENTITY_ID and AIRWALLEX_PAYMENT_ACCOUNT_ID are required. " +
          "See AIRWALLEX.md for where to copy them in the dashboard.",
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
          success_url: `${env.SITE_URL}/portal?upgraded=1`,
          back_url: cancelUrlFor(tier),
          line_items: [{ price_id: priceId, quantity: 1 }],
          metadata: { userId: user.id, tier, app: "benjisaiempire" },
          subscription_data: {
            metadata: { userId: user.id, tier, app: "benjisaiempire" },
          },
          customer_data: {
            email: user.email,
            name: user.name ?? undefined,
            type: "INDIVIDUAL",
          },
        },
      },
    );

    if (!checkout.url) {
      return NextResponse.json(
        { error: "Airwallex did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Airwallex error";
    console.error("[airwallex/checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/** GET supports marketing-page links: /api/airwallex/checkout?tier=INSIDER */
export async function GET(req: Request): Promise<Response> {
  const tier = new URL(req.url).searchParams.get("tier") as Tier | null;
  if (tier !== "INSIDER" && tier !== "WHOLESALE") {
    return NextResponse.json(
      { error: "Invalid tier — use ?tier=INSIDER or ?tier=WHOLESALE" },
      { status: 400 },
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    const returnTo = encodeURIComponent(`/api/airwallex/checkout?tier=${tier}`);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${returnTo}`, req.url),
    );
  }

  const result = await createCheckoutResponse(session.user.id, tier);
  if (!result.ok) return result;

  const data = (await result.json()) as { url?: string };
  if (!data.url) {
    return NextResponse.json({ error: "No checkout URL" }, { status: 500 });
  }
  return NextResponse.redirect(data.url);
}

export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Not signed in", redirectTo: "/login" },
      { status: 401 },
    );
  }

  let body: { tier?: string } = {};
  try {
    body = (await req.json()) as { tier?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const tier = body.tier as Tier | undefined;
  if (tier !== "INSIDER" && tier !== "WHOLESALE") {
    return NextResponse.json(
      { error: "Invalid tier — must be INSIDER or WHOLESALE" },
      { status: 400 },
    );
  }

  return createCheckoutResponse(session.user.id, tier);
}
