// Magic-link login. Server page wrapping a tiny client form.
// No nav, no pricing, no pitch — this is auth.
import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import Topbar from "@/components/Topbar";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Member Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = params.callbackUrl ?? "/portal";

  async function sendLink(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const cb = String(formData.get("callbackUrl") ?? "/portal");
    if (!email) return;
    await signIn("resend", { email, redirectTo: cb });
  }

  return (
    <>
      <Topbar />
      <main id="main" className="auth-shell">
        <section className="auth-card">
          <span className="auth-eyebrow">Member Access · Magic Link</span>
          <h1 className="auth-title">The door is in your inbox.</h1>
          <p className="auth-lede">
            Drop the address you joined with. I&apos;ll mail you a one-tap
            link — no passwords, no resets, no nonsense. Already a member or
            brand new, same door.
          </p>

          <LoginForm action={sendLink} callbackUrl={callbackUrl} />

          <p className="auth-fineprint">
            By continuing you agree to receive a sign-in email from
            Advanced Marketing. Link expires in ~10 minutes.
          </p>
        </section>
      </main>

      <style>{`
        .auth-shell {
          min-height: calc(100vh - 120px);
          display: grid;
          place-items: center;
          padding: 4rem 1.5rem 6rem;
          background: var(--ink);
          color: var(--cream);
        }
        .auth-card {
          width: 100%;
          max-width: 540px;
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 3.25rem 2.5rem 2.75rem;
          position: relative;
        }
        .auth-card::before {
          content: "";
          position: absolute; inset: 0 0 auto 0;
          height: 3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
        }
        .auth-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold);
          display: block;
          margin-bottom: 1.25rem;
        }
        .auth-title {
          font-family: 'Anton', sans-serif;
          font-size: clamp(2.4rem, 5vw, 3.4rem);
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: var(--cream);
          margin: 0 0 1rem;
          text-transform: uppercase;
        }
        .auth-lede {
          font-family: 'Fraunces', serif;
          font-size: 1.075rem;
          line-height: 1.55;
          color: var(--cream-soft);
          margin: 0 0 2rem;
          font-style: italic;
        }
        .auth-fineprint {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          color: var(--cream-soft);
          margin-top: 1.75rem;
          text-transform: uppercase;
        }
        .shell-topbar--bare { border-bottom: 1px solid var(--line); }
      `}</style>
    </>
  );
}
