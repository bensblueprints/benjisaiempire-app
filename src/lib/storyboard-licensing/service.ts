import crypto from "crypto";
import {
  createStoryboardBillingCheckout,
  createStoryboardOrderId,
  retrieveStoryboardBillingCheckout,
} from "@/lib/storyboard-licensing/checkout";
import {
  STORYBOARD_PRODUCT_CURRENCY,
  STORYBOARD_PRODUCT_ID,
  STORYBOARD_PRODUCT_NAME,
  STORYBOARD_PRODUCT_PRICE,
  isStoryboardAirwallexMock,
  storyboardSiteUrl,
} from "@/lib/storyboard-licensing/constants";
import {
  readLicenses,
  readOrders,
  writeLicenses,
  writeOrders,
  type StoryboardLicense,
  type StoryboardOrder,
} from "@/lib/storyboard-licensing/store";

function normalizeKey(key: string): string {
  return key.trim().toUpperCase();
}

function generateLicenseKey(): string {
  const chunk = () => crypto.randomBytes(2).toString("hex").toUpperCase();
  return `SB-${chunk()}-${chunk()}-${chunk()}`;
}

export async function findLicense(key: string): Promise<StoryboardLicense | null> {
  const normalized = normalizeKey(key);
  const data = await readLicenses();
  return (
    data.licenses.find((entry) => normalizeKey(entry.key) === normalized) ?? null
  );
}

export async function findLicenseByEmail(
  email: string,
  product = STORYBOARD_PRODUCT_ID,
): Promise<StoryboardLicense | null> {
  const normalized = email.trim().toLowerCase();
  const data = await readLicenses();
  return (
    [...data.licenses]
      .reverse()
      .find(
        (entry) =>
          entry.product === product &&
          entry.type === "purchase" &&
          !entry.revoked &&
          entry.email?.toLowerCase() === normalized,
      ) ?? null
  );
}

async function issuePurchaseLicense(
  email: string,
  billingCheckoutId?: string | null,
): Promise<string> {
  const existing = await findLicenseByEmail(email);
  if (existing) return existing.key;

  const key = generateLicenseKey();
  const data = await readLicenses();
  data.licenses.push({
    key,
    product: STORYBOARD_PRODUCT_ID,
    type: "purchase",
    email,
    billingCheckoutId: billingCheckoutId ?? null,
    createdAt: new Date().toISOString(),
    revoked: false,
  });
  await writeLicenses(data);
  return key;
}

export async function findOrder(orderId: string): Promise<StoryboardOrder | null> {
  const data = await readOrders();
  return data.orders.find((entry) => entry.id === orderId) ?? null;
}

export async function findOrderByBillingCheckoutId(
  billingCheckoutId: string,
): Promise<StoryboardOrder | null> {
  const data = await readOrders();
  return (
    data.orders.find((entry) => entry.billingCheckoutId === billingCheckoutId) ??
    null
  );
}

export async function findLatestPaidOrderByEmail(
  email: string,
  product = STORYBOARD_PRODUCT_ID,
): Promise<StoryboardOrder | null> {
  const normalized = email.trim().toLowerCase();
  const data = await readOrders();
  return (
    [...data.orders]
      .reverse()
      .find(
        (entry) =>
          entry.product === product &&
          entry.status === "paid" &&
          entry.email?.toLowerCase() === normalized &&
          entry.licenseKey,
      ) ?? null
  );
}

export async function createOrder(order: StoryboardOrder): Promise<StoryboardOrder> {
  const data = await readOrders();
  data.orders.push(order);
  await writeOrders(data);
  return order;
}

export async function updateOrder(
  orderId: string,
  patch: Partial<StoryboardOrder>,
): Promise<StoryboardOrder | null> {
  const data = await readOrders();
  const index = data.orders.findIndex((entry) => entry.id === orderId);
  if (index < 0) return null;
  data.orders[index] = { ...data.orders[index], ...patch };
  await writeOrders(data);
  return data.orders[index];
}

export async function completePaidOrder(
  order: StoryboardOrder,
  email: string | null,
  billingCheckoutId?: string | null,
): Promise<StoryboardOrder> {
  if (order.status === "paid" && order.licenseKey) return order;

  const resolvedEmail =
    email || order.email || `buyer+${order.id}@checkout.airwallex`;
  const licenseKey = await issuePurchaseLicense(resolvedEmail, billingCheckoutId);
  const updated = await updateOrder(order.id, {
    status: "paid",
    email: resolvedEmail,
    licenseKey,
    paidAt: new Date().toISOString(),
    billingCheckoutId: billingCheckoutId || order.billingCheckoutId,
  });
  return updated ?? { ...order, status: "paid", email: resolvedEmail, licenseKey };
}

