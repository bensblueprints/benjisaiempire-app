"use client";

import { useState, useTransition } from "react";

type Props = {
  lessonId: string;
  initialCompleted: boolean;
};

export default function MarkCompleteButton({ lessonId, initialCompleted }: Props) {
  const [completed, setCompleted] = useState(initialCompleted);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function toggle() {
    const next = !completed;
    setCompleted(next); // optimistic
    setError(null);

    startTransition(async () => {
      try {
        const res = await fetch("/api/progress/mark", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ lessonId, completed: next }),
        });
        if (!res.ok) {
          throw new Error(`Request failed (${res.status})`);
        }
      } catch (e: unknown) {
        // rollback
        setCompleted(!next);
        setError(e instanceof Error ? e.message : "Could not save progress");
      }
    });
  }

  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    padding: "14px 22px",
    borderRadius: 1,
    cursor: isPending ? "progress" : "pointer",
    transition: "background .2s ease, color .2s ease, border-color .2s ease, transform .15s ease",
    border: "1px solid var(--gold)",
  };

  const filled: React.CSSProperties = {
    ...base,
    background: "var(--gold)",
    color: "var(--ink)",
  };

  const outlined: React.CSSProperties = {
    ...base,
    background: "transparent",
    color: "var(--gold)",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <button
        type="button"
        onClick={toggle}
        disabled={isPending}
        aria-pressed={completed}
        style={completed ? outlined : filled}
      >
        <span aria-hidden="true">{completed ? "✓" : "○"}</span>
        <span>{completed ? "Completed" : "Mark Complete"}</span>
      </button>
      {error && (
        <span
          role="alert"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "var(--rust)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}
