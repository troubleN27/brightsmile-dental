import type { Locale } from "@/i18n/routing";

const numberFormatters = new Map<Locale, Intl.NumberFormat>();

/**
 * Formats a whole-dollar amount with the dollar sign first and the locale's
 * digit grouping: "$1 100" (ru), "$1,100" (en).
 */
export function formatPrice(amount: number, locale: Locale) {
  let formatter = numberFormatters.get(locale);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    numberFormatters.set(locale, formatter);
  }
  return `$${formatter.format(amount)}`;
}
