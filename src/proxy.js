// Bellow line is not necessary on Next 16 as it is automatic
// export const runtime = 'nodejs'

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import db from "./lib/dbsetup";


export async function proxy(request) {
    
    const token = await getToken({req:request})
    

    const {pathname} = request.nextUrl

    const protectedPaths = ["/chat"]
    const adminPaths = ["/debug/db"]

    const isProtected = protectedPaths.some((path) => pathname.startsWith(path))
    const isAdminRoute = adminPaths.some((path) => pathname.startsWith(path))
    const loginUrl = new URL("/login", request.url)
    
    if (isProtected && !token) {
        console.log("Unauthenticated access to protected route: ", pathname)

        loginUrl.searchParams.set("callbackUrl", request.url)

        return NextResponse.redirect(loginUrl)
    }

    if (isAdminRoute) {
        if (!token) {
            console.log("Unauthenticated access to admin route:", pathname)

            loginUrl.searchParams.set("callbackUrl", request.url)
            return NextResponse.redirect(loginUrl)
        }

        if(token.is_admin !== 1) {
            console.log("Unauthorized access - not an admin", token?.email)
            const unauthorizedUrl = new URL("/", request.url)

            unauthorizedUrl.searchParams.set("error", "unauthorized")
            return NextResponse.redirect(unauthorizedUrl)
        }
    }

    return NextResponse.next()

}

export const config = {
    // The path* is a wildcard for any sub path within that path
    matcher: ["/chat/:path*", "/debug/db/:path*"]
}