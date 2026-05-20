import crypto from "crypto";

type AirwallexLoginResponse = {
  token?: string;
  expires_at?: string;
};

type TokenCache = {
  token: string;
  expiresAtMs: number;
};

let tokenCache: TokenCache | null = null;

function sandboxMode(): boolean {
  return process.env.AIRWALLEX_SANDBOX === "true";
}

export function getAirwallexBaseUrl(): string {
  return sandboxMode()
    ? "https://api-demo.airwallex.com"
    : "https://api.airwallex.com";
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[airwallex] Missing ${name}. Set it in .env when USE_AIRWALLEX=true.`,
    );
  }
  return value;
}

export const AIRWALLEX_CONFIG = {
  get clientId() {
    return requiredEnv("AIRWALLEX_CLIENT_ID");
  },
  get apiKey() {
    return requiredEnv("AIRWALLEX_API_KEY");
  },
  get webhookSecret() {
    return process.env.AIRWALLEX_WEBHOOK_SECRET ?? "";
  },
  get legalEntityId() {
    return process.env.AIRWALLEX_LEGAL_ENTITY_ID ?? "";
  },
  get paymentAccountId() {
    return process.env.AIRWALLEX_PAYMENT_ACCOUNT_ID ?? "";
  },
  get insiderPriceId() {
    return process.env.AIRWALLEX_PRICE_INSIDER ?? "";
  },
  get wholesalePriceId() {
    return process.env.AIRWALLEX_PRICE_WHOLESALE ?? "";
  },
  sandbox: sandboxMode(),
  baseUrl: getAirwallexBaseUrl(),
} as const;

export async function getAirwallexAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && now < tokenCache.expiresAtMs - 60_000) {
    return tokenCache.token;
  }

  const res = await fetch(`${getAirwallexBaseUrl()}/api/v1/authentication/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-client-id": AIRWALLEX_CONFIG.clientId,
      "x-api-key": AIRWALLEX_CONFIG.apiKey,
    },
  });

  const body = (await res.json().catch(() => ({}))) as AirwallexLoginResponse & {
    message?: string;
  };

  if (!res.ok || !body.token) {
    const detail = body.message ?? `HTTP ${res.status}`;
    throw new Error(`Airwallex authentication failed: ${detail}`);
  }

  const expiresAtMs = body.expires_at
    ? Date.parse(body.expires_at)
    : now + 30 * 60_000;

  tokenCache = { token: body.token, expiresAtMs };
  return body.token;
}

export class AirwallexApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "AirwallexApiError";
  }
}

export async function airwallexRequest<T>(
  path: string,
  init: RequestInit & { json?: unknown } = {},
): Promise<T> {
  const token = await getAirwallexAccessToken();
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    ...(init.headers as Record<string, string> | undefined),
  };

  let body: string | undefined;
  if (init.json !== undefined) {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(init.json);
  }

  const res = await fetch(`${getAirwallexBaseUrl()}${path}`, {
    ...init,
    headers,
    body: body ?? init.body,
  });

  const text = await res.text();
  const parsed = text ? (JSON.parse(text) as T & { message?: string; code?: string }) : ({} as T);

  if (!res.ok) {
    const err = parsed as { message?: string; code?: string };
    throw new AirwallexApiError(
      err.message ?? `Airwallex API ${path} failed (${res.status})`,
      res.status,
      err.code,
    );
  }

  return parsed;
}

export function verifyAirwallexWebhookSignature(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
  secret: string,
): boolean {
  if (!timestamp || !signature || !secret) return false;
  const valueToDigest = `${timestamp}${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(valueToDigest)
    .digest("hex");
  if (expected.length !== signature.length) return false;
  return crypto.timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature, "utf8"),
  );
}

export function newRequestId(): string {
  return crypto.randomUUID();
}
