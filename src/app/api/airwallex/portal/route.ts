import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { env } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** No hosted billing portal — send members to in-app billing management. */
export async function GET(): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.redirect(`${env.SITE_URL}/login?callbackUrl=/portal`, 303);
  }

  return NextResponse.redirect(`${env.SITE_URL}/portal#manage-billing`, 303);
}
