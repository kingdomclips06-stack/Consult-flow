import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes and static files when Supabase is not configured
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";

  // If Supabase is not configured, allow public routes through, protect dashboard/admin
  if (!url || !anonKey) {
    const protectedPaths = ["/dashboard", "/admin"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
    if (isProtected) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next({
      request: { headers: request.headers },
    });
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Initialize Supabase client and refresh session
  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Get current user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Auth protection for /dashboard and /admin routes
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/sign-in";
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/sign-in";
      return NextResponse.redirect(redirectUrl);
    }

    const userRole = user.user_metadata?.role;
    if (userRole !== "admin") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Multi-tenant Subdomain Resolution
  const hostname = request.headers.get("host") || "";
  const rootDomains = ["localhost:3000", "consultflow.ai", "ctonew.app"];
  let matchedRootDomain = "";

  for (const domain of rootDomains) {
    if (hostname.endsWith(domain)) {
      matchedRootDomain = domain;
      break;
    }
  }

  if (!matchedRootDomain || hostname === matchedRootDomain) {
    return response;
  }

  const subdomain = hostname.replace(`.${matchedRootDomain}`, "");

  if (subdomain === "www" || !subdomain) {
    return response;
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return response;
  }

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = `/org/${subdomain}${pathname}`;

  const rewrittenResponse = NextResponse.rewrite(targetUrl);

  response.cookies.getAll().forEach((cookie) => {
    rewrittenResponse.cookies.set(cookie.name, cookie.value, {
      path: cookie.path,
      domain: cookie.domain,
      secure: cookie.secure,
      httpOnly: cookie.httpOnly,
      sameSite: cookie.sameSite,
      expires: cookie.expires,
      maxAge: cookie.maxAge,
    });
  });

  return rewrittenResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
