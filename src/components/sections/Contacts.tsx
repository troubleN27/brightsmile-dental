import { Clock, Mail, MapPin, Navigation, Phone, TrainFront, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { InstagramIcon, TelegramIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { formatOpeningDays } from "@/lib/format";

function mapEmbedUrl(locale: Locale) {
  const { lat, lng, zoom } = site.map;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=${locale}&output=embed`;
}

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.map.lat},${site.map.lng}`;

type InfoCardProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
};

/** Small white card: a label with a sky icon and the value underneath. */
function InfoCard({ icon: Icon, label, children }: InfoCardProps) {
  return (
    <div className="rounded-card bg-white p-5 shadow-[0_16px_40px_-28px_rgba(3,105,161,0.45)]">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon aria-hidden className="size-4 text-sky" />
        {label}
      </p>
      <div className="mt-1.5 font-semibold break-words text-navy">{children}</div>
    </div>
  );
}

/** Contacts as cards on the left, the map in its own rounded frame on the right. */
export function Contacts() {
  const t = useTranslations("Contacts");
  const locale = useLocale() as Locale;

  return (
    <section id="contacts" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
          <div className="flex flex-col gap-4">
            {/* Address is the main card: where to go and how to get there */}
            <div className="rounded-[28px] bg-white p-6 shadow-[0_24px_48px_-30px_rgba(3,105,161,0.5)] md:p-7">
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin aria-hidden className="size-4 text-sky" />
                {t("address")}
              </p>
              <p className="mt-1.5 text-xl font-bold text-navy">{site.address[locale]}</p>
              <p className="mt-2 flex items-center gap-2 text-navy/75">
                <TrainFront aria-hidden className="size-4 shrink-0 text-violet" />
                {site.metro[locale]}
              </p>
              <Button asChild className="mt-5">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation />
                  {t("route")}
                </a>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <InfoCard icon={Phone} label={t("phone")}>
                <a href={phoneHref} className="hover:text-primary-dark">
                  {site.phone}
                </a>
              </InfoCard>
              <InfoCard icon={Mail} label={t("email")}>
                <a href={`mailto:${site.email}`} className="hover:text-primary-dark">
                  {site.email}
                </a>
              </InfoCard>
            </div>

            <InfoCard icon={Clock} label={t("hours")}>
              <table className="w-full text-[15px]">
                <tbody>
                  {site.openingHours.map((row) => (
                    <tr key={row.opens + row.days[0]} className="border-b border-border last:border-b-0">
                      <th scope="row" className="py-1.5 text-left font-normal text-navy/75">
                        {formatOpeningDays(row.days, locale)}
                      </th>
                      <td className="py-1.5 text-right tabular-nums">
                        {row.opens}–{row.closes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfoCard>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 text-sm text-muted-foreground">{t("socials")}</span>
              <Button asChild size="sm" variant="outline">
                <a href={site.telegram} target="_blank" rel="noopener noreferrer" aria-label={`${t("socials")}: Telegram`}>
                  <TelegramIcon className="size-4" />
                  Telegram
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${t("socials")}: Instagram`}>
                  <InstagramIcon className="size-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[28px] bg-white shadow-[0_24px_48px_-30px_rgba(3,105,161,0.5)] ring-4 ring-white md:min-h-[420px]">
            <iframe
              title={t("mapTitle")}
              src={mapEmbedUrl(locale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
