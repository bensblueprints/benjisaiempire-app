"use client";

import { useState } from "react";

type Tier = "INSIDER" | "WHOLESALE";

interface UpgradeButtonProps {
  tier: Tier;
  label: string;
  className?: string;
  /** If the user is already on the right tier, render this fallback instead. */
  alreadyActive?: boolean;
}

export default function UpgradeButton({
  tier,
  label,
  className,
  alreadyActive = false,
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
        redirectTo?: string;
      };

      if (res.status === 401 && data.redirectTo) {
        // Send them to login with a return-to so they come back to upgrade.
        const next = `/login?next=${encodeURIComponent("/portal")}`;
        window.location.href = next;
        return;
      }
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? `Checkout failed (HTTP ${res.status})`);
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (alreadyActive) {
    return (
      <span
        className={
          className ??
          "inline-flex items-center justify-center rounded-md border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-900"
        }
      >
        Active
      </span>
    );
  }

  return (
    <div className="inline-flex flex-col items-stretch gap-1">
      <button
        type="button"
        onClick={go}
        disabled={loading}
        className={
          className ??
          "inline-flex items-center justify-center rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        }
      >
        {loading ? "Redirecting…" : label}
      </button>
      {error ? (
        <span className="text-xs text-red-600" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}
