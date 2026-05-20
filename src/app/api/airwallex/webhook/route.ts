import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import {
  AIRWALLEX_CONFIG,
  verifyAirwallexWebhookSignature,
} from "@/lib/airwallex";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Tier = "FREE" | "INSIDER" | "WHOLESALE";

type AirwallexSubscription = {
  id?: string;
  status?: string;
  billing_customer_id?: string;
  metadata?: Record<string, string>;
  cancel_at_period_end?: boolean;
};

type AirwallexBillingCheckout = {
  id?: string;
  status?: string;
  subscription_id?: string;
  billing_customer_id?: string;
  metadata?: Record<string, string>;
};

type AirwallexWebhookEvent = {
  id?: string;
  name?: string;
  data?: AirwallexSubscription | AirwallexBillingCheckout;
};

const STATUS_MAP: Record<string, "ACTIVE" | "TRIALING" | "PAST_DUE" | "CANCELED" | "INCOMPLETE"> = {
  ACTIVE: "ACTIVE",
  IN_TRIAL: "TRIALING",
  UNPAID: "PAST_DUE",
  CANCELLED: "CANCELED",
  PENDING: "INCOMPLETE",
};

function tierFromMetadata(meta: Record<string, string> | undefined): Tier {
  const t = meta?.tier;
  if (t === "INSIDER" || t === "WHOLESALE" || t === "FREE") return t;
  return "FREE";
}

async function findUserForSubscription(sub: AirwallexSubscription) {
  const userId = sub.metadata?.userId;
  if (userId) {
    return prisma.user.findUnique({ where: { id: userId }, select: { id: true, tier: true } });
  }
  if (sub.billing_customer_id) {
    return prisma.user.findFirst({
      where: { airwallexBillingCustomerId: sub.billing_customer_id },
      select: { id: true, tier: true },
    });
  }
  if (sub.id) {
    return prisma.user.findFirst({
      where: { airwallexSubscriptionId: sub.id },
      select: { id: true, tier: true },
    });
  }
  return null;
}

async function applySubscription(
  sub: AirwallexSubscription,
  opts?: { tierOverride?: Tier },
): Promise<void> {
  const user = await findUserForSubscription(sub);
  if (!user) {
    console.warn(
      "[airwallex/webhook] subscription event for unknown customer",
      sub.billing_customer_id ?? sub.id,
    );
    return;
  }

  const status = sub.status ? (STATUS_MAP[sub.status] ?? "INCOMPLETE") : "INCOMPLETE";
  let newTier: Tier = user.tier;

  if (sub.status === "CANCELLED" || sub.status === "UNPAID") {
    newTier = "FREE";
  } else {
    const metaTier = tierFromMetadata(sub.metadata);
    if (metaTier !== "FREE") newTier = metaTier;
    if (opts?.tierOverride && opts.tierOverride !== "FREE") {
      newTier = opts.tierOverride;
    }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      tier: newTier,
      paymentProvider: "airwallex",
      airwallexBillingCustomerId: sub.billing_customer_id ?? undefined,
      airwallexSubscriptionId: sub.id ?? undefined,
      subscriptionStatus: status,
    },
  });

  console.log(
    `[airwallex/webhook] user=${user.id} tier=${newTier} status=${status} sub=${sub.id}`,
  );
}

async function handleBillingCheckoutCompleted(data: AirwallexBillingCheckout): Promise<void> {
  const userId = data.metadata?.userId;
  const tier = tierFromMetadata(data.metadata);
  if (!userId) {
    console.warn("[airwallex/webhook] billing_checkout.completed without userId", data.id);
    return;
  }

  if (data.subscription_id) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        tier: tier !== "FREE" ? tier : undefined,
        paymentProvider: "airwallex",
        airwallexBillingCustomerId: data.billing_customer_id ?? undefined,
        airwallexSubscriptionId: data.subscription_id,
        subscriptionStatus: "ACTIVE",
      },
    });
    console.log(
      `[airwallex/webhook] checkout completed user=${userId} tier=${tier} sub=${data.subscription_id}`,
    );
    return;
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      tier: tier !== "FREE" ? tier : undefined,
      paymentProvider: "airwallex",
      airwallexBillingCustomerId: data.billing_customer_id ?? undefined,
      subscriptionStatus: "ACTIVE",
    },
  });
}

export async function POST(req: Request): Promise<Response> {
  const timestamp = req.headers.get("x-timestamp");
  const signature = req.headers.get("x-signature");
  const rawBody = await req.text();

  if (!AIRWALLEX_CONFIG.webhookSecret) {
    console.error("[airwallex/webhook] AIRWALLEX_WEBHOOK_SECRET is not set");
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  if (
    !verifyAirwallexWebhookSignature(
      rawBody,
      timestamp,
      signature,
      AIRWALLEX_CONFIG.webhookSecret,
    )
  ) {
    console.error("[airwallex/webhook] signature verification failed");
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  let event: AirwallexWebhookEvent;
  try {
    event = JSON.parse(rawBody) as AirwallexWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = event.name ?? "";
  const data = event.data;

  try {
    if (name === "billing_checkout.completed" && data) {
      await handleBillingCheckoutCompleted(data as AirwallexBillingCheckout);
    } else if (name.startsWith("subscription.") && data) {
      await applySubscription(data as AirwallexSubscription);
    } else {
      console.log(`[airwallex/webhook] ignored event ${name}`);
    }
  } catch (err) {
    console.error(
      `[airwallex/webhook] handler for ${name} failed:`,
      err instanceof Error ? err.message : err,
    );
  }

  return NextResponse.json({ received: true });
}
