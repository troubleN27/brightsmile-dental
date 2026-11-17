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
