"use client";

import { useMemo, useState } from "react";

type Props = {
  title: string;
  warnings: [string, string, string];
  checks: [string, string, string];
  confirmPhrase: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  pending?: boolean;
};

export default function TripleWarningGate({
  title,
  warnings,
  checks,
  confirmPhrase,
  confirmLabel,
  cancelLabel = "Go back",
  onConfirm,
  onCancel,
  pending = false,
}: Props) {
  const [ack, setAck] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [typed, setTyped] = useState("");

  const allChecked = ack.every(Boolean);
  const phraseOk = typed.trim().toUpperCase() === confirmPhrase.toUpperCase();
  const canConfirm = allChecked && phraseOk && !pending;

  const toggle = (index: 0 | 1 | 2) => {
    setAck((prev) => {
      const next = [...prev] as [boolean, boolean, boolean];
      next[index] = !next[index];
      return next;
    });
  };

  const reset = () => {
    setAck([false, false, false]);
    setTyped("");
    onCancel();
  };

  const hint = useMemo(
    () => `Type ${confirmPhrase} to enable the button below.`,
    [confirmPhrase],
  );

  return (
    <div className="triple-warn" role="alertdialog" aria-labelledby="triple-warn-title">
      <p id="triple-warn-title" className="triple-warn__title">
        {title}
      </p>

      <ol className="triple-warn__list">
        {warnings.map((text, i) => (
          <li key={i} className="triple-warn__item">
            <span className="triple-warn__num">{i + 1}</span>
            <span>{text}</span>
          </li>
        ))}
      </ol>

      <div className="triple-warn__checks">
        {checks.map((label, i) => (
          <label key={i} className="triple-warn__check">
            <input
              type="checkbox"
              checked={ack[i]}
              onChange={() => toggle(i as 0 | 1 | 2)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      <label className="triple-warn__type-label" htmlFor="triple-warn-confirm">
        {hint}
      </label>
      <input
        id="triple-warn-confirm"
        type="text"
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        placeholder={confirmPhrase}
        className="triple-warn__input"
        autoComplete="off"
      />

      <div className="triple-warn__actions">
        <button
          type="button"
          className="triple-warn__btn triple-warn__btn--danger"
          disabled={!canConfirm}
          onClick={onConfirm}
        >
          {pending ? "Working…" : confirmLabel}
        </button>
        <button type="button" className="triple-warn__btn triple-warn__btn--ghost" onClick={reset}>
          {cancelLabel}
        </button>
      </div>

      <style>{`
        .triple-warn {
          margin-top: 0.5rem;
          padding: 1rem;
          border: 1px solid var(--rust);
          border-radius: 4px;
          background: rgba(180, 60, 50, 0.08);
          max-width: 100%;
          box-sizing: border-box;
        }
        .triple-warn__title {
          font-family: Anton, sans-serif;
          font-size: 0.95rem;
          text-transform: uppercase;
          color: var(--rust);
          margin: 0 0 0.75rem;
          letter-spacing: 0.03em;
        }
        .triple-warn__list {
          margin: 0 0 1rem;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .triple-warn__item {
          display: flex;
          gap: 0.6rem;
          align-items: flex-start;
          font-family: Manrope, sans-serif;
          font-size: 0.82rem;
          line-height: 1.45;
          color: var(--cream);
        }
        .triple-warn__num {
          flex-shrink: 0;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--rust);
          border: 1px solid var(--rust);
          width: 1.25rem;
          height: 1.25rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }
        .triple-warn__checks {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }
        .triple-warn__check {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          font-family: Manrope, sans-serif;
          font-size: 0.78rem;
          color: var(--cream-soft);
          cursor: pointer;
        }
        .triple-warn__check input {
          margin-top: 0.15rem;
          accent-color: var(--rust);
        }
        .triple-warn__type-label {
          display: block;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.62rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--cream-soft);
          margin-bottom: 0.35rem;
        }
        .triple-warn__input {
          width: 100%;
          box-sizing: border-box;
          padding: 0.55rem 0.65rem;
          margin-bottom: 0.85rem;
          background: var(--ink);
          border: 1px solid var(--line);
          border-radius: 3px;
          color: var(--cream);
          font-family: "JetBrains Mono", monospace;
          font-size: 0.8rem;
        }
        .triple-warn__actions {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .triple-warn__btn {
          width: 100%;
          box-sizing: border-box;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 0.65rem 0.85rem;
          border-radius: 3px;
          cursor: pointer;
          border: 1px solid var(--line);
        }
        .triple-warn__btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
        .triple-warn__btn--danger {
          background: var(--rust);
          border-color: var(--rust);
          color: var(--cream);
          font-weight: 600;
        }
        .triple-warn__btn--danger:hover:not(:disabled) {
          filter: brightness(1.08);
        }
        .triple-warn__btn--ghost {
          background: transparent;
          color: var(--cream-soft);
        }
      `}</style>
    </div>
  );
}
