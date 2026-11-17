import type { Locale } from "@/i18n/routing";

const priceFormatters = new Map<Locale, Intl.NumberFormat>();

/** Formats a whole-dollar amount for the locale, e.g. "$1,100" (en) or "1 100 $" (ru). */
export function formatPrice(amount: number, locale: Locale) {
  let formatter = priceFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    priceFormatters.set(locale, formatter);
  }
  return formatter.format(amount);
}
