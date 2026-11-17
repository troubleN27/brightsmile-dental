import { site, siteUrl } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

/** Schema.org `Dentist` markup built from the clinic config (SPEC §9). */
export function JsonLd({ locale }: { locale: Locale }) {
  const base = siteUrl();
  const { postalAddress, map, stats } = site;

  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${base}/#clinic`,
    name: site.name,
    url: `${base}${localizedPath(locale)}`,
    logo: `${base}/icon.svg`,
    image: `${base}${localizedPath(locale)}/opengraph-image`,
    telephone: site.phone.replace(/\s/g, ""),
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: postalAddress.street,
      addressLocality: postalAddress.city,
      addressRegion: postalAddress.region,
      postalCode: postalAddress.postalCode,
      addressCountry: postalAddress.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: map.lat, longitude: map.lng },
    openingHoursSpecification: site.openingHours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.rating,
      reviewCount: stats.reviewCount,
      bestRating: 5,
    },
    availableLanguage: ["Russian", "English"],
    sameAs: [site.telegram, site.instagram],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so the JSON can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
