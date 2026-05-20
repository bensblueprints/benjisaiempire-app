import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Join AI Empire Insider — Checkout",
  description: "Start your $9/mo Insider membership. Pay first, then get your account and magic link.",
  robots: { index: false, follow: false },
};

export default async function InsiderCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <header className="shell-topbar shell-topbar--bare" data-shell="topbar">
        <div className="shell-topbar__inner" style={{ justifyContent: "center" }}>
          <Link
            href="/insider/"
            className="shell-topbar__brand"
            aria-label="Back to AI Empire Insider"
            style={{ textAlign: "center" }}
          >
            <span className="shell-topbar__brand-name">Benji&apos;s AI Empire</span>
            <span className="shell-topbar__brand-sub">AI Empire Insider · $9/mo</span>
          </Link>
        </div>
      </header>

      <main id="main" className="auth-shell">
        <section className="auth-card">
          <span className="auth-eyebrow">Checkout · $9 / month</span>
          <h1 className="auth-title">Join Insider — $9/mo</h1>
          <p className="auth-lede">
            Enter your email, then continue to secure payment. After you pay, we create your account
            and send a magic link.
          </p>

          {params.error ? (
            <p className="auth-form__error" role="alert">
              {params.error}
            </p>
          ) : null}

          <form className="auth-form" action="/api/airwallex/checkout" method="get">
            <input type="hidden" name="tier" value="INSIDER" />
            <label htmlFor="checkout-email" className="auth-form__label">
              Email for your membership
            </label>
            <input
              id="checkout-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@company.com"
              className="auth-form__input"
            />
            <button type="submit" className="auth-form__btn">
              Continue to payment →
            </button>
          </form>

          <p className="auth-fineprint">
            Already a member?{" "}
            <Link href="/login" style={{ color: "var(--gold)" }}>
              Sign in
            </Link>{" "}
            instead.
          </p>
        </section>
      </main>
    </>
  );
}
