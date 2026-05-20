import type { Metadata } from "next";
import Link from "next/link";
import { GuestCheckoutForm } from "@/components/GuestCheckoutForm";

export const metadata: Metadata = {
  title: "Join AI Empire Insider — Checkout",
  description: "Start your $9/mo Insider membership. Pay first, then get your account and magic link.",
  robots: { index: false, follow: false },
};

export default function InsiderCheckoutPage() {
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
        <GuestCheckoutForm
          tier="INSIDER"
          title="Join Insider — $9/mo"
          priceLabel="$9 / month"
          submitLabel="Continue to payment →"
        />
      </main>
    </>
  );
}
