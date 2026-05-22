"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Student = {
  id: string;
  email: string;
  name: string | null;
  role: "USER" | "ADMIN";
  tier: "FREE" | "INSIDER" | "WHOLESALE" | "DONE_WITH_YOU";
  stripeSubscriptionId: string | null;
  subscriptionStatus: string | null;
  createdAt: string;
};

const tierColors: Record<string, string> = {
  FREE: "var(--cream-soft)",
  INSIDER: "var(--gold)",
  WHOLESALE: "var(--gold-bright)",
  DONE_WITH_YOU: "var(--gold-bright)",
};

function pill(text: string, color: string, border?: string): React.ReactNode {
  return (
    <span
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: ".1em",
        padding: "3px 7px",
        borderRadius: 2,
        color,
        border: `1px solid ${border ?? color}`,
        background: "transparent",
      }}
    >
      {text}
    </span>
  );
}

export default function StudentsTable({ students }: { students: Student[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return students;
    return students.filter((s) => s.email.toLowerCase().includes(term) || (s.name ?? "").toLowerCase().includes(term));
  }, [q, students]);

  return (
    <>
      <input
        type="text"
        placeholder="Search by email or name..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 480,
          padding: "12px 16px",
          background: "var(--ink-2)",
          border: "1px solid var(--line)",
          borderRadius: 3,
          color: "var(--cream)",
          fontFamily: "Manrope, sans-serif",
          fontSize: 14,
          marginBottom: 24,
          outline: "none",
        }}
      />

      <div style={{ background: "var(--ink-2)", border: "1px solid var(--line)", borderRadius: 6 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 90px 110px 1.2fr 1fr 100px",
            gap: 14,
            padding: "12px 24px",
            borderBottom: "1px solid var(--line)",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 10,
            color: "var(--cream-soft)",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          <div>Email</div>
          <div>Name</div>
          <div>Role</div>
          <div>Tier</div>
          <div>Stripe sub</div>
          <div>Status</div>
          <div style={{ textAlign: "right" }}>Joined</div>
        </div>

        {filtered.length === 0 && (
          <div style={{ padding: 24, color: "var(--cream-soft)", fontFamily: "Manrope, sans-serif" }}>
            No matches.
          </div>
        )}

        {filtered.map((s) => (
          <Link
            key={s.id}
            href={`/admin/students/${s.id}`}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 90px 110px 1.2fr 1fr 100px",
              gap: 14,
              padding: "14px 24px",
              borderBottom: "1px solid var(--line)",
              alignItems: "center",
              color: "var(--cream)",
              transition: "background .15s ease",
            }}
            className="admin-student-row"
          >
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "var(--cream)" }}>
              {s.email}
            </div>
            <div style={{ fontFamily: "Manrope, sans-serif", fontSize: 14, color: "var(--cream-soft)" }}>
              {s.name ?? "—"}
            </div>
            <div>
              {s.role === "ADMIN"
                ? pill("Admin", "var(--gold)")
                : pill("User", "var(--cream-soft)", "var(--line)")}
            </div>
            <div>{pill(s.tier, tierColors[s.tier] ?? "var(--cream-soft)")}</div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {s.stripeSubscriptionId ?? "—"}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)" }}>
              {s.subscriptionStatus ?? "—"}
            </div>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--cream-soft)", textAlign: "right" }}>
              {new Date(s.createdAt).toLocaleDateString()}
            </div>
          </Link>
        ))}
      </div>
      <style>{`.admin-student-row:hover { background: var(--ink-3); }`}</style>
    </>
  );
}
