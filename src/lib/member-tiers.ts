import type { Tier, UserRole } from "@prisma/client";

/** Tiers that unlock courses, community posting, and Insider downloads. */
export const COURSE_ACCESS_TIERS: Tier[] = ["INSIDER", "WHOLESALE", "DONE_WITH_YOU"];

export function isPaidMember(tier: Tier): boolean {
  return COURSE_ACCESS_TIERS.includes(tier);
}

export function canAccessLearn(tier: Tier, role: UserRole): boolean {
  return role === "ADMIN" || isPaidMember(tier);
}

export function canAccessCommunityPost(tier: Tier, role: UserRole): boolean {
  return role === "ADMIN" || isPaidMember(tier);
}

export function downloadTierWhere(
  userTier: Tier,
  isAdmin: boolean,
): { in: Tier[] } | Tier | undefined {
  if (isAdmin) return undefined;
  if (userTier === "WHOLESALE") {
    return { in: ["FREE", "INSIDER", "WHOLESALE", "DONE_WITH_YOU"] as Tier[] };
  }
  if (userTier === "DONE_WITH_YOU" || userTier === "INSIDER") {
    return { in: ["FREE", "INSIDER", "DONE_WITH_YOU"] as Tier[] };
  }
  return "FREE";
}

export function meetsDownloadTier(userTier: Tier, role: UserRole, required: Tier): boolean {
  if (role === "ADMIN") return true;
  if (required === "FREE") return true;
  if (required === "INSIDER") {
    return userTier === "INSIDER" || userTier === "DONE_WITH_YOU" || userTier === "WHOLESALE";
  }
  if (required === "DONE_WITH_YOU") {
    return userTier === "DONE_WITH_YOU" || userTier === "WHOLESALE";
  }
  if (required === "WHOLESALE") return userTier === "WHOLESALE";
  return false;
}
