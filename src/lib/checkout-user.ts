import { prisma } from "@/lib/db";

export function normalizeCheckoutEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

export function normalizeCheckoutName(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const name = raw.trim().replace(/\s+/g, " ");
  if (!name || name.length < 2) return null;
  return name.slice(0, 80);
}

/** Find or create a FREE-tier user for guest checkout (tier applied after payment). */
export async function findOrCreateUserByEmail(
  email: string,
  name?: string | null,
) {
  const normalized = normalizeCheckoutEmail(email);
  if (!normalized) return null;
  const displayName = normalizeCheckoutName(name);

  const existing = await prisma.user.findUnique({
    where: { email: normalized },
    select: {
      id: true,
      email: true,
      name: true,
      airwallexBillingCustomerId: true,
      stripeCustomerId: true,
    },
  });
  if (existing) {
    if (displayName && !existing.name) {
      return prisma.user.update({
        where: { id: existing.id },
        data: { name: displayName },
        select: {
          id: true,
          email: true,
          name: true,
          airwallexBillingCustomerId: true,
          stripeCustomerId: true,
        },
      });
    }
    return existing;
  }

  return prisma.user.create({
    data: { email: normalized, ...(displayName ? { name: displayName } : {}) },
    select: {
      id: true,
      email: true,
      name: true,
      airwallexBillingCustomerId: true,
      stripeCustomerId: true,
    },
  });
}
