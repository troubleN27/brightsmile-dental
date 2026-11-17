import type { Locale } from "@/i18n/routing";

const priceFormatters = new Map<Locale, Intl.NumberFormat>();

/** Formats a whole-ruble amount by the locale's rules: "3 500 ₽" (ru), "₽3,500" (en). */
export function formatPrice(amount: number, locale: Locale) {
  let formatter = priceFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "narrowSymbol",
      maximumFractionDigits: 0,
    });
    priceFormatters.set(locale, formatter);
  }
  return formatter.format(amount);
}

const WEEKDAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/** Short weekday name with a capital letter: "Пн" (ru), "Mon" (en). */
function shortWeekday(day: string, locale: string) {
  // 1 January 2024 was a Monday
  const date = new Date(Date.UTC(2024, 0, 1 + WEEKDAYS.indexOf(day)));
  const name = new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(date);
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** Consecutive opening days as a range: ["Monday", …, "Saturday"] → "Пн–Сб" / "Mon–Sat". */
export function formatOpeningDays(days: readonly string[], locale: string) {
  const first = shortWeekday(days[0], locale);
  if (days.length === 1) return first;
  return `${first}–${shortWeekday(days[days.length - 1], locale)}`;
}
