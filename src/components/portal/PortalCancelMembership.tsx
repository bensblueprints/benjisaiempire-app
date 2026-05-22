"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  /** Stripe customer — opens hosted billing portal (cancel there) */
  stripeCustomer: boolean;
  /** Airwallex — in-app cancel form */
  airwallexSubscription: boolean;
};

export default function PortalCancelMembership({
  stripeCustomer,
  airwallexSubscription,
}: Props) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!stripeCustomer && !airwallexSubscription) return null;

  if (stripeCustomer && !airwallexSubscription) {
    return (
      <p className="portal-cancel-membership">
        <Link href="/api/stripe/portal" className="portal-cancel-membership__link">
          Cancel membership
        </Link>
      </p>
    );
  }

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
