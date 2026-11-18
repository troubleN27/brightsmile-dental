import { NextResponse, type NextRequest } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatBookingMessage, sendTelegramMessage, TelegramConfigError } from "@/lib/telegram";

const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };
const MAX_BODY_BYTES = 10_000;

/**
 * Client IP for rate limiting. Vercel sets x-vercel-forwarded-for itself, so it
 * cannot be forged. Elsewhere the right-most X-Forwarded-For entry is the one
 * added by our own reverse proxy (earlier entries come from the client).
 */
function clientIp(request: NextRequest) {
  const vercel = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = request.headers.get("x-forwarded-for")?.split(",").at(-1)?.trim();
  return forwarded || "unknown";
}

/**
 * Blocks requests sent from other websites. A JSON content type forces a CORS
 * preflight, and the Origin header (sent by browsers on cross-site POSTs) must
 * match this site's host.
 */
function isSameSiteJson(request: NextRequest) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) return false;
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

/** Reads the body as text, refusing anything over MAX_BODY_BYTES without buffering it all. */
async function readLimitedBody(request: NextRequest) {
  const declared = Number(request.headers.get("content-length"));
  if (declared > MAX_BODY_BYTES) return null;
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder().decode(Buffer.concat(chunks));
}

export async function POST(request: NextRequest) {
  if (!isSameSiteJson(request)) {
    return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
  }

  let body: unknown;
  try {
    const raw = await readLimitedBody(request);
    if (raw === null) {
      return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
    }
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot filled in: pretend success so the bot learns nothing
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  // Validate with the same schema the form uses
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ ok: false, error: "validation", issues }, { status: 400 });
  }

  // Rate limit only requests that would actually reach Telegram, so a visitor
  // who fixes a validation error is not locked out: 3 per IP in 10 minutes
  if (!checkRateLimit(clientIp(request), RATE_LIMIT)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  // Notify the admin in Telegram
  try {
    await sendTelegramMessage(formatBookingMessage(parsed.data));
  } catch (error) {
    if (error instanceof TelegramConfigError) {
      console.error(`[booking] ${error.message}. Add them to .env.local or the Vercel project settings.`);
      return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
    }
    console.error("[booking] Failed to send Telegram message:", error);
    return NextResponse.json({ ok: false, error: "telegram_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
