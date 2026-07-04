import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 1. Initialize Supabase client and refresh session
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  const { pathname } = request.nextUrl;

  // 2. Auth protection for /dashboard and /admin routes
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      // Redirect to sign-in if not authenticated
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

    // Fetch user role from database to verify admin access
    // We can do an API check or verify metadata if encoded in JWT
    const userRole = user.user_metadata?.role;
    if (userRole !== "admin") {
      // Forbidden: redirect to dashboard
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Multi-tenant Subdomain Resolution
  const hostname = request.headers.get("host") || "";

  // Define root/app domains to identify if it's a tenant subdomain request
  const rootDomains = ["localhost:3000", "consultflow.ai", "ctonew.app"];
  let matchedRootDomain = "";

  for (const domain of rootDomains) {
    if (hostname.endsWith(domain)) {
      matchedRootDomain = domain;
      break;
    }
  }

  // If we are on the main domain or cannot match root domain, proceed normally
  if (!matchedRootDomain || hostname === matchedRootDomain) {
    return response;
  }

  // Extract subdomain (e.g. "barber" from "barber.consultflow.ai")
  const subdomain = hostname.replace(`.${matchedRootDomain}`, "");

  // If subdomain is 'www' or empty, it's the root site
  if (subdomain === "www" || !subdomain) {
    return response;
  }

  // Skip rewriting for static files, next internals, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return response;
  }

  // Rewrite /xyz to /org/[slug]/xyz
  const url = request.nextUrl.clone();
  url.pathname = `/org/${subdomain}${pathname}`;
  
  // Return rewritten response while preserving cookies
  const rewrittenResponse = NextResponse.rewrite(url);
  
  // Copy all cookies from the modified response to the rewritten response
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

// Config to specify matching routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
