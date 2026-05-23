import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { isNetlifyRuntime } from "@/lib/netlify-runtime";

const BLOB_STORE = "storyboard-licensing";
const LICENSES_KEY = "licenses.json";
const ORDERS_KEY = "orders.json";
const LOCAL_DIR = path.join(process.cwd(), ".data", "storyboard-licensing");

export type StoryboardLicense = {
  key: string;
  product: string;
  type: "purchase" | "program";
  email?: string | null;
  billingCheckoutId?: string | null;
  createdAt: string;
  revoked: boolean;
};

export type StoryboardOrder = {
  id: string;
  product: string;
  status: "pending" | "paid";
  amount: number;
  currency: string;
  billingCheckoutId?: string | null;
  checkoutUrl?: string | null;
  licenseKey?: string | null;
  email?: string | null;
  paidAt?: string | null;
  createdAt: string;
};

type LicenseFile = { licenses: StoryboardLicense[] };
type OrderFile = { orders: StoryboardOrder[] };

const DEFAULT_LICENSES: LicenseFile = {
  licenses: [
    {
      key: "SB-DEV-LOCAL-2026",
      product: "storyboard-batch-cropper",
      type: "program",
      email: "dev@local.test",
      createdAt: "2026-05-24T00:00:00.000Z",
      revoked: false,
    },
  ],
};

async function getBlobStore() {
  const { getStore } = await import("@netlify/blobs");
  const siteID = process.env.NETLIFY_SITE_ID?.trim();
  const token =
    process.env.NETLIFY_BLOBS_TOKEN?.trim() ||
    process.env.NETLIFY_AUTH_TOKEN?.trim();
  if (siteID && token) {
    return getStore({ name: BLOB_STORE, siteID, token });
  }
  return getStore(BLOB_STORE);
}

async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (isNetlifyRuntime()) {
    const store = await getBlobStore();
    const blob = await store.get(key, { type: "text" });
    if (!blob) return fallback;
    return JSON.parse(blob) as T;
  }

  await mkdir(LOCAL_DIR, { recursive: true });
  const filePath = path.join(LOCAL_DIR, key);
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    await writeFile(filePath, `${JSON.stringify(fallback, null, 2)}\n`, "utf8");
    return fallback;
  }
}

async function writeJson<T>(key: string, data: T): Promise<void> {
  const serialized = `${JSON.stringify(data, null, 2)}\n`;
  if (isNetlifyRuntime()) {
    const store = await getBlobStore();
    await store.set(key, serialized);
    return;
  }
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_DIR, key), serialized, "utf8");
}

export async function readLicenses(): Promise<LicenseFile> {
  return readJson(LICENSES_KEY, DEFAULT_LICENSES);
}

export async function writeLicenses(data: LicenseFile): Promise<void> {
  await writeJson(LICENSES_KEY, data);
}

export async function readOrders(): Promise<OrderFile> {
  return readJson(ORDERS_KEY, { orders: [] });
}

export async function writeOrders(data: OrderFile): Promise<void> {
  await writeJson(ORDERS_KEY, data);
}
