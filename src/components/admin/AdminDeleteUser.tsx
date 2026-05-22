"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import TripleWarningGate from "@/components/shared/TripleWarningGate";
import { deleteUserAccount } from "@/app/admin/_actions";

type Props = {
  userId: string;
  userEmail: string;
  currentAdminId: string;
};

export default function AdminDeleteUser({ userId, userEmail, currentAdminId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  if (userId === currentAdminId) {
    return (
      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "var(--cream-soft)" }}>
        You cannot delete your own admin account while signed in.
      </p>
    );
  }

  return (
    <section
      style={{
        marginTop: 40,
        padding: 24,
        background: "var(--ink-2)",
        border: "1px solid var(--rust)",
        borderRadius: 6,
      }}
    >
      <h2
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: 22,
          textTransform: "uppercase",
          color: "var(--rust)",
          marginBottom: 12,
          letterSpacing: ".02em",
        }}
      >
        Danger zone
      </h2>
      <p
        style={{
          fontFamily: "Manrope, sans-serif",
          fontSize: 14,
          color: "var(--cream-soft)",
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        Permanently delete <strong style={{ color: "var(--cream)" }}>{userEmail}</strong> from the
        empire database. Stripe/Airwallex billing may still need to be canceled separately in the
        payment dashboard.
      </p>

      {!open ? (
        <button
          type="button"
          onClick={() => {
            setError(null);
            setOpen(true);
          }}
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: ".1em",
            padding: "10px 16px",
            background: "transparent",
            color: "var(--rust)",
            border: "1px solid var(--rust)",
            borderRadius: 3,
            cursor: "pointer",
          }}
        >
          Delete user account
        </button>
      ) : (
        <>
          <TripleWarningGate
            title="Delete user — triple confirmation required"
            warnings={[
              `This permanently removes ${userEmail} — progress, community posts, RSVPs, and profile data are deleted.`,
              "If they had Insider, their GoHighLevel sub-account is not auto-closed by this button — cancel GHL separately if needed.",
              "This action cannot be undone. There is no restore from the admin panel.",
            ]}
            checks={[
              "I understand this user will be permanently deleted from the database.",
              "I understand their GoHighLevel account is separate and may still be active.",
              "I have verified this is the correct email and not a paying member I should keep.",
            ]}
            confirmPhrase="DELETE"
            confirmLabel="Delete user permanently"
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              startTransition(async () => {
                setError(null);
                try {
                  await deleteUserAccount(userId, "DELETE");
                  router.push("/admin/students");
                  router.refresh();
                } catch (err) {
                  setError(err instanceof Error ? err.message : "Delete failed");
                  setOpen(false);
                }
              });
            }}
            pending={pending}
          />
          {error ? (
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: 13, color: "var(--rust)", marginTop: 12 }}>
              {error}
            </p>
          ) : null}
        </>
      )}
    </section>
  );
}
