import type { Metadata } from "next";
import Link from "next/link";
import { GuestCheckoutForm } from "@/components/GuestCheckoutForm";

export const metadata: Metadata = {
  title: "Wholesale GHL — Checkout",
  description: "Start your $49/mo Wholesale GHL membership. Pay first, then get your account and magic link.",
  robots: { index: false, follow: false },
};

export default function FoundersCheckoutPage() {
  return (
    <>
      <header className="shell-topbar shell-topbar--bare" data-shell="topbar">
        <div className="shell-topbar__inner" style={{ justifyContent: "center" }}>
          <Link
            href="/founders/"
            className="shell-topbar__brand"
            aria-label="Back to Wholesale GHL"
            style={{ textAlign: "center" }}
          >
            <span className="shell-topbar__brand-name">Benji&apos;s AI Empire</span>
            <span className="shell-topbar__brand-sub">Wholesale GHL · $49/mo</span>
          </Link>
        </div>
      </header>

      <main id="main" className="auth-shell">
        <GuestCheckoutForm
          tier="WHOLESALE"
          title="Wholesale GHL — $49/mo"
          priceLabel="$49 / month"
          submitLabel="Continue to payment →"
        />
      </main>
    </>
  );
}
