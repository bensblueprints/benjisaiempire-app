import { signIn } from "@/lib/auth";

/** Send a Resend magic-link email (no browser redirect). */
export async function sendMagicLink(
  email: string,
  redirectTo = "/portal",
): Promise<void> {
  await signIn("resend", { email, redirectTo, redirect: false });
}
