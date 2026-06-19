import { NextResponse } from "next/server";
import { Readable } from "node:stream";
import {
  detectPlatform,
  download,
  createReadStream,
  DownloadError,
} from "@/lib/social-download";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

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

  let file;
  try {
    file = await download(url, platform);
  } catch (err) {
    const message =
      err instanceof DownloadError ? err.message : "Download failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const nodeStream = createReadStream(file.filePath);
  nodeStream.on("close", file.cleanup);
  nodeStream.on("error", file.cleanup);

  // RFC 5987 encoding so unicode titles survive the header.
  const asciiName = file.fileName.replace(/[^\x20-\x7E]/g, "_").replace(/"/g, "");
  const encoded = encodeURIComponent(file.fileName);

  return new Response(Readable.toWeb(nodeStream) as ReadableStream, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Length": String(file.size),
      "Content-Disposition": `attachment; filename="${asciiName}"; filename*=UTF-8''${encoded}`,
      "Cache-Control": "no-store",
    },
  });
}
