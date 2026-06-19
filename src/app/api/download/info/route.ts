import { NextResponse } from "next/server";
import {
  detectPlatform,
  getInfo,
  DownloadError,
  PLATFORM_LABEL,
} from "@/lib/social-download";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function POST(req: Request) {
  let url: string | undefined;
  try {
    ({ url } = await req.json());
  } catch {
    return NextResponse.json({ error: "Send { url }." }, { status: 400 });
  }
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Paste a link first." }, { status: 400 });
  }

  const platform = detectPlatform(url);
  if (!platform) {
    return NextResponse.json(
      { error: "I can grab YouTube, Instagram, and Facebook Reels. That link isn't one of those." },
      { status: 400 }
    );
  }

  try {
    const info = await getInfo(url, platform);
    return NextResponse.json({ ...info, platformLabel: PLATFORM_LABEL[platform] });
  } catch (err) {
    const message =
      err instanceof DownloadError ? err.message : "Couldn't read that video.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
