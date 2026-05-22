import { env } from "@/lib/env";

type ResendErrorBody = { message?: string; name?: string };

/** Send HTML/text email via Resend REST API (avoids bundling @react-email/render). */
export async function sendTransactionalEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [opts.to],
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as ResendErrorBody;
  if (!res.ok) {
    throw new Error(data.message ?? data.name ?? "Failed to send email");
  }
}
