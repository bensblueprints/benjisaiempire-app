"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";

function initials(name: string | null | undefined, email: string): string {
  if (name?.trim()) return name.trim()[0]!.toUpperCase();
  return (email.split("@")[0]?.[0] ?? "?").toUpperCase();
}

export default function ProfilePhotoUploader({
  name: initialName,
  email,
  imageUrl,
}: {
  name: string | null;
  email: string;
  imageUrl: string | null;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayName, setDisplayName] = useState(initialName ?? "");
  const [preview, setPreview] = useState<string | null>(imageUrl);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameMessage, setNameMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [namePending, startNameTransition] = useTransition();

  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

  useEffect(() => {
    setDisplayName(initialName ?? "");
  }, [initialName]);

  const upload = useCallback(
    (file: File) => {
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file.");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      const fd = new FormData();
      fd.set("photo", file);
      startTransition(async () => {
        try {
          const res = await fetch("/api/profile/avatar", {
            method: "POST",
            body: fd,
          });
          const data = (await res.json()) as { url?: string; error?: string };
          if (!res.ok) {
            throw new Error(data.error ?? "Upload failed");
          }
          if (data.url) setPreview(data.url);
          URL.revokeObjectURL(objectUrl);
        } catch (err) {
          setPreview(imageUrl);
          URL.revokeObjectURL(objectUrl);
          setError(err instanceof Error ? err.message : "Upload failed");
        }
      });
    },
    [imageUrl],
  );

  const saveName = () => {
    setNameMessage(null);
    const trimmed = displayName.trim();
    if (!trimmed) {
      setNameMessage("Enter your name.");
      return;
    }
    startNameTransition(async () => {
      try {
        const res = await fetch("/api/profile/name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: trimmed }),
        });
        const data = (await res.json()) as { name?: string; error?: string };
        if (!res.ok) {
          throw new Error(data.error ?? "Could not save name");
        }
        if (data.name) setDisplayName(data.name);
        setNameMessage("Saved.");
      } catch (err) {
        setNameMessage(err instanceof Error ? err.message : "Could not save name");
      }
    });
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <section
      style={{
        background: "var(--ink-2)",
        border: "1px solid var(--line)",
        borderRadius: 6,
        padding: 20,
      }}
    >
      <div
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: 14,
          textTransform: "uppercase",
          color: "var(--cream)",
          letterSpacing: ".04em",
          marginBottom: 14,
        }}
      >
        Your profile
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--gold)",
            overflow: "hidden",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Anton, sans-serif",
            fontSize: 28,
            color: "var(--ink)",
          }}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              style={{ width: 72, height: 72, objectFit: "cover" }}
            />
          ) : (
            initials(displayName, email)
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <label
            htmlFor="profile-display-name"
            style={{
              display: "block",
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: ".1em",
              color: "var(--cream-soft)",
              marginBottom: 6,
            }}
          >
            Display name
          </label>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              id="profile-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              maxLength={80}
              style={{
                flex: 1,
                padding: "10px 12px",
                background: "var(--ink)",
                border: "1px solid var(--line)",
                borderRadius: 3,
                color: "var(--cream)",
                fontFamily: "Manrope, sans-serif",
                fontSize: 14,
              }}
            />
            <button
              type="button"
              onClick={saveName}
              disabled={namePending}
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".08em",
                padding: "10px 12px",
                background: "var(--gold)",
                color: "var(--ink)",
                border: "none",
                borderRadius: 3,
                cursor: namePending ? "wait" : "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {namePending ? "Saving…" : "Save"}
            </button>
          </div>
          {nameMessage && (
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                color: nameMessage === "Saved." ? "var(--gold)" : "var(--rust)",
                margin: "0 0 10px",
              }}
            >
              {nameMessage}
            </p>
          )}

          <div
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 10,
              color: "var(--cream-soft)",
              marginBottom: 12,
              wordBreak: "break-all",
            }}
          >
            {email}
          </div>

          <div
            role="button"
            tabIndex={0}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                inputRef.current?.click();
              }
            }}
            style={{
              border: `1px dashed ${dragOver ? "var(--gold)" : "var(--line)"}`,
              borderRadius: 4,
              padding: "14px 12px",
              textAlign: "center",
              cursor: isPending ? "wait" : "pointer",
              background: dragOver ? "rgba(212,175,55,.06)" : "var(--ink)",
              transition: "border-color 0.15s, background 0.15s",
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
                e.target.value = "";
              }}
            />
            <div
              style={{
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: ".1em",
                color: "var(--gold)",
              }}
            >
              {isPending ? "Uploading…" : "Drop photo here or click"}
            </div>
            <div
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 11,
                color: "var(--cream-soft)",
                marginTop: 6,
              }}
            >
              JPG, PNG, WebP · max 5 MB
            </div>
          </div>

          {error && (
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: 12,
                color: "var(--rust)",
                marginTop: 8,
              }}
            >
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
