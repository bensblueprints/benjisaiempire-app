import crypto from "crypto";
import {
  AIRWALLEX_CONFIG,
  airwallexRequest,
  newRequestId,
} from "@/lib/airwallex";
import {
  isStoryboardAirwallexConfigured,
  isStoryboardAirwallexMock,
  storyboardPriceId,
} from "@/lib/storyboard-licensing/constants";

type BillingCheckoutCreateResponse = {
  id?: string;
  url?: string;
  status?: string;
  customer_data?: { email?: string };
  customer?: { email?: string };
};

export async function createStoryboardBillingCheckout(payload: {
  reference: string;
  successUrl: string;
  backUrl: string;
  email?: string | null;
  title?: string;
  metadata: Record<string, string>;
}): Promise<BillingCheckoutCreateResponse> {
  if (isStoryboardAirwallexMock()) {
    const separator = payload.successUrl.includes("?") ? "&" : "?";
    return {
      id: `bc_mock_${payload.reference}`,
      url: `${payload.successUrl}${separator}order=${encodeURIComponent(payload.reference)}&mock=1`,
      status: "ACTIVE",
    };
  }

  const priceId = storyboardPriceId();
  if (!priceId || !AIRWALLEX_CONFIG.legalEntityId || !AIRWALLEX_CONFIG.paymentAccountId) {
    throw new Error(
      "Storyboard checkout requires AIRWALLEX_PRICE_STORYBOARD, AIRWALLEX_LEGAL_ENTITY_ID, and AIRWALLEX_PAYMENT_ACCOUNT_ID.",
    );
  }

  const body: Record<string, unknown> = {
    request_id: newRequestId(),
    mode: "PAYMENT",
    legal_entity_id: AIRWALLEX_CONFIG.legalEntityId,
    linked_payment_account_id: AIRWALLEX_CONFIG.paymentAccountId,
    success_url: payload.successUrl,
    back_url: payload.backUrl,
    line_items: [{ price_id: priceId, quantity: 1 }],
    metadata: payload.metadata,
    invoice_data: {
      memo: payload.title || "Storyboard Batch Cropper license",
      metadata: payload.metadata,
    },
  };

  if (payload.email) {
    body.customer_data = { email: payload.email };
  }

  return airwallexRequest<BillingCheckoutCreateResponse>(
    "/api/v1/billing_checkouts/create",
    { method: "POST", json: body },
  );
}

export async function retrieveStoryboardBillingCheckout(checkoutId: string) {
  if (isStoryboardAirwallexMock()) {
    return { id: checkoutId, status: "ACTIVE" as const };
  }
  return airwallexRequest<BillingCheckoutCreateResponse>(
    `/api/v1/billing_checkouts/${checkoutId}`,
    { method: "GET" },
  );
}

export function createStoryboardOrderId(): string {
  return `ord_${crypto.randomBytes(8).toString("hex")}`;
}

export function isStoryboardCheckoutReady(): boolean {
  return isStoryboardAirwallexConfigured();
}
