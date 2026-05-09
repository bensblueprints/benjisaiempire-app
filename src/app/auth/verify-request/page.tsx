import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Check Your Inbox",
  robots: { index: false, follow: false },
};

export default async function VerifyRequestPage() {
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

      <main id="main" className="vr-shell">
        <section className="vr-card">
          <span className="vr-eyebrow">Magic Link Dispatched</span>
          <h1 className="vr-title">Check your inbox.</h1>
          <p className="vr-lede">
            I just sent you a sign-in link. Tap it from the same browser you
            opened this page in. The link expires in about ten minutes — same
            window I&apos;d give a cold-call to commit. After that you&apos;ll
            need a fresh one.
          </p>

          <ul className="vr-checklist">
            <li>
              <span className="vr-checklist__num">01</span>Open the email from
              <em> Advanced Marketing</em>.
            </li>
            <li>
              <span className="vr-checklist__num">02</span>Tap the gold button.
              Nothing to type, no password to remember.
            </li>
            <li>
              <span className="vr-checklist__num">03</span>You&apos;ll land
              inside the portal.
            </li>
          </ul>

          <p className="vr-fineprint">
            Didn&apos;t get it?{" "}
            <Link href="/login" className="vr-fineprint__link">
              Send another →
            </Link>{" "}
            &nbsp;·&nbsp; Check spam &amp; promotions tabs.
          </p>
        </section>
      </main>

      <style>{`
        .vr-shell {
          min-height: calc(100vh - 120px);
          display: grid; place-items: center;
          padding: 4rem 1.5rem 6rem;
          background: var(--ink); color: var(--cream);
        }
        .vr-card {
          width: 100%; max-width: 600px;
          border: 1px solid var(--line);
          background: var(--ink-2);
          padding: 3.25rem 2.75rem 2.75rem;
          position: relative;
        }
        .vr-card::before {
          content:""; position:absolute; inset:0 0 auto 0; height:3px;
          background: linear-gradient(90deg, var(--gold), var(--gold-bright), var(--gold));
        }
        .vr-eyebrow {
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; letter-spacing:.22em; text-transform:uppercase;
          color: var(--gold); display:block; margin-bottom:1.25rem;
        }
        .vr-title {
          font-family:'Anton',sans-serif;
          font-size: clamp(2.6rem, 6vw, 4rem);
          line-height:.92; letter-spacing:-.01em; text-transform:uppercase;
          color: var(--cream); margin: 0 0 1.25rem;
        }
        .vr-lede {
          font-family:'Fraunces',serif; font-style:italic;
          font-size:1.1rem; line-height:1.55;
          color: var(--cream-soft); margin: 0 0 2rem;
        }
        .vr-checklist {
          list-style:none; padding:0; margin:0 0 2rem;
          border-top:1px solid var(--line);
        }
        .vr-checklist li {
          display:flex; align-items:baseline; gap:1rem;
          padding: 1rem 0; border-bottom:1px solid var(--line);
          font-family:'Manrope',sans-serif; color: var(--cream);
          font-size:.95rem; line-height:1.5;
        }
        .vr-checklist li em { color: var(--gold); font-style:normal; }
        .vr-checklist__num {
          font-family:'JetBrains Mono',monospace;
          color: var(--gold); font-size:.7rem; letter-spacing:.18em;
          flex-shrink:0;
        }
        .vr-fineprint {
          font-family:'JetBrains Mono',monospace;
          font-size:.72rem; letter-spacing:.1em; text-transform:uppercase;
          color: var(--cream-soft); margin:0;
        }
        .vr-fineprint__link { color: var(--gold); }
        .vr-fineprint__link:hover { color: var(--gold-bright); }
        .shell-topbar--bare { border-bottom: 1px solid var(--line); }
      `}</style>
    </>
  );
}
