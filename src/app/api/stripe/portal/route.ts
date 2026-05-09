import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(`${env.SITE_URL}/login`, 303);
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { stripeCustomerId: true },
  });

  // No subscription yet → bounce them back to the in-app portal so they can
  // see their tier state / upgrade buttons. The portal page handles the
  // "no Stripe record yet" UX.
  if (!user?.stripeCustomerId) {
    return NextResponse.redirect(`${env.SITE_URL}/portal`, 303);
  }

  try {
    const portal = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${env.SITE_URL}/portal`,
    });
    return NextResponse.redirect(portal.url, 303);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Stripe error";
    console.error("[stripe/portal] error:", message);
    return NextResponse.redirect(
      `${env.SITE_URL}/portal?portalError=${encodeURIComponent(message)}`,
      303,
    );
  }
}
