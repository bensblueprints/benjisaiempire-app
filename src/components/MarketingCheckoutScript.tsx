"use client";

import { useEffect } from "react";
import { checkoutApiPath } from "@/lib/payments";

type Tier = "INSIDER" | "WHOLESALE";

const CHECKOUT_API = checkoutApiPath();

function tierFromAnchor(anchor: HTMLAnchorElement): Tier | null {
  const dataTier = anchor.getAttribute("data-tier");
  if (dataTier === "INSIDER" || dataTier === "WHOLESALE") return dataTier;

  const href = anchor.getAttribute("href") ?? "";
  if (href.includes("insider")) return "INSIDER";
  if (href.includes("wholesale")) return "WHOLESALE";
  return null;
}

async function startCheckout(tier: Tier): Promise<void> {
  const res = await fetch(CHECKOUT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tier }),
  });
  const data = (await res.json().catch(() => ({}))) as {
    url?: string;
    error?: string;
    redirectTo?: string;
  };

  if (res.status === 401) {
    const checkoutReturn = `${CHECKOUT_API}?tier=${tier}`;
    window.location.href = `/login?callbackUrl=${encodeURIComponent(checkoutReturn)}`;
    return;
  }
  if (!res.ok || !data.url) {
    window.alert(data.error ?? `Checkout failed (HTTP ${res.status})`);
    return;
  }
  window.location.href = data.url;
}

export default function MarketingCheckoutScript() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      const isApi =
        href === CHECKOUT_API ||
        href.startsWith(`${CHECKOUT_API}?`) ||
        href === "/api/stripe/checkout" ||
        href.startsWith("/api/stripe/checkout?");
      const isLegacy = href.includes("/checkout/");
      if (!isApi && !isLegacy) return;

      const tier = tierFromAnchor(anchor);
      if (!tier) return;

      event.preventDefault();
      void startCheckout(tier);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
