import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import userService from "./lib/service/user.service";
// import { UserRole } from "./lib/models/user.model";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const auth = cookies().get("authorization")?.value;
  if (!!auth) {
    const { payload } = await userService.verifyJWT(auth || "");
    if (payload.role === "ADMIN") {
      return null;
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*",
};
