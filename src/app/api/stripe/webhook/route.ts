import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, STRIPE_CONFIG } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export const runtime = "nodejs"; // raw body needs Node, not Edge
export const dynamic = "force-dynamic";

type Tier = "FREE" | "INSIDER" | "WHOLESALE" | "DONE_WITH_YOU";

const STATUS_MAP: Record<Stripe.Subscription.Status, "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE"> = {
  active: "ACTIVE",
  trialing: "TRIALING",
  past_due: "PAST_DUE",
  canceled: "CANCELED",
  incomplete: "INCOMPLETE",
  incomplete_expired: "CANCELED",
  unpaid: "PAST_DUE",
  paused: "PAST_DUE",
};

function tierFromMetadata(meta: Stripe.Metadata | null | undefined): Tier {
  const t = meta?.tier;
  if (t === "INSIDER" || t === "WHOLESALE" || t === "FREE") return t;
  return "FREE";
}

async function handleCheckoutCompleted(event: Stripe.Event): Promise<void> {
  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session.client_reference_id ?? session.metadata?.userId ?? null;
  if (!userId) {
    console.warn("[stripe/webhook] checkout.session.completed without userId", session.id);
    return;
  }

  const tier = tierFromMetadata(session.metadata);
  const subId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id ?? null;
  const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? null;

  let status: "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE" = "ACTIVE";
  if (subId) {
    try {
      const sub = await stripe.subscriptions.retrieve(subId);
      status = STATUS_MAP[sub.status] ?? "INCOMPLETE";
    } catch (err) {
      console.warn(
        "[stripe/webhook] failed to retrieve subscription",
        subId,
        err instanceof Error ? err.message : err,
      );
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      tier,
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: subId ?? undefined,
      subscriptionStatus: status,
    },
  });
  console.log(`[stripe/webhook] upgraded user=${userId} → tier=${tier} status=${status}`);
}

async function handleSubscriptionUpdated(event: Stripe.Event): Promise<void> {
  const sub = event.data.object as Stripe.Subscription;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true, tier: true },
  });
  if (!user) {
    console.warn("[stripe/webhook] subscription.updated for unknown customer", customerId);
    return;
  }

  const status = STATUS_MAP[sub.status] ?? "INCOMPLETE";
  // If sub is canceled or unpaid, drop them to FREE. Otherwise preserve tier
  // (or recompute from sub metadata if present).
  let newTier: Tier = user.tier;
  if (sub.status === "canceled" || sub.status === "unpaid" || sub.status === "incomplete_expired") {
    newTier = "FREE";
  } else {
    const metaTier = tierFromMetadata(sub.metadata);
    if (metaTier !== "FREE") newTier = metaTier;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      tier: newTier,
      stripeSubscriptionId: sub.id,
      subscriptionStatus: status,
    },
  });
  console.log(
    `[stripe/webhook] subscription.updated user=${user.id} status=${status} tier=${newTier}`,
  );
}

async function handleSubscriptionDeleted(event: Stripe.Event): Promise<void> {
  const sub = event.data.object as Stripe.Subscription;
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });
  if (!user) {
    console.warn("[stripe/webhook] subscription.deleted for unknown customer", customerId);
    return;
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      tier: "FREE",
      subscriptionStatus: "CANCELED",
      stripeSubscriptionId: null,
    },
  });
  console.log(`[stripe/webhook] subscription.deleted user=${user.id} → FREE`);
}

async function handleInvoicePaymentFailed(event: Stripe.Event): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;
  const customerId =
    typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id ?? null;
  if (!customerId) return;
  const user = await prisma.user.findFirst({
    where: { stripeCustomerId: customerId },
    select: { id: true },
  });
  if (!user) {
    console.warn("[stripe/webhook] invoice.payment_failed for unknown customer", customerId);
    return;
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { subscriptionStatus: "PAST_DUE" },
  });
  console.warn(
    `[stripe/webhook] invoice.payment_failed user=${user.id} amount=${invoice.amount_due} → PAST_DUE`,
  );
}

export async function POST(req: Request): Promise<Response> {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }
  if (!STRIPE_CONFIG.webhookSecret) {
    console.error("[stripe/webhook] STRIPE_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  // Stripe REQUIRES the raw body string for signature verification.
  // Don't use req.json() here — it will mutate the bytes.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, STRIPE_CONFIG.webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "signature verification failed";
    console.error("[stripe/webhook] signature verification failed:", message);
    return NextResponse.json({ error: `Webhook signature error: ${message}` }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event);
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(event);
        break;
      default:
        // Unhandled event types are normal — Stripe may send many we don't care about.
        console.log(`[stripe/webhook] ignored event type ${event.type}`);
    }
  } catch (err) {
    // Log but always return 200 — Stripe retries on non-200 and we've already
    // verified the event. Better to swallow & alert than enter a retry storm.
    console.error(
      `[stripe/webhook] handler for ${event.type} failed:`,
      err instanceof Error ? err.message : err,
    );
  }

  return NextResponse.json({ received: true });
}
