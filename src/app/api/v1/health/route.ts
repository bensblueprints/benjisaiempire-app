import {
  isStoryboardAirwallexConfigured,
  isStoryboardAirwallexMock,
} from "@/lib/storyboard-licensing/constants";
import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function GET(request: Request): Promise<Response> {
  return storyboardJson(request, {
    ok: true,
    service: "benjisaiempire-licenses",
    airwallex: isStoryboardAirwallexConfigured(),
    checkoutMode: isStoryboardAirwallexMock() ? "mock" : "billing",
  });
}
