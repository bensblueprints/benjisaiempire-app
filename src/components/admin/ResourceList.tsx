"use client";

import { useState } from "react";

export type ResourceRow = {
  id?: string;
  name: string;
  url: string;
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "JetBrains Mono, monospace",
  fontSize: 10,
  textTransform: "uppercase",
  letterSpacing: ".14em",
  color: "var(--cream-soft)",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  padding: "9px 12px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  outline: "none",
  width: "100%",
};

export default function ResourceList({
  rows,
  onChange,
}: {
  rows: ResourceRow[];
  onChange: (rows: ResourceRow[]) => void;
}) {
  const [items, setItems] = useState<ResourceRow[]>(rows);

  function update(next: ResourceRow[]) {
    setItems(next);
    onChange(next);
  }

  function setField(idx: number, key: "name" | "url", value: string) {
    const next = items.map((r, i) => (i === idx ? { ...r, [key]: value } : r));
    update(next);
  }

  function remove(idx: number) {
    update(items.filter((_, i) => i !== idx));
  }

  function add() {
    update([...items, { name: "", url: "" }]);
  }

  return (
    <div>
      <div style={labelStyle}>Resources</div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.length === 0 && (
          <div style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream-soft)", fontSize: 14, padding: "8px 0" }}>
            No resources yet.
          </div>
        )}
        {items.map((r, idx) => (
          <div key={r.id ?? `new-${idx}`} style={{ display: "grid", gridTemplateColumns: "1fr 2fr 36px", gap: 8 }}>
            <input
              style={inputStyle}
              value={r.name}
              placeholder="Display name"
              onChange={(e) => setField(idx, "name", e.target.value)}
            />
            <input
              style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}
              value={r.url}
              placeholder="https://..."
              onChange={(e) => setField(idx, "url", e.target.value)}
            />
            <button
              type="button"
              onClick={() => remove(idx)}
              style={{
                background: "transparent",
                border: "1px solid var(--line)",
                borderRadius: 3,
                color: "var(--cream-soft)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 14,
                cursor: "pointer",
              }}
              aria-label="Remove resource"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={add}
        style={{
          marginTop: 12,
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: ".1em",
          padding: "8px 14px",
          border: "1px solid var(--line)",
          background: "transparent",
          color: "var(--gold)",
          borderRadius: 3,
        }}
      >
        + Add resource
      </button>
    </div>
  );
}
