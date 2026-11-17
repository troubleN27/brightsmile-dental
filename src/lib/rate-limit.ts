/**
 * Simple in-memory sliding-window rate limiter.
 *
 * Counters live in the memory of one server instance, so on serverless hosting
 * each instance counts separately and counters reset on cold starts. That is
 * enough to stop casual spam; for stricter limits under real load, swap this
 * for a shared store such as Redis / Upstash.
 */

const hits = new Map<string, number[]>();
let lastCleanup = Date.now();

type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

/** Records a hit for `key` and returns false once the limit is exceeded. */
export function checkRateLimit(key: string, { limit, windowMs }: RateLimitOptions) {
  const now = Date.now();
  const windowStart = now - windowMs;

  // Drop stale keys from time to time so the map does not grow forever
  if (now - lastCleanup > windowMs) {
    for (const [storedKey, times] of hits) {
      if (times.every((time) => time <= windowStart)) hits.delete(storedKey);
    }
    lastCleanup = now;
  }

  const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return false;
  }

  recent.push(now);
  hits.set(key, recent);
  return true;
}
