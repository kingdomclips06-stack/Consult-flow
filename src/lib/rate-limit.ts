// Rate limiting utilities using Vercel KV
// These are ready to use when KV is configured in the environment.

/**
 * Check if a request should be rate limited.
 * Returns true if the request is allowed, false if rate limited.
 */
export async function checkRateLimit(
  identifier: string,
  limit: number = 10,
  windowSeconds: number = 60
): Promise<{ allowed: boolean; remaining: number; reset: number }> {
  // If KV is not configured, allow all requests
  if (!process.env.KV_URL || !process.env.KV_REST_API_URL) {
    return { allowed: true, remaining: limit, reset: 0 };
  }

  try {
    const { ratelimit } = await import("@vercel/edge-rate-limit");
    const { result } = await ratelimit({
      key: identifier,
      limit,
      window: windowSeconds * 1000, // milliseconds
    });

    return {
      allowed: result.allowed,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch {
    // Fail open if KV is unavailable
    return { allowed: true, remaining: limit, reset: 0 };
  }
}