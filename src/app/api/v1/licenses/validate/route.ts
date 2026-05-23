import { STORYBOARD_PRODUCT_ID } from "@/lib/storyboard-licensing/constants";
import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import { findLicense } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function POST(request: Request): Promise<Response> {
  let body: { key?: string; product?: string } = {};
  try {
    body = (await request.json()) as { key?: string; product?: string };
  } catch {
    return storyboardJson(request, { valid: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const key = body.key?.trim() || "";
  const product = body.product;
  if (!key || product !== STORYBOARD_PRODUCT_ID) {
    return storyboardJson(
      request,
      { valid: false, message: "Missing key or product" },
      { status: 400 },
    );
  }

  const license = await findLicense(key);
  if (!license || license.product !== STORYBOARD_PRODUCT_ID) {
    return storyboardJson(
      request,
      { valid: false, message: "Invalid license key" },
      { status: 401 },
    );
  }

  if (license.revoked) {
    return storyboardJson(
      request,
      { valid: false, message: "License revoked" },
      { status: 401 },
    );
  }

  return storyboardJson(request, {
    valid: true,
    type: license.type,
    product: license.product,
    email: license.email ?? null,
  });
}
