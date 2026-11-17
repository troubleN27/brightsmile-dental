import { NextResponse, type NextRequest } from "next/server";
import { bookingSchema } from "@/lib/booking-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { formatBookingMessage, sendTelegramMessage, TelegramConfigError } from "@/lib/telegram";

const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };
const MAX_BODY_BYTES = 10_000;

function clientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  // 1. Rate limit: no more than 3 requests per IP in 10 minutes
  if (!checkRateLimit(clientIp(request), RATE_LIMIT)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) throw new Error("Body too large");
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // 2. Honeypot filled in: pretend success so the bot learns nothing
  if (body && typeof body === "object" && "website" in body && body.website) {
    return NextResponse.json({ ok: true });
  }

  // 3. Validate with the same schema the form uses
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    return NextResponse.json({ ok: false, error: "validation", issues }, { status: 400 });
  }

  // 4. Notify the admin in Telegram
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
