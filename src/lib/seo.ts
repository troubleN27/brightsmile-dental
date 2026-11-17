import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/** "/ru" + "/privacy" → "/ru/privacy"; the home page is just "/ru". */
export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path === "/" ? "" : path}`;
}

/** Canonical URL and hreflang alternates for a page that exists in every locale. */
export function localeAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, localizedPath(l, path)]),
  ) as Record<string, string>;
  languages["x-default"] = localizedPath(routing.defaultLocale, path);

  return { canonical: localizedPath(locale, path), languages };
}

export const ogLocale: Record<Locale, string> = { ru: "ru_RU", en: "en_US" };
