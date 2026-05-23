import { NextResponse } from "next/server";
import {
  AIRWALLEX_CONFIG,
  verifyAirwallexWebhookSignature,
} from "@/lib/airwallex";
import { handleStoryboardBillingCheckoutCompleted } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AirwallexWebhookEvent = {
  name?: string;
  data?: {
    object?: Record<string, unknown>;
  } & Record<string, unknown>;
};

export async function POST(req: Request): Promise<Response> {
  const rawBody = await req.text();
  const timestamp = req.headers.get("x-timestamp");
  const signature = req.headers.get("x-signature");

  if (
    !verifyAirwallexWebhookSignature(
      rawBody,
      timestamp,
      signature,
      AIRWALLEX_CONFIG.webhookSecret,
    )
  ) {
    return new NextResponse("failed to verify webhook signature", { status: 400 });
  }

  let event: AirwallexWebhookEvent;
  try {
    event = JSON.parse(rawBody) as AirwallexWebhookEvent;
  } catch {
    return new NextResponse("invalid json", { status: 400 });
  }

  const name = event.name ?? "";
  const data = (event.data?.object ?? event.data) as Record<string, unknown> | undefined;

  try {
    if (name === "billing_checkout.completed" && data) {
      await handleStoryboardBillingCheckoutCompleted(
        data as {
          id?: string;
          metadata?: Record<string, string>;
          customer_data?: { email?: string };
          customer?: { email?: string };
        },
      );
    }
  } catch (err) {
    console.error("[storyboard/webhook] handler failed:", err);
    return new NextResponse("webhook handler failed", { status: 500 });
  }

  return new NextResponse("ok", { status: 200 });
}
