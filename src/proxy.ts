import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./components/services/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;

  const pathName = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === "admin";
    isTutor = data.user.role === "tutor";
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdmin && pathName.startsWith("/student-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (isAdmin && pathName.startsWith("/tutor-dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (!isAdmin && isTutor && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  }

  if (!isAdmin && isTutor && pathName.startsWith("/student-dashboard")) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  }

  if (!isAdmin && !isTutor && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/student-dashboard", request.url));
  }
  if (!isAdmin && !isTutor && pathName.startsWith("/tutor-dashboard")) {
    return NextResponse.redirect(new URL("/student-dashboard", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/booking/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/student-dashboard",
    "/student-dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
