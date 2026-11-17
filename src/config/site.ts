import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export const site = {
  name: "BrightSmile Dental",
  phone: "+1 555 010 2030",
  email: "hello@brightsmile.dental",
  address: {
    ru: "1250 Market Street, Сан-Франциско, CA 94102, США",
    en: "1250 Market Street, San Francisco, CA 94102, USA",
  } satisfies Localized,
  hours: {
    ru: "Пн–Сб 9:00–20:00, Вс 10:00–16:00",
    en: "Mon–Sat 9 AM–8 PM, Sun 10 AM–4 PM",
  } satisfies Localized,
  telegram: "https://t.me/brightsmiledental",
  instagram: "https://instagram.com/brightsmile.dental",
  map: { lat: 37.7765, lng: -122.4172, zoom: 15 },
  stats: { years: 12, patients: 15000, rating: 4.9, warrantyYears: 5 },
} as const;

/** Phone number in a form suitable for `tel:` links, e.g. "+15550102030". */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;
