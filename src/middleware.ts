import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

const PROTECTED_PORTAL = ["/portal", "/learn", "/community"];
const PROTECTED_ADMIN = ["/admin"];

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth = [...PROTECTED_PORTAL, ...PROTECTED_ADMIN].some((p) => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const session = await auth();
  if (!session?.user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (PROTECTED_ADMIN.some((p) => pathname.startsWith(p)) && session.user.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/portal";
    return NextResponse.redirect(url);
  }

  // /learn requires INSIDER or WHOLESALE
  if (pathname.startsWith("/learn") && !["INSIDER", "WHOLESALE"].includes(session.user.tier) && session.user.role !== "ADMIN") {
    const url = req.nextUrl.clone();
    url.pathname = "/portal";
    url.searchParams.set("upgrade", "1");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/:path*", "/learn/:path*", "/admin/:path*", "/community/:path*"],
};
