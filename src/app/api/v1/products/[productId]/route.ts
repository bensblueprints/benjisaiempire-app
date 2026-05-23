import { STORYBOARD_PRODUCT_ID } from "@/lib/storyboard-licensing/constants";
import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import { getStoryboardProduct } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ productId: string }> },
): Promise<Response> {
  const { productId } = await context.params;
  if (productId !== STORYBOARD_PRODUCT_ID) {
    return storyboardJson(request, { message: "Product not found" }, { status: 404 });
  }
  return storyboardJson(request, getStoryboardProduct());
}
