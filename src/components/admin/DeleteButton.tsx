"use client";

import { useState, useTransition } from "react";

export default function DeleteButton({
  onConfirm,
  label = "Delete",
  message,
}: {
  onConfirm: () => Promise<void>;
  label?: string;
  message?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [armed, setArmed] = useState(false);

  function handleClick() {
    if (!armed) {
      setArmed(true);
      setTimeout(() => setArmed(false), 4000);
      return;
    }
    if (message && !confirm(message)) {
      setArmed(false);
      return;
    }
    startTransition(async () => {
      try {
        await onConfirm();
      } catch (e) {
        // server may throw a redirect — that's fine
        if (e instanceof Error && e.message !== "NEXT_REDIRECT") {
          alert(`Delete failed: ${e.message}`);
        }
      }
      setArmed(false);
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 11,
        textTransform: "uppercase",
        letterSpacing: ".08em",
        padding: "6px 12px",
        borderRadius: 2,
        border: armed ? "1px solid var(--rust)" : "1px solid var(--line)",
        background: armed ? "var(--rust)" : "transparent",
        color: armed ? "var(--cream)" : "var(--cream-soft)",
        opacity: isPending ? 0.5 : 1,
        cursor: isPending ? "wait" : "pointer",
        transition: "all .15s ease",
      }}
    >
      {isPending ? "..." : armed ? "Confirm?" : label}
    </button>
  );
}
