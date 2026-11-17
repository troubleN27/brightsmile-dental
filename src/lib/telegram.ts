// Server-only module: imported from the /api/booking route handler only,
// because it reads the bot token from the environment.
import { getDoctor } from "@/data/doctors";
import { getService } from "@/data/services";
import type { BookingData, TimeOfDay } from "./booking-schema";

const TIME_OF_DAY_RU: Record<TimeOfDay, string> = {
  morning: "утро",
  day: "день",
  evening: "вечер",
};

const EMPTY = "—";

/** Escapes text for Telegram's HTML parse mode. */
export function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate(date?: string, timeOfDay?: TimeOfDay | "") {
  const time = timeOfDay ? TIME_OF_DAY_RU[timeOfDay] : "";
  if (!date) return time ? `любая (${time})` : EMPTY;
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}${time ? ` (${time})` : ""}`;
}

/** Builds the admin notification. Service and doctor are shown by their Russian names. */
export function formatBookingMessage(data: BookingData) {
  const service = data.serviceId ? getService(data.serviceId)?.title.ru : undefined;
  const doctor = data.doctorId ? getDoctor(data.doctorId)?.name.ru : undefined;

  const lines = [
    "🦷 <b>Новая заявка с сайта</b>",
    `👤 Имя: ${escapeHtml(data.name)}`,
    `📞 Телефон: ${escapeHtml(data.phone)}`,
    `🩺 Услуга: ${escapeHtml(service ?? EMPTY)}`,
    `👨‍⚕️ Врач: ${escapeHtml(doctor ?? EMPTY)}`,
    `📅 Дата: ${formatDate(data.date, data.timeOfDay)}`,
    `💬 Комментарий: ${data.comment ? escapeHtml(data.comment) : EMPTY}`,
    `🌐 Язык: ${data.locale.toUpperCase()}`,
  ];
  return lines.join("\n");
}

export class TelegramConfigError extends Error {}

/** Sends a message to the admin chat. Throws on missing config or a failed request. */
export async function sendTelegramMessage(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new TelegramConfigError("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
  }

  // TELEGRAM_API_URL is only overridden for local testing against a stub server
  const apiUrl = process.env.TELEGRAM_API_URL || "https://api.telegram.org";

  const response = await fetch(`${apiUrl}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    // Telegram puts the reason in `description`; the token never appears in it
    const details = await response.json().catch(() => ({}));
    throw new Error(`Telegram API responded ${response.status}: ${details.description ?? "no details"}`);
  }
}
