import { prisma } from "@/lib/db";

export function normalizeCheckoutEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

/** Find or create a FREE-tier user for guest checkout (tier applied after payment). */
export async function findOrCreateUserByEmail(email: string) {
  const normalized = normalizeCheckoutEmail(email);
  if (!normalized) return null;

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
  if (existing) return existing;

  return prisma.user.create({
    data: { email: normalized },
    select: {
      id: true,
      email: true,
      name: true,
      airwallexBillingCustomerId: true,
      stripeCustomerId: true,
    },
  });
}
