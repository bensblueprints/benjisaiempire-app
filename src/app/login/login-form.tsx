"use client";

import { useState, useTransition } from "react";

export function LoginForm({
  action,
  callbackUrl,
  defaultEmail = "",
}: {
  action: (fd: FormData) => Promise<void>;
  callbackUrl: string;
  defaultEmail?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    if (!email) return;
    startTransition(async () => {
      try {
        await action(fd);
        setSubmitted(email);
      } catch {
        setSubmitted(email);
      }
    });
  }

  if (submitted) {
    return (
      <div className="auth-success" role="status" aria-live="polite">
        <p className="auth-success__line">
          <strong>Check your inbox.</strong>
        </p>
        <p className="auth-success__sub">
          A magic link is on its way to <em>{submitted}</em>. Tap it from the
          same browser to sign in.
        </p>
        <button
          type="button"
          className="auth-success__retry"
          onClick={() => setSubmitted(null)}
        >
          Wrong email? Send to a different address →
        </button>

        <style>{`
          .auth-success { color: var(--cream); }
          .auth-success__line { font-family:'Anton',sans-serif; font-size:1.4rem; letter-spacing:.02em; text-transform:uppercase; margin:0 0 .5rem; }
          .auth-success__sub { font-family:'Fraunces',serif; font-style:italic; color:var(--cream-soft); margin:0 0 1.5rem; line-height:1.55; }
          .auth-success__sub em { color: var(--gold); font-style: normal; }
          .auth-success__retry { background:none; border:none; padding:0; color:var(--gold); font-family:'JetBrains Mono',monospace; font-size:.78rem; letter-spacing:.08em; text-transform:uppercase; cursor:pointer; }
          .auth-success__retry:hover { color: var(--gold-bright); }
        `}</style>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <label htmlFor="email" className="auth-form__label">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        disabled={pending}
        defaultValue={defaultEmail}
        placeholder="you@operator.com"
        className="auth-form__input"
      />
      <button type="submit" disabled={pending} className="auth-form__btn">
        {pending ? "Sending…" : "Send me the magic link →"}
      </button>

      <style>{`
        .auth-form { display: flex; flex-direction: column; gap: .65rem; }
        .auth-form__label {
          font-family: 'JetBrains Mono', monospace;
          font-size: .7rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--cream-soft);
        }
        .auth-form__input {
          background: var(--ink-3);
          color: var(--cream);
          border: 1px solid var(--line);
          padding: .95rem 1rem;
          font-family: 'Manrope', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color .2s var(--ease);
        }
        .auth-form__input:focus { border-color: var(--gold); }
        .auth-form__btn {
          margin-top: .75rem;
          background: var(--gold);
          color: var(--ink);
          border: none;
          padding: 1.05rem 1.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: .82rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s var(--ease), transform .15s var(--ease);
        }
        .auth-form__btn:hover:not(:disabled) { background: var(--gold-bright); }
        .auth-form__btn:active:not(:disabled) { transform: translateY(1px); }
        .auth-form__btn:disabled { opacity: .55; cursor: wait; }
      `}</style>
    </form>
  );
}
