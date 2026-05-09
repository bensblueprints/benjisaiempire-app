import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tier = "INSIDER" | "WHOLESALE";

function priceFor(tier: Tier): string | null {
  if (tier === "INSIDER") return STRIPE_CONFIG.insiderPriceId || null;
  if (tier === "WHOLESALE") return STRIPE_CONFIG.wholesalePriceId || null;
  return null;
}

function cancelUrlFor(tier: Tier): string {
  // Marketing pages live at /insider and /founders; we send the user back
  // to the page that produced the checkout click with a `?canceled=1` flag.
  const slug = tier === "WHOLESALE" ? "founders" : "insider";
  return `${env.SITE_URL}/${slug}/?canceled=1`;
}

export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user?.email) {
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

  const priceId = priceFor(tier);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          `No Stripe price configured for tier ${tier}. ` +
          `Run \`npm run setup-stripe\` and set STRIPE_PRICE_${tier} in env.`,
      },
      { status: 500 },
    );
  }

  // Look up the user (auth() session has id but we want fresh stripeCustomerId)
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, stripeCustomerId: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User record not found" }, { status: 404 });
  }

  try {
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name ?? undefined,
        metadata: { userId: user.id, app: "benjisaiempire" },
      });
      customerId = customer.id;
      await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customerId },
      });
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${env.SITE_URL}/portal?upgraded=1`,
      cancel_url: cancelUrlFor(tier),
      allow_promotion_codes: true,
      client_reference_id: user.id,
      metadata: { userId: user.id, tier },
      subscription_data: {
        metadata: { userId: user.id, tier, app: "benjisaiempire" },
      },
    });

    if (!checkout.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }
    return NextResponse.json({ url: checkout.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Stripe error";
    console.error("[stripe/checkout] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
