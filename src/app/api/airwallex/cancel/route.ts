import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { airwallexRequest, newRequestId } from "@/lib/airwallex";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SubscriptionResponse = {
  id?: string;
  status?: string;
  cancel_at_period_end?: boolean;
};

export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(`${env.SITE_URL}/login?callbackUrl=/portal`, 303);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { airwallexSubscriptionId: true },
  });

  if (!user?.airwallexSubscriptionId) {
    return NextResponse.redirect(`${env.SITE_URL}/portal?billingError=no_subscription`, 303);
  }

  const form = await req.formData().catch(() => null);
  const immediate = form?.get("immediate") === "1";

  try {
    if (immediate) {
      await airwallexRequest<SubscriptionResponse>(
        `/api/v1/subscriptions/${user.airwallexSubscriptionId}/cancel`,
        {
          method: "POST",
          json: {
            request_id: newRequestId(),
            proration_behavior: "NONE",
          },
        },
      );
    } else {
      await airwallexRequest<SubscriptionResponse>(
        `/api/v1/subscriptions/${user.airwallexSubscriptionId}/update`,
        {
          method: "POST",
          json: {
            request_id: newRequestId(),
            cancel_at_period_end: true,
          },
        },
      );
    }

    return NextResponse.redirect(`${env.SITE_URL}/portal?billing=cancel_scheduled`, 303);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Cancel failed";
    console.error("[airwallex/cancel] error:", message);
    return NextResponse.redirect(
      `${env.SITE_URL}/portal?billingError=${encodeURIComponent(message)}`,
      303,
    );
  }
}
