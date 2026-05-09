import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign-In Error",
  robots: { index: false, follow: false },
};

const ERROR_COPY: Record<string, { title: string; lede: string }> = {
  Verification: {
    title: "This link expired.",
    lede: "Magic links live for about ten minutes — long enough to act, short enough to stay safe. Grab a fresh one and try again.",
  },
  AccessDenied: {
    title: "This link was already used.",
    lede: "Magic links are single-use. If you&apos;ve already signed in on another device, just head to the portal. Otherwise, request a new link.",
  },
  Configuration: {
    title: "Something on my end broke.",
    lede: "Auth config is misbehaving. Try again in a minute — if it keeps failing, drop me a line at ben@advancedmarketing.co.",
  },
  Default: {
    title: "Something went wrong.",
    lede: "I couldn&apos;t verify that sign-in attempt. Could be a stale link, could be a hiccup. Try sending a fresh one.",
  },
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorKey = params.error ?? "Default";
  const copy = ERROR_COPY[errorKey] ?? ERROR_COPY.Default;

  return (
    <>
      <header className="shell-topbar shell-topbar--bare" data-shell="topbar">
        <div className="shell-topbar__inner" style={{ justifyContent: "center" }}>
          <Link
            href="/"
            className="shell-topbar__brand"
            aria-label="Benji's AI Empire — home"
            style={{ textAlign: "center" }}
          >
            <span className="shell-topbar__brand-name">Benji&apos;s AI Empire</span>
            <span className="shell-topbar__brand-sub">
              Issue 01 &nbsp;·&nbsp; May 2026
            </span>
          </Link>
        </div>
      </header>

      <main id="main" className="err-shell">
        <section className="err-card">
          <span className="err-eyebrow">Sign-In · Failed</span>
          <h1 className="err-title">{copy.title}</h1>
          <p
            className="err-lede"
            dangerouslySetInnerHTML={{ __html: copy.lede }}
          />

          <div className="err-actions">
            <Link href="/login" className="err-cta">
              Send a fresh link →
            </Link>
            <Link href="/" className="err-ghost">
              Back to homepage
            </Link>
          </div>

          <p className="err-meta">
            <span>Code:</span> <code>{errorKey}</code>
          </p>
        </section>
      </main>

      <style>{`
        .err-shell {
          min-height: calc(100vh - 120px);
          display:grid; place-items:center;
          padding: 4rem 1.5rem 6rem;
          background: var(--ink); color: var(--cream);
        }
        .err-card {
          width:100%; max-width:600px;
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 3.25rem 2.75rem 2.75rem;
          position: relative;
        }
        .err-card::before {
          content:""; position:absolute; inset:0 0 auto 0; height:3px;
          background: var(--rust);
        }
        .err-eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; letter-spacing:.22em; text-transform:uppercase;
          color: var(--rust); display:block; margin-bottom:1.25rem;
        }
        .err-title {
          font-family:'Anton',sans-serif;
          font-size: clamp(2.4rem, 5.5vw, 3.6rem);
          line-height:.94; letter-spacing:-.01em; text-transform:uppercase;
          color: var(--cream); margin: 0 0 1.25rem;
        }
        .err-lede {
          font-family:'Fraunces',serif; font-style:italic;
          font-size:1.075rem; line-height:1.55;
          color: var(--cream-soft); margin: 0 0 2.25rem;
        }
        .err-actions {
          display:flex; gap:1.5rem; align-items:center; flex-wrap:wrap;
          padding-top:1.5rem; border-top:1px solid var(--line);
        }
        .err-cta {
          background: var(--gold); color: var(--ink);
          font-family:'JetBrains Mono',monospace;
          font-size:.82rem; letter-spacing:.14em; text-transform:uppercase;
          font-weight:600; padding: 1rem 1.4rem;
          transition: background .2s var(--ease);
        }
        .err-cta:hover { background: var(--gold-bright); }
        .err-ghost {
          font-family:'JetBrains Mono',monospace;
          font-size:.78rem; letter-spacing:.14em; text-transform:uppercase;
          color: var(--cream-soft); border-bottom:1px solid var(--line);
          padding-bottom: .25rem;
        }
        .err-ghost:hover { color: var(--cream); border-color: var(--gold); }
        .err-meta {
          margin-top:2rem;
          font-family:'JetBrains Mono',monospace;
          font-size:.7rem; letter-spacing:.1em; text-transform:uppercase;
          color: var(--cream-soft);
        }
        .err-meta code { color: var(--gold); }
        .shell-topbar--bare { border-bottom: 1px solid var(--line); }
      `}</style>
    </>
  );
}
