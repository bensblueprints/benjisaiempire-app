"use client";

import { useTransition } from "react";

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
  padding: "10px 12px",
  background: "var(--ink)",
  border: "1px solid var(--line)",
  borderRadius: 3,
  color: "var(--cream)",
  fontFamily: "Manrope, sans-serif",
  fontSize: 14,
  outline: "none",
};

export type ModuleFormData = {
  id?: string;
  title: string;
  summary: string | null;
  sortOrder: number;
};

export default function ModuleForm({
  module: mod,
  action,
  submitLabel,
  onAfterSubmit,
}: {
  module?: ModuleFormData;
  action: (formData: FormData) => Promise<void>;
  submitLabel?: string;
  onAfterSubmit?: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    startTransition(async () => {
      try {
        await action(fd);
        if (!mod) form.reset();
        onAfterSubmit?.();
      } catch (err) {
        if (err instanceof Error && err.message !== "NEXT_REDIRECT") {
          alert(`Save failed: ${err.message}`);
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            name="title"
            defaultValue={mod?.title ?? ""}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Sort order</label>
          <input
            name="sortOrder"
            type="number"
            defaultValue={mod?.sortOrder ?? 0}
            style={{ ...inputStyle, fontFamily: "JetBrains Mono, monospace" }}
          />
        </div>
      </div>
      <div>
        <label style={labelStyle}>Summary</label>
        <textarea
          name="summary"
          defaultValue={mod?.summary ?? ""}
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>
      <div>
        <button
          type="submit"
          disabled={isPending}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            padding: "10px 18px",
            background: "var(--gold)",
            color: "var(--ink)",
            borderRadius: 3,
            fontWeight: 600,
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Saving..." : submitLabel ?? (mod ? "Save module" : "Create module")}
        </button>
      </div>
    </form>
  );
}
