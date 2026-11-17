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
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold break-words text-navy">{children}</p>
      </div>
    </li>
  );
}

export function Contacts() {
  const t = useTranslations("Contacts");
  const locale = useLocale() as Locale;

  return (
    <section id="contacts" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <ul className="space-y-5">
              <ContactRow label={t("address")}>
                {site.address[locale]}
              </ContactRow>
              <ContactRow label={t("metro")}>
                {site.metro[locale]}
              </ContactRow>
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
              <ContactRow label={t("hours")}>
                {site.hours[locale]}
              </ContactRow>
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-sm text-muted-foreground">{t("socials")}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                    <TelegramIcon className="size-5" />
                    Telegram
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className="size-5" />
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-card bg-white md:min-h-[420px]">
            <iframe
              title={t("mapTitle")}
              src={mapEmbedUrl(locale)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
            <Button asChild size="sm" className="absolute right-4 bottom-4 shadow-lg">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation />
                {t("route")}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
