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
  /** The same address split into fields, for structured data (JSON-LD) */
  postalAddress: {
    street: "1250 Market Street",
    city: "San Francisco",
    region: "CA",
    postalCode: "94102",
    country: "US",
  },
  hours: {
    ru: "Пн–Сб 9:00–20:00, Вс 10:00–16:00",
    en: "Mon–Sat 9 AM–8 PM, Sun 10 AM–4 PM",
  } satisfies Localized,
  /** Machine-readable opening hours (24h), keep in sync with `hours` */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
    { days: ["Sunday"], opens: "10:00", closes: "16:00" },
  ],
  telegram: "https://t.me/brightsmiledental",
  instagram: "https://instagram.com/brightsmile.dental",
  map: { lat: 37.7765, lng: -122.4172, zoom: 15 },
  stats: {
    years: 12,
    patients: 15000,
    rating: 4.9,
    /** Number of patient reviews behind `rating` (used in search markup) — keep it accurate */
    reviewCount: 320,
    warrantyYears: 5,
  },
} as const;

/** Phone number in a form suitable for `tel:` links, e.g. "+15550102030". */
export const phoneHref = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

/**
 * Absolute site URL for canonical links, sitemap and Open Graph:
 * NEXT_PUBLIC_SITE_URL → Vercel production domain → localhost.
 */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
