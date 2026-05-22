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
  const [newEmail, setNewEmail] = useState("");
  const [emailMessage, setEmailMessage] = useState<string | null>(null);
  const [emailMessageOk, setEmailMessageOk] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [namePending, startNameTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

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

  const requestEmailChange = () => {
    setEmailMessage(null);
    setEmailMessageOk(false);
    const trimmed = newEmail.trim();
    if (!trimmed) {
      setEmailMessage("Enter your new email.");
      return;
    }
    startEmailTransition(async () => {
      try {
        const res = await fetch("/api/profile/email/request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
        const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
        if (!res.ok) {
          throw new Error(data.error ?? "Could not send confirmation");
        }
        setEmailMessage(data.message ?? "Confirmation link sent. Check your inbox.");
        setEmailMessageOk(true);
        setNewEmail("");
      } catch (err) {
        setEmailMessageOk(false);
        setEmailMessage(err instanceof Error ? err.message : "Could not send confirmation");
      }
    });
  };

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
    <section className="profile-card">
      <h2 className="profile-card__title">Your profile</h2>

      <div className="profile-card__avatar-row">
        <div className="profile-card__avatar">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" />
          ) : (
            initials(displayName, email)
          )}
        </div>
      </div>

      <div className="profile-card__fields">
        <div className="profile-card__group">
          <label htmlFor="profile-display-name" className="profile-card__label">
            Display name
          </label>
          <input
            id="profile-display-name"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
            maxLength={80}
            className="profile-card__input"
          />
          <button
            type="button"
            onClick={saveName}
            disabled={namePending}
            className="profile-card__btn profile-card__btn--primary"
          >
            {namePending ? "Saving…" : "Save name"}
          </button>
          {nameMessage ? (
            <p
              className={`profile-card__hint ${nameMessage === "Saved." ? "profile-card__hint--ok" : "profile-card__hint--err"}`}
            >
              {nameMessage}
            </p>
          ) : null}
        </div>

        <div className="profile-card__group">
          <span className="profile-card__label">Login email</span>
          <p className="profile-card__email">{email}</p>
        </div>

        <div className="profile-card__group">
          <label htmlFor="profile-new-email" className="profile-card__label">
            Change email
          </label>
          <input
            id="profile-new-email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="new@email.com"
            autoComplete="email"
            className="profile-card__input"
          />
          <button
            type="button"
            onClick={requestEmailChange}
            disabled={emailPending}
            className="profile-card__btn profile-card__btn--ghost"
          >
            {emailPending ? "Sending…" : "Send confirmation link"}
          </button>
          <p className="profile-card__hint profile-card__hint--muted">
            We email your <strong>new</strong> address. After you confirm, sign in with that email.
          </p>
          {emailMessage ? (
            <p
              className={`profile-card__hint ${emailMessageOk ? "profile-card__hint--ok" : "profile-card__hint--err"}`}
            >
              {emailMessage}
            </p>
          ) : null}
        </div>

        <div className="profile-card__group">
          <span className="profile-card__label">Profile photo</span>
          <div
            role="button"
            tabIndex={0}
            className={`profile-card__drop ${dragOver ? "profile-card__drop--active" : ""}`}
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
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="profile-card__file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) upload(file);
                e.target.value = "";
              }}
            />
            <span className="profile-card__drop-title">
              {isPending ? "Uploading…" : "Drop photo or tap to upload"}
            </span>
            <span className="profile-card__drop-sub">JPG, PNG, WebP · max 5 MB</span>
          </div>
          {error ? <p className="profile-card__hint profile-card__hint--err">{error}</p> : null}
        </div>
      </div>

      <style>{`
        .profile-card {
          background: var(--ink-2);
          border: 1px solid var(--line);
          border-radius: 6px;
          padding: 1.25rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow: hidden;
        }
        .profile-card__title {
          font-family: Anton, sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          text-transform: uppercase;
          color: var(--cream);
          letter-spacing: 0.04em;
          margin: 0 0 1rem;
        }
        .profile-card__avatar-row {
          display: flex;
          justify-content: center;
          margin-bottom: 1.25rem;
        }
        .profile-card__avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--gold);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: Anton, sans-serif;
          font-size: 1.75rem;
          color: var(--ink);
          flex-shrink: 0;
        }
        .profile-card__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-card__fields {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          min-width: 0;
        }
        .profile-card__group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 0;
        }
        .profile-card__label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--cream-soft);
        }
        .profile-card__input {
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          padding: 0.65rem 0.75rem;
          background: var(--ink);
          border: 1px solid var(--line);
          border-radius: 3px;
          color: var(--cream);
          font-family: Manrope, sans-serif;
          font-size: 0.9rem;
          min-width: 0;
        }
        .profile-card__input:focus {
          outline: none;
          border-color: var(--gold);
        }
        .profile-card__email {
          margin: 0;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.72rem;
          color: var(--cream);
          word-break: break-all;
          line-height: 1.45;
        }
        .profile-card__btn {
          width: 100%;
          box-sizing: border-box;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.7rem 0.85rem;
          border-radius: 3px;
          cursor: pointer;
          border: 1px solid transparent;
        }
        .profile-card__btn:disabled {
          opacity: 0.6;
          cursor: wait;
        }
        .profile-card__btn--primary {
          background: var(--gold);
          color: var(--ink);
          border-color: var(--gold);
          font-weight: 600;
        }
        .profile-card__btn--primary:hover:not(:disabled) {
          background: var(--gold-bright, var(--gold));
        }
        .profile-card__btn--ghost {
          background: transparent;
          color: var(--gold);
          border-color: var(--gold);
        }
        .profile-card__btn--ghost:hover:not(:disabled) {
          background: rgba(212, 175, 55, 0.08);
        }
        .profile-card__hint {
          margin: 0;
          font-family: Manrope, sans-serif;
          font-size: 0.75rem;
          line-height: 1.45;
        }
        .profile-card__hint--muted {
          color: var(--cream-soft);
        }
        .profile-card__hint--muted strong {
          color: var(--cream);
          font-weight: 600;
        }
        .profile-card__hint--ok {
          color: var(--gold);
        }
        .profile-card__hint--err {
          color: var(--rust);
        }
        .profile-card__drop {
          border: 1px dashed var(--line);
          border-radius: 4px;
          padding: 1rem 0.75rem;
          text-align: center;
          cursor: pointer;
          background: var(--ink);
          transition: border-color 0.15s, background 0.15s;
        }
        .profile-card__drop--active {
          border-color: var(--gold);
          background: rgba(212, 175, 55, 0.06);
        }
        .profile-card__file {
          display: none;
        }
        .profile-card__drop-title {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gold);
        }
        .profile-card__drop-sub {
          display: block;
          margin-top: 0.35rem;
          font-family: Manrope, sans-serif;
          font-size: 0.68rem;
          color: var(--cream-soft);
        }
      `}</style>
    </section>
  );
}
