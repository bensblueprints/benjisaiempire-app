"use client";

import { useState, useTransition } from "react";

export type CourseFormData = {
  id?: string;
  title: string;
  slug: string;
  subtitle: string | null;
  description: string | null;
  heroImage: string | null;
  sortOrder: number;
  published: boolean;
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
  padding: "12px 14px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 15,
  outline: "none",
};

export default function CourseForm({
  course,
  action,
}: {
  course?: CourseFormData;
  action: (formData: FormData) => Promise<void>;
}) {
  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!course?.slug);
  const [isPending, startTransition] = useTransition();

  function onTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
    if (!slugTouched) setSlug(slugify(e.target.value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(fd);
      } catch (err) {
        if (err instanceof Error && err.message !== "NEXT_REDIRECT") {
          alert(`Save failed: ${err.message}`);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 22 }}>
        <div>
          <label style={labelStyle} htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            value={title}
            onChange={onTitle}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="slug">Slug</label>
          <input
            id="slug"
            name="slug"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugTouched(true); }}
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
            placeholder="auto-generated"
          />
        </div>
      </div>

      <div>
        <label style={labelStyle} htmlFor="subtitle">Subtitle</label>
        <input
          id="subtitle"
          name="subtitle"
          defaultValue={course?.subtitle ?? ""}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle} htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={course?.description ?? ""}
          rows={4}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 22 }}>
        <div>
          <label style={labelStyle} htmlFor="heroImage">Hero image (URL or /images/...)</label>
          <input
            id="heroImage"
            name="heroImage"
            defaultValue={course?.heroImage ?? ""}
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace", fontSize: 13 }}
          />
        </div>
        <div>
          <label style={labelStyle} htmlFor="sortOrder">Sort order</label>
          <input
            id="sortOrder"
            name="sortOrder"
            type="number"
            defaultValue={course?.sortOrder ?? 0}
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
          />
        </div>
        <div>
          <label style={labelStyle}>Published</label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0" }}>
            <input
              type="checkbox"
              name="published"
              defaultChecked={course?.published ?? false}
              style={{ width: 18, height: 18, accentColor: "var(--gold)" }}
            />
            <span style={{ fontFamily: "Manrope, sans-serif", color: "var(--cream)" }}>
              Visible to students
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button
          type="submit"
          disabled={isPending}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            padding: "12px 22px",
            background: "var(--gold)",
            color: "var(--ink)",
            borderRadius: 3,
            fontWeight: 600,
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Saving..." : course ? "Save course" : "Create course"}
        </button>
      </div>
    </form>
  );
}
