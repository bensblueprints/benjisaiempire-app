"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { uploadProfilePhoto } from "@/app/community/_actions";

function initials(name: string | null | undefined, email: string): string {
  if (name?.trim()) return name.trim()[0]!.toUpperCase();
  return (email.split("@")[0]?.[0] ?? "?").toUpperCase();
}

export default function ProfilePhotoUploader({
  name,
  email,
  imageUrl,
}: {
  name: string | null;
  email: string;
  imageUrl: string | null;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(imageUrl);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setPreview(imageUrl);
  }, [imageUrl]);

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
          const url = await uploadProfilePhoto(fd);
          setPreview(url);
          URL.revokeObjectURL(objectUrl);
          router.refresh();
        } catch (err) {
          setPreview(imageUrl);
          URL.revokeObjectURL(objectUrl);
          setError(err instanceof Error ? err.message : "Upload failed");
        }
      });
    },
    [imageUrl, router],
  );

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
            initials(name, email)
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              color: "var(--cream)",
              fontSize: 14,
              marginBottom: 4,
            }}
          >
            {name ?? "Member"}
          </div>
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
