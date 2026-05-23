import { storyboardJson, storyboardOptions } from "@/lib/storyboard-licensing/http";
import { createProgramLicense } from "@/lib/storyboard-licensing/service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function OPTIONS(request: Request): Promise<Response> {
  return storyboardOptions(request);
}

export async function POST(request: Request): Promise<Response> {
  let body: { email?: string } = {};
  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return storyboardJson(request, { message: "Invalid JSON body" }, { status: 400 });
  }

  const email = String(body.email || "").trim();
  if (!email) {
    return storyboardJson(request, { message: "Email required" }, { status: 400 });
  }

  const created = await createProgramLicense(email);
  return storyboardJson(request, created, { status: 201 });
}
