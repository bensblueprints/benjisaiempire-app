import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { env } from "@/lib/env";
import { createEmailChangeToken, normalizeMemberEmail } from "@/lib/email-change";
import { sendTransactionalEmail } from "@/lib/send-transactional-email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request): Promise<Response> {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Sign in to change your email." }, { status: 401 });
  }

  let body: { email?: string };
  try {
    body = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const newEmail = normalizeMemberEmail(body.email ?? "");
  if (!newEmail) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const current = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true },
  });
  if (!current) {
    return NextResponse.json({ error: "Account not found." }, { status: 404 });
  }

  if (current.email.toLowerCase() === newEmail) {
    return NextResponse.json({ error: "That is already your email." }, { status: 400 });
  }

  const taken = await prisma.user.findUnique({
    where: { email: newEmail },
    select: { id: true },
  });
  if (taken && taken.id !== session.user.id) {
    return NextResponse.json(
      { error: "That email is already on another account." },
      { status: 409 },
    );
  }

  const token = createEmailChangeToken(session.user.id, newEmail);
  const confirmUrl = `${env.SITE_URL}/api/profile/email/confirm?token=${encodeURIComponent(token)}`;

  try {
    await sendTransactionalEmail({
      to: newEmail,
      subject: "Confirm your new email — Benji's AI Empire",
      text: `Confirm your new login email for Benji's AI Empire:\n\n${confirmUrl}\n\nThis link expires in 24 hours. If you did not request this, ignore this email.`,
      html: `
        <p>Confirm your new login email for <strong>Benji's AI Empire</strong>.</p>
        <p><a href="${confirmUrl}" style="color:#d4af37;font-weight:bold;">Confirm new email</a></p>
        <p style="color:#666;font-size:14px;">This link expires in 24 hours. If you did not request this, ignore this email.</p>
      `,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not send confirmation email";
    console.error("[api/profile/email/request]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }

  revalidatePath("/portal");
  revalidatePath("/community");

  return NextResponse.json({
    ok: true,
    message: `Confirmation link sent to ${newEmail}. Check your inbox (and spam).`,
  });
}
