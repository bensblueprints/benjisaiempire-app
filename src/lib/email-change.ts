import { createHmac, timingSafeEqual } from "crypto";
import { normalizeCheckoutEmail } from "@/lib/checkout-user";

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

function secret(): string {
  const key = process.env.AUTH_SECRET;
  if (!key) throw new Error("AUTH_SECRET is required for email change tokens");
  return key;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function normalizeMemberEmail(raw: string): string | null {
  return normalizeCheckoutEmail(raw);
}

/** Signed token: userId + newEmail + expiry */
export function createEmailChangeToken(userId: string, newEmail: string): string {
  const normalized = normalizeMemberEmail(newEmail);
  if (!normalized) throw new Error("Invalid email address");

  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${userId}:${normalized}:${exp}`;
  const sig = sign(payload);
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifyEmailChangeToken(
  token: string,
): { userId: string; newEmail: string } | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon < 0) return null;

    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);
    const expected = sign(payload);

    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

    const parts = payload.split(":");
    if (parts.length < 3) return null;
    const exp = Number(parts[parts.length - 1]);
    const userId = parts[0]!;
    const newEmail = parts.slice(1, -1).join(":");
    if (!userId || !newEmail || !Number.isFinite(exp)) return null;
    if (Date.now() > exp) return null;
    if (!normalizeMemberEmail(newEmail)) return null;

    return { userId, newEmail: normalizeMemberEmail(newEmail)! };
  } catch {
    return null;
  }
}
