import {
  STORYBOARD_PRODUCT_ID,
} from "@/lib/storyboard-licensing/constants";
import { isStoryboardCheckoutReady } from "@/lib/storyboard-licensing/checkout";
import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import { createStoryboardCheckout } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function POST(request: Request): Promise<Response> {
  let body: { product?: string; email?: string } = {};
  try {
    body = (await request.json()) as { product?: string; email?: string };
  } catch {
    return storyboardJson(request, { message: "Invalid JSON body" }, { status: 400 });
  }

  const product = body.product || STORYBOARD_PRODUCT_ID;
  if (product !== STORYBOARD_PRODUCT_ID) {
    return storyboardJson(request, { message: "Product not found" }, { status: 404 });
  }

  if (!isStoryboardCheckoutReady()) {
    return storyboardJson(
      request,
      { message: "Checkout is not configured yet. Add Airwallex storyboard price env vars." },
      { status: 503 },
    );
  }

  try {
    const email = body.email?.trim() || null;
    const result = await createStoryboardCheckout(email);
    return storyboardJson(request, result, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create checkout";
    return storyboardJson(request, { message }, { status: 500 });
  }
}
