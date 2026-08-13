import { NextResponse } from "next/server";

interface RateLimitTracker {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitTracker>();

/**
 * Lightweight in-memory rate limiter for Next.js API routes.
 * @param ip Client IP address or identifier
 * @param limit Max allowed requests within window
 * @param windowMs Window duration in milliseconds (default: 60s)
 */
export function checkRateLimit(
  identifier: string,
  limit = 20,
  windowMs = 60 * 1000
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const tracker = rateLimitMap.get(identifier);

  // Memory hygiene: prune expired rate limit entries if map grows large
  if (rateLimitMap.size > 500) {
    for (const [key, item] of rateLimitMap.entries()) {
      if (now > item.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  // Clean up expired entry or set initial
  if (!tracker || now > tracker.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }

  if (tracker.count >= limit) {
    return { success: false, remaining: 0, reset: tracker.resetTime };
  }

  tracker.count += 1;
  return { success: true, remaining: limit - tracker.count, reset: tracker.resetTime };
}

export function rateLimitResponse(reset: number) {
  const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000);
  return NextResponse.json(
    { error: "Too many requests. Please wait before trying again.", retryAfterSeconds },
    { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
  );
}
