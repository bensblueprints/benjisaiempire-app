export const STORYBOARD_PRODUCT_ID = "storyboard-batch-cropper";
export const STORYBOARD_PRODUCT_NAME = "Storyboard Batch Cropper";
export const STORYBOARD_PRODUCT_PRICE = 9.99;
export const STORYBOARD_PRODUCT_CURRENCY = "USD";

export const STORYBOARD_APP_URL =
  process.env.NEXT_PUBLIC_STORYBOARD_APP_URL?.trim() ||
  "https://storyboard.benjisaiempire.com";

export function storyboardSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://benjisaiempire.com";
}

export function storyboardPriceId(): string {
  return (
    process.env.AIRWALLEX_PRICE_STORYBOARD?.trim() ||
    process.env.AIRWALLEX_PRICE_ID?.trim() ||
    ""
  );
}

export function isStoryboardAirwallexMock(): boolean {
  return process.env.STORYBOARD_AIRWALLEX_MOCK === "true";
}

export function isStoryboardAirwallexConfigured(): boolean {
  if (isStoryboardAirwallexMock()) return true;
  return Boolean(
    process.env.AIRWALLEX_CLIENT_ID &&
      process.env.AIRWALLEX_API_KEY &&
      process.env.AIRWALLEX_LEGAL_ENTITY_ID &&
      process.env.AIRWALLEX_PAYMENT_ACCOUNT_ID &&
      storyboardPriceId(),
  );
}
