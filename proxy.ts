import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuth = !!token
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")
  const isHome = request.nextUrl.pathname === "/"

  if (isDashboard && !isAuth) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (isHome && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
}
