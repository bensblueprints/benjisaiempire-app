"use client";

import { useRef, useState, useTransition } from "react";
import TripleWarningGate from "@/components/shared/TripleWarningGate";

const MEMBERSHIP_WARNINGS: [string, string, string] = [
  "Canceling ends your paid membership. Course access, downloads, and community posting stop when your billing period ends (or immediately if you choose instant cancel).",
  "Canceling also shuts down your GoHighLevel sub-account — pipeline, contacts, dialer, tasks, and automations included with Insider.",
  "GoHighLevel data may not be recoverable after cancellation. Export anything you need from GHL before you confirm.",
];

const MEMBERSHIP_CHECKS: [string, string, string] = [
  "I understand my AI Empire membership will end.",
  "I understand my GoHighLevel sub-account will be canceled too.",
  "I have exported anything I need from GoHighLevel.",
];

type Props = {
  stripeCustomer: boolean;
  airwallexSubscription: boolean;
  manageHref: string;
  billingPortalOnly?: boolean;
};

export default function PortalCancelMembership({
  stripeCustomer,
  airwallexSubscription,
  manageHref,
  billingPortalOnly,
}: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const redirectTo = (url: string) => {
    startTransition(() => {
      window.location.href = url;
    });
  };

  const submitAirwallexCancel = () => {
    formRef.current?.requestSubmit();
  };

  if (!stripeCustomer && !airwallexSubscription && !billingPortalOnly) return null;

  return (
    <div className="portal-cancel-membership">
      {!open ? (
        <button
          type="button"
          className="portal-cancel-membership__link"
          onClick={() => setOpen(true)}
        >
          Cancel membership
        </button>
      ) : (
        <>
          <TripleWarningGate
            title="Cancel membership — read all three warnings"
            warnings={MEMBERSHIP_WARNINGS}
            checks={MEMBERSHIP_CHECKS}
            confirmPhrase="CANCEL"
            confirmLabel={
              stripeCustomer && !airwallexSubscription
                ? "Open billing to cancel"
                : "Confirm cancel membership"
            }
            onCancel={() => setOpen(false)}
            onConfirm={() => {
              if (stripeCustomer && !airwallexSubscription) {
                redirectTo("/api/stripe/portal");
                return;
              }
              if (billingPortalOnly) {
                redirectTo(manageHref);
                return;
              }
              submitAirwallexCancel();
            }}
            pending={pending}
          />
          {airwallexSubscription && (
            <form
              ref={formRef}
              action="/api/airwallex/cancel"
              method="POST"
              className="portal-cancel-membership__hidden-form"
            />
          )}
        </>
      )}

      <style>{`
        .portal-cancel-membership { margin-top: 1.25rem; padding-top: 0.75rem; border-top: 1px solid var(--line); }
        .portal-cancel-membership__link {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--cream-soft);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .portal-cancel-membership__link:hover { color: var(--rust); }
        .portal-cancel-membership__hidden-form { display: none; }
      `}</style>
    </div>
  );
}

/** Immediate cancel (billing section) — same triple warning, posts with immediate=1 */
export function PortalCancelImmediately() {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="portal-cancel-immediate">
      {!open ? (
        <button
          type="button"
          className="portal-billing-inline-form__btn"
          onClick={() => setOpen(true)}
        >
          Cancel immediately
        </button>
      ) : (
        <div style={{ marginTop: "0.75rem" }}>
          <TripleWarningGate
            title="Immediate cancel — membership and GHL end now"
            warnings={[
              "Instant cancel ends membership access right away — not at period end.",
              "Your GoHighLevel sub-account is canceled immediately — pipeline, contacts, and dialer shut off.",
              "This cannot be undone from the portal. Contact support only if billing was a mistake.",
            ]}
            checks={MEMBERSHIP_CHECKS}
            confirmPhrase="CANCEL"
            confirmLabel="Cancel membership immediately"
            onCancel={() => setOpen(false)}
            onConfirm={() => formRef.current?.requestSubmit()}
          />
          <form ref={formRef} action="/api/airwallex/cancel" method="POST" style={{ display: "none" }}>
            <input type="hidden" name="immediate" value="1" />
          </form>
        </div>
      )}
    </div>
  );
}
