import { Navigation } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { InstagramIcon, TelegramIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

function mapEmbedUrl(locale: Locale) {
  const { lat, lng, zoom } = site.map;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&hl=${locale}&output=embed`;
}

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${site.map.lat},${site.map.lng}`;

type ContactRowProps = {
  label: string;
  children: React.ReactNode;
};

function ContactRow({ label, children }: ContactRowProps) {
  return (
    <li>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-semibold break-words text-navy">{children}</p>
    </li>
  );
}

/** Full-width map with a framed contact card laid over it on desktop. */
export function Contacts() {
  const t = useTranslations("Contacts");
  const locale = useLocale() as Locale;

  return (
    <section id="contacts" className="pt-16 md:pt-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
      </Container>

      <div className="relative lg:min-h-[600px]">
        <div className="relative h-[340px] bg-surface md:h-[420px] lg:absolute lg:inset-0 lg:h-auto">
          <iframe
            title={t("mapTitle")}
            src={mapEmbedUrl(locale)}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full border-0"
          />
        </div>

        <Container className="relative lg:pointer-events-none lg:flex lg:min-h-[600px] lg:items-center">
          <div className="border-navy/15 bg-white py-8 lg:pointer-events-auto lg:w-[400px] lg:border lg:p-8 lg:shadow-[0_24px_60px_-32px_rgba(15,23,42,0.4)]">
            <ul className="space-y-4">
              <ContactRow label={t("address")}>{site.address[locale]}</ContactRow>
              <ContactRow label={t("metro")}>{site.metro[locale]}</ContactRow>
              <ContactRow label={t("phone")}>
                <a href={phoneHref} className="hover:text-primary-dark">
                  {site.phone}
                </a>
              </ContactRow>
              <ContactRow label={t("email")}>
                <a href={`mailto:${site.email}`} className="hover:text-primary-dark">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow label={t("hours")}>{site.hours[locale]}</ContactRow>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
              <Button asChild size="sm">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation />
                  {t("route")}
                </a>
              </Button>
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
        </Container>
      </div>
    </section>
  );
}
