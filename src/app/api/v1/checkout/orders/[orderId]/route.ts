import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import { getStoryboardOrderStatus } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function GET(
  request: Request,
  context: { params: Promise<{ orderId: string }> },
): Promise<Response> {
  const { orderId } = await context.params;
  const mock = new URL(request.url).searchParams.get("mock") === "1";
  const order = await getStoryboardOrderStatus(orderId, mock);

  if (!order) {
    return storyboardJson(request, { message: "Order not found" }, { status: 404 });
  }

  return storyboardJson(request, {
    orderId: order.id,
    status: order.status,
    licenseKey: order.licenseKey,
    product: order.product,
    email: order.email,
  });
}