type BillingCheckoutEvent = {
  id?: string;
  metadata?: Record<string, string>;
  customer_data?: { email?: string };
  customer?: { email?: string };
};

export async function handleStoryboardBillingCheckoutCompleted(
  checkout: BillingCheckoutEvent,
): Promise<void> {
  const metadata = checkout.metadata ?? {};
  if (metadata.product && metadata.product !== STORYBOARD_PRODUCT_ID) return;

  const billingCheckoutId = checkout.id;
  const order =
    (metadata.orderId ? await findOrder(metadata.orderId) : null) ||
    (billingCheckoutId
      ? await findOrderByBillingCheckoutId(billingCheckoutId)
      : null);

  if (!order || order.status === "paid") return;

  const email =
    checkout.customer_data?.email ||
    checkout.customer?.email ||
    metadata.email ||
    order.email ||
    null;

  await completePaidOrder(order, email, billingCheckoutId);
}

export async function createStoryboardCheckout(email?: string | null) {
  const orderId = createStoryboardOrderId();
  const siteUrl = storyboardSiteUrl();
  const successUrl = `${siteUrl}/software/purchase-success.html?order=${encodeURIComponent(orderId)}`;
  const backUrl = `${siteUrl}/software/storyboard-batch-cropper.html`;

  const checkout = await createStoryboardBillingCheckout({
    reference: orderId,
    successUrl,
    backUrl,
    email,
    title: `${STORYBOARD_PRODUCT_NAME} — one-time license`,
    metadata: {
      orderId,
      product: STORYBOARD_PRODUCT_ID,
      ...(email ? { email } : {}),
    },
  });

  if (!checkout.url) {
    throw new Error("Airwallex did not return a checkout URL");
  }

  await createOrder({
    id: orderId,
    product: STORYBOARD_PRODUCT_ID,
    status: "pending",
    amount: STORYBOARD_PRODUCT_PRICE,
    currency: STORYBOARD_PRODUCT_CURRENCY,
    billingCheckoutId: checkout.id ?? null,
    checkoutUrl: checkout.url,
    licenseKey: null,
    email: email ?? null,
    createdAt: new Date().toISOString(),
  });

  return { orderId, checkoutUrl: checkout.url, provider: "airwallex" as const };
}

export async function getStoryboardOrderStatus(
  orderId: string,
  mock?: boolean,
) {
  let order = await findOrder(orderId);
  if (!order) return null;

  if (order.status !== "paid" && order.billingCheckoutId && !isStoryboardAirwallexMock()) {
    try {
      const checkout = await retrieveStoryboardBillingCheckout(order.billingCheckoutId);
      if (checkout.status === "COMPLETED" && !order.licenseKey) {
        const email =
          checkout.customer_data?.email ||
          checkout.customer?.email ||
          order.email ||
          `buyer+${order.id}@checkout.airwallex`;
        order = await completePaidOrder(order, email, order.billingCheckoutId);
      }
    } catch {
      // webhook may still complete the order
    }
  }

  if (isStoryboardAirwallexMock() && mock && order.status !== "paid") {
    const email = order.email || `buyer+${order.id}@checkout.airwallex`;
    order = await completePaidOrder(order, email, order.billingCheckoutId);
  }

  return order;
}

export async function createProgramLicense(email: string) {
  const key = generateLicenseKey();
  const data = await readLicenses();
  data.licenses.push({
    key,
    product: STORYBOARD_PRODUCT_ID,
    type: "program",
    email,
    createdAt: new Date().toISOString(),
    revoked: false,
  });
  await writeLicenses(data);
  return { key, product: STORYBOARD_PRODUCT_ID, type: "program" as const, email };
}

export function getStoryboardProduct() {
  return {
    id: STORYBOARD_PRODUCT_ID,
    name: STORYBOARD_PRODUCT_NAME,
    price: STORYBOARD_PRODUCT_PRICE,
    priceCents: Math.round(STORYBOARD_PRODUCT_PRICE * 100),
    priceLabel: "$9.99",
    currency: STORYBOARD_PRODUCT_CURRENCY,
    description:
      "Section storyboard sheets, crop panels, export scenes, and generate fal.ai image-to-video clips with per-scene prompts and reference images.",
    purchaseUrl: "/software/storyboard-batch-cropper.html",
    successUrl: "/software/purchase-success.html",
    checkoutProvider: "airwallex",
    appUrl: process.env.NEXT_PUBLIC_STORYBOARD_APP_URL ?? "https://storyboard.benjisaiempire.com",
  };
}
