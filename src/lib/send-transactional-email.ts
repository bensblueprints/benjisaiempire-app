import { Resend } from "resend";
import { env } from "@/lib/env";

let client: Resend | null = null;

function resend(): Resend {
  if (!client) client = new Resend(env.RESEND_API_KEY);
  return client;
}

export async function sendTransactionalEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
}): Promise<void> {
  const { error } = await resend().emails.send({
    from: env.EMAIL_FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    text: opts.text,
  });
  if (error) {
    throw new Error(error.message ?? "Failed to send email");
  }
}
