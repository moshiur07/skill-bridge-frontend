import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { userService } from "./components/services/user.service";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  let isAuthenticated = false;
  let isAdmin = false;

  const pathName = request.url;
  console.log(request.url);
  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role == "ADMIN";
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdmin && pathName.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }

  if (!isAdmin && pathName.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
