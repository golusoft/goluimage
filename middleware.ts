import { NextResponse, type NextRequest } from "next/server";
import { verifyAdminToken, ADMIN_COOKIE } from "@/lib/auth";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const session = await verifyAdminToken(token);
    if (!session) {
      const url = new URL("/login", req.url);
      url.searchParams.set("from", req.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
