"use client";

import { useState } from "react";
import { checkoutApiPath } from "@/lib/payments";

type Tier = "INSIDER" | "WHOLESALE";

export function GuestCheckoutForm({
  tier,
  title,
  priceLabel,
  submitLabel,
}: {
  tier: Tier;
  title: string;
  priceLabel: string;
  submitLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(checkoutApiPath(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email: email.trim() }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Checkout failed (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <span className="auth-eyebrow">Checkout · {priceLabel}</span>
      <h1 className="auth-title">{title}</h1>
      <p className="auth-lede">
        Enter your email, pay on the secure checkout page, then we&apos;ll create your
        account and send a magic link to sign in — no password required.
      </p>

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <label htmlFor="checkout-email" className="auth-form__label">
          Email for your account
        </label>
        <input
          id="checkout-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={loading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@operator.com"
          className="auth-form__input"
        />
        <button type="submit" disabled={loading} className="auth-form__btn">
          {loading ? "Redirecting to checkout…" : submitLabel}
        </button>
        {error ? (
          <p className="auth-form__error" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <p className="auth-fineprint">
        Already a member?{" "}
        <a href="/login" style={{ color: "var(--gold)" }}>
          Sign in
        </a>{" "}
        instead.
      </p>

      <style>{`
        .auth-form__error {
          margin: 0;
          font-size: 0.85rem;
          color: #f87171;
        }
      `}</style>
    </section>
  );
}
