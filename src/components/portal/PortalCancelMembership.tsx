"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  stripeCustomer: boolean;
  airwallexSubscription: boolean;
  manageHref: string;
  /** Paid tier but no Stripe/Airwallex IDs on file (e.g. manual/admin grant) */
  billingPortalOnly?: boolean;
};

export default function PortalCancelMembership({
  stripeCustomer,
  airwallexSubscription,
  manageHref,
  billingPortalOnly,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (billingPortalOnly) {
    return (
      <p className="portal-cancel-membership">
        <Link href={manageHref} className="portal-cancel-membership__link">
          Cancel membership
        </Link>
      </p>
    );
  }

  if (stripeCustomer && !airwallexSubscription) {
    return (
      <p className="portal-cancel-membership">
        <Link href="/api/stripe/portal" className="portal-cancel-membership__link">
          Cancel membership
        </Link>
      </p>
    );
  }

  if (!airwallexSubscription) return null;

  return (
    <div className="portal-cancel-membership">
      {!confirmOpen ? (
        <button
          type="button"
          className="portal-cancel-membership__link"
          onClick={() => setConfirmOpen(true)}
        >
          Cancel membership
        </button>
      ) : (
        <div className="portal-cancel-membership__confirm">
          <p className="portal-cancel-membership__hint">
            Access stays until the end of your billing period.
          </p>
          <form action="/api/airwallex/cancel" method="POST" className="portal-cancel-membership__form">
            <button type="submit" className="portal-cancel-membership__btn">
              Confirm cancel
            </button>
            <button
              type="button"
              className="portal-cancel-membership__btn portal-cancel-membership__btn--ghost"
              onClick={() => setConfirmOpen(false)}
            >
              Keep membership
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
