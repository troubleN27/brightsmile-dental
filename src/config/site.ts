import type { Locale } from "@/i18n/routing";

type Localized = Record<Locale, string>;

export const site = {
  name: "BrightSmile Dental",
  phone: "+7 495 221-78-45",
  email: "hello@brightsmile.dental",
  address: {
    ru: "Москва, ул. Покровка, 27, стр. 1",
    en: "27 Pokrovka St., Bldg. 1, Moscow",
  } satisfies Localized,
  /** Nearest metro station, shown in contacts */
  metro: {
    ru: "м. «Чистые пруды», 7 минут пешком",
    en: "Chistye Prudy metro station, 7-minute walk",
  } satisfies Localized,
  /** The same address split into fields, for structured data (JSON-LD) */
  postalAddress: {
    street: "ул. Покровка, 27, стр. 1",
    city: "Москва",
    region: "Москва",
    postalCode: "105062",
    country: "RU",
  },
  hours: {
    ru: "Пн–Сб 9:00–20:00, Вс 10:00–16:00",
    en: "Mon–Sat 9:00–20:00, Sun 10:00–16:00",
  } satisfies Localized,
  /** Machine-readable opening hours (24h), keep in sync with `hours` */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "09:00", closes: "20:00" },
    { days: ["Sunday"], opens: "10:00", closes: "16:00" },
  ],
  /** Booking bot; all Telegram buttons on the site lead here */
  telegram: "https://t.me/brightsmile_booking_bot",
  /** Instagram home page (the clinic has no profile link yet) */
  instagram: "https://www.instagram.com/",
  map: { lat: 55.7593, lng: 37.6466, zoom: 16 },
  /**
   * Legal details of the clinic (operator of personal data, medical licence).
   * Fields left empty are simply not shown on the site.
   */
  legal: {
    name: { ru: "ООО «БрайтСмайл Дентал»", en: "BrightSmile Dental LLC" } satisfies Localized,
    inn: "",
    ogrn: "",
    license: "",
  },
  stats: {
    years: 12,
    patients: 15000,
    rating: 4.9,
    /** Number of patient reviews behind `rating` (used in search markup) — keep it accurate */
    reviewCount: 320,
    warrantyYears: 5,
  },
} as const;

/** Phone number in a form suitable for `tel:` links, e.g. "+74952217845". */
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
