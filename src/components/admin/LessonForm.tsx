"use client";

import { useState } from "react";

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
  width: "100%",
  padding: "11px 14px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 15,
  outline: "none",
};

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export type LessonFormFields = {
  title: string;
  slug: string;
  videoUrl: string;
  durationMinutes: number | null;
  sortOrder: number;
  published: boolean;
};

export default function LessonForm({
  fields,
  onChange,
}: {
  fields: LessonFormFields;
  onChange: (next: LessonFormFields) => void;
}) {
  const [slugTouched, setSlugTouched] = useState(!!fields.slug);

  function set<K extends keyof LessonFormFields>(key: K, value: LessonFormFields[K]) {
    onChange({ ...fields, [key]: value });
  }

  function onTitle(v: string) {
    if (!slugTouched) onChange({ ...fields, title: v, slug: slugify(v) });
    else set("title", v);
  }

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            style={inputStyle}
            value={fields.title}
            onChange={(e) => onTitle(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <input
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
            value={fields.slug}
            onChange={(e) => { setSlugTouched(true); set("slug", e.target.value); }}
          />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Video URL (YouTube / Vimeo / Mux)</label>
        <input
          style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}
          value={fields.videoUrl}
          onChange={(e) => set("videoUrl", e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18 }}>
        <div>
          <label style={labelStyle}>Duration (min)</label>
          <input
            type="number"
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
            value={fields.durationMinutes ?? ""}
            onChange={(e) => set("durationMinutes", e.target.value === "" ? null : Number(e.target.value))}
          />
        </div>
        <div>
          <label style={labelStyle}>Sort order</label>
          <input
            type="number"
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
            value={fields.sortOrder}
            onChange={(e) => set("sortOrder", Number(e.target.value))}
          />
        </div>
        <div>
          <label style={labelStyle}>Published</label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 0" }}>
            <input
              type="checkbox"
              checked={fields.published}
              onChange={(e) => set("published", e.target.checked)}
              style={{ width: 18, height: 18, accentColor: "var(--gold)" }}
            />
            <span style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)" }}>
              {fields.published ? "Live" : "Hidden"}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
