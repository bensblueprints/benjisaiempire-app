import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { verifyEmailChangeToken } from "@/lib/email-change";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request): Promise<Response> {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(`${env.SITE_URL}/portal?emailError=missing_token`);
  }

  const parsed = verifyEmailChangeToken(token);
  if (!parsed) {
    return NextResponse.redirect(`${env.SITE_URL}/portal?emailError=invalid_or_expired`);
  }

  const user = await prisma.user.findUnique({
    where: { id: parsed.userId },
    select: { id: true, email: true },
  });
  if (!user) {
    return NextResponse.redirect(`${env.SITE_URL}/portal?emailError=account_not_found`);
  }

  const taken = await prisma.user.findUnique({
    where: { email: parsed.newEmail },
    select: { id: true },
  });
  if (taken && taken.id !== user.id) {
    return NextResponse.redirect(`${env.SITE_URL}/portal?emailError=email_taken`);
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      email: parsed.newEmail,
      emailVerified: new Date(),
    },
  });

  revalidatePath("/portal");
  revalidatePath("/community");
  revalidatePath("/community/members");

  const loginUrl = new URL("/login", env.SITE_URL);
  loginUrl.searchParams.set("emailUpdated", "1");
  loginUrl.searchParams.set("email", parsed.newEmail);
  return NextResponse.redirect(loginUrl.toString());
}
