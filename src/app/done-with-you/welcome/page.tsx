import type { Metadata } from "next";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Done For You Coaching — You're In",
  description:
    "Welcome to Done For You Coaching. Book your first weekly hour with Ben and start the 30 Day Challenge.",
  robots: { index: false, follow: true },
};

export default function DoneForYouWelcomePage() {
  return (
    <>
      <Topbar />
      <main id="main" className="auth-shell" style={{ paddingBottom: 80 }}>
        <section className="auth-card" style={{ maxWidth: 640, textAlign: "center" }}>
          <span className="auth-eyebrow">Done For You Coaching · Activated</span>
          <h1 className="auth-title">You&apos;re in — let&apos;s build.</h1>
          <p className="auth-lede">
            Payment confirmed. You have full Insider access plus{" "}
            <strong>one hour with Ben every week</strong> on Zoom while you run the 30 Day AI
            Website Empire Challenge.
          </p>

          <ol
            style={{
              textAlign: "left",
              margin: "32px 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 20,
            }}
          >
            <li>
              <strong style={{ color: "var(--gold)" }}>1.</strong> Check your inbox for the
              community invite and calendar link for your first coaching slot.
            </li>
            <li>
              <strong style={{ color: "var(--gold)" }}>2.</strong> Open the{" "}
              <Link href="/learn/30-day-ai-website-empire-challenge" style={{ color: "var(--gold)" }}>
                30 Day Challenge
              </Link>{" "}
              — start Module 1 today and log 100 dials.
            </li>
            <li>
              <strong style={{ color: "var(--gold)" }}>3.</strong> Bring your pipeline, offer, and
              scripts to the first call — we tune the machine together.
            </li>
          </ol>

          <Link href="/portal" className="auth-form__btn" style={{ display: "inline-block" }}>
            Go to your portal →
          </Link>

          <p className="auth-fineprint" style={{ marginTop: 24 }}>
            Questions? Reply to your receipt email or message Ben in the community.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
