/** Done For You Coaching — 30 Day Challenge + 1 hour/week with Ben */

export const DFY_MONTHLY_USD = 599;
export const DFY_MONTHLY_STRIKE_USD = 1000;
export const DFY_YEARLY_USD = 4997;
export const DFY_YEARLY_STRIKE_USD = 9997;
export const DFY_LAUNCH_SPOTS = 5;

export type DfyBillingPlan = "monthly" | "yearly";

export function dfyPlanLabel(plan: DfyBillingPlan): string {
  return plan === "yearly" ? "$4,997 / year" : "$599 / month";
}

export function externalDfyCheckoutUrl(plan: DfyBillingPlan): string | null {
  const url =
    plan === "yearly"
      ? process.env.AIRWALLEX_CHECKOUT_DFY_YEARLY_URL?.trim()
      : process.env.AIRWALLEX_CHECKOUT_DFY_MONTHLY_URL?.trim();
  return url || null;
}

/** @deprecated use DFY_* names */
export const DWY_MONTHLY_USD = DFY_MONTHLY_USD;
export const DWY_YEARLY_USD = DFY_YEARLY_USD;
export type DwyBillingPlan = DfyBillingPlan;
export const dwyPlanLabel = dfyPlanLabel;
export const externalDwyCheckoutUrl = externalDfyCheckoutUrl;
