import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://storyboard.benjisaiempire.com",
  "https://storyboard-batch-cropper.netlify.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

export function storyboardCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin");
  const allowOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    Vary: "Origin",
  };
}

export function storyboardJson(
  request: Request,
  body: unknown,
  init?: { status?: number },
): NextResponse {
  return NextResponse.json(body, {
    status: init?.status,
    headers: storyboardCorsHeaders(request),
  });
}

export function storyboardOptions(request: Request): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: storyboardCorsHeaders(request),
  });
}
