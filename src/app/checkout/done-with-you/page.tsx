import type { Metadata } from "next";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import {
  DFY_LAUNCH_SPOTS,
  DFY_MONTHLY_STRIKE_USD,
  DFY_MONTHLY_USD,
  DFY_YEARLY_STRIKE_USD,
  DFY_YEARLY_USD,
} from "@/lib/done-with-you";

export const metadata: Metadata = {
  title: "Done For You Coaching — Checkout",
  description:
    "30 Day AI Website Empire Challenge with 1 hour/week live coaching. Launch pricing for the first 5 members.",
  robots: { index: false, follow: false },
};

export default async function DoneForYouCheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <>
      <Topbar />
      <main id="main" className="auth-shell">
        <section className="auth-card" style={{ maxWidth: 520 }}>
          <span className="auth-eyebrow">
            Done For You Coaching · first {DFY_LAUNCH_SPOTS} only
          </span>
          <h1 className="auth-title">Lock launch pricing</h1>
          <p className="auth-lede">
            Everything in AI Empire Insider, plus <strong>one hour with Ben every week</strong> while
            you run the 30 Day AI Website Empire Challenge (100 dials/day).
          </p>

          {params.error ? (
            <p className="auth-form__error" role="alert">
              {params.error}
            </p>
          ) : null}

          <div style={{ display: "grid", gap: 16, marginBottom: 24 }}>
            <div
              style={{
                border: "1px solid var(--gold)",
                background: "rgba(212,175,55,.06)",
                padding: "18px 20px",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: 8,
                }}
              >
                Pay yearly — best value
              </div>
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    textDecoration: "line-through",
                    color: "var(--rust)",
                    marginRight: 10,
                  }}
                >
                  ${DFY_YEARLY_STRIKE_USD.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 32,
                    color: "var(--cream)",
                  }}
                >
                  ${DFY_YEARLY_USD.toLocaleString()}
                  <span style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace" }}>
                    {" "}
                    / year
                  </span>
                </span>
              </div>
              <form className="auth-form" action="/api/airwallex/checkout" method="get" style={{ margin: 0 }}>
                <input type="hidden" name="tier" value="DONE_WITH_YOU" />
                <input type="hidden" name="plan" value="yearly" />
                <label htmlFor="checkout-email-yearly" className="auth-form__label">
                  Email
                </label>
                <input
                  id="checkout-email-yearly"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="auth-form__input"
                />
                <button type="submit" className="auth-form__btn">
                  Continue to payment — yearly →
                </button>
              </form>
            </div>

            <div
              style={{
                border: "1px solid var(--line)",
                background: "var(--ink-2)",
                padding: "18px 20px",
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "var(--cream-soft)",
                  marginBottom: 8,
                }}
              >
                Pay monthly
              </div>
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    textDecoration: "line-through",
                    color: "var(--rust)",
                    marginRight: 10,
                  }}
                >
                  ${DFY_MONTHLY_STRIKE_USD.toLocaleString()}/mo
                </span>
                <span
                  style={{
                    fontFamily: "Anton, sans-serif",
                    fontSize: 32,
                    color: "var(--cream)",
                  }}
                >
                  ${DFY_MONTHLY_USD}
                  <span style={{ fontSize: 14, fontFamily: "JetBrains Mono, monospace" }}>
                    {" "}
                    / month
                  </span>
                </span>
              </div>
              <form className="auth-form" action="/api/airwallex/checkout" method="get" style={{ margin: 0 }}>
                <input type="hidden" name="tier" value="DONE_WITH_YOU" />
                <input type="hidden" name="plan" value="monthly" />
                <label htmlFor="checkout-email-monthly" className="auth-form__label">
                  Email
                </label>
                <input
                  id="checkout-email-monthly"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@company.com"
                  className="auth-form__input"
                />
                <button
                  type="submit"
                  className="auth-form__btn"
                  style={{ background: "transparent", color: "var(--gold)", border: "1px solid var(--gold)" }}
                >
                  Continue to payment — monthly →
                </button>
              </form>
            </div>
          </div>

          <p className="auth-fineprint">
            Prefer DIY?{" "}
            <Link href="/checkout/insider" style={{ color: "var(--gold)" }}>
              AI Empire Insider — $9/mo
            </Link>
            . Already a member?{" "}
            <Link href="/login?callbackUrl=/portal" style={{ color: "var(--gold)" }}>
              Sign in
            </Link>
            .
          </p>
        </section>
      </main>
    </>
  );
}
