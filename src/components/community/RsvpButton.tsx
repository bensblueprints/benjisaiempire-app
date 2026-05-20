"use client";

import { useTransition } from "react";
import { toggleRsvp } from "@/app/community/_actions";

interface Props {
  eventId: string;
  rsvped: boolean;
}

export default function RsvpButton({ eventId, rsvped }: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => startTransition(() => toggleRsvp(eventId))}
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: ".1em",
        padding: "8px 14px",
        background: rsvped ? "rgba(212,175,55,.15)" : "none",
        color: rsvped ? "var(--gold)" : "var(--cream-soft)",
        border: rsvped ? "1px solid var(--gold)" : "1px solid var(--line)",
        borderRadius: 3,
        cursor: "pointer",
        opacity: pending ? 0.6 : 1,
        whiteSpace: "nowrap",
        transition: "all 0.15s",
      }}
    >
      {rsvped ? "✓ Going" : "RSVP"}
    </button>
  );
}
