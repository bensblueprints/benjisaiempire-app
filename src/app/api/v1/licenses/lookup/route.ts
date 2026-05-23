import { STORYBOARD_PRODUCT_ID } from "@/lib/storyboard-licensing/constants";
import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import {
  findLatestPaidOrderByEmail,
  findLicenseByEmail,
} from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function POST(request: Request): Promise<Response> {
  let body: { email?: string; product?: string } = {};
  try {
    body = (await request.json()) as { email?: string; product?: string };
  } catch {
    return storyboardJson(request, { message: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim();
  const product = body.product || STORYBOARD_PRODUCT_ID;
  if (!email) {
    return storyboardJson(request, { message: "Email required" }, { status: 400 });
  }

  const license = await findLicenseByEmail(email, product);
  const paidOrder = await findLatestPaidOrderByEmail(email, product);
  if (!license && !paidOrder?.licenseKey) {
    return storyboardJson(
      request,
      { message: "No license found for that email yet" },
      { status: 404 },
    );
  }

  return storyboardJson(request, {
    key: license?.key || paidOrder?.licenseKey,
    product,
    email,
  });
}
