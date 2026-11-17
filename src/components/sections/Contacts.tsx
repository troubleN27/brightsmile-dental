import { Clock, Mail, MapPin, Navigation, Phone, type LucideIcon } from "lucide-react";
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
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
};

function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <div className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-button bg-primary/15 text-primary-dark">
        <Icon aria-hidden className="size-5" />
      </span>
      <div className="min-w-0">
        <dt className="text-sm text-muted-foreground">{label}</dt>
        <dd className="font-semibold break-words text-navy">{children}</dd>
      </div>
    </div>
  );
}

export function Contacts() {
  const t = useTranslations("Contacts");
  const locale = useLocale() as Locale;

  return (
    <section id="contacts" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="rounded-card bg-white p-6 ring-1 ring-primary/10 md:p-8">
            <dl className="space-y-6">
              <ContactRow icon={MapPin} label={t("address")}>
                {site.address[locale]}
              </ContactRow>
              <ContactRow icon={Phone} label={t("phone")}>
                <a href={phoneHref} className="hover:text-primary-dark">
                  {site.phone}
                </a>
              </ContactRow>
              <ContactRow icon={Mail} label={t("email")}>
                <a href={`mailto:${site.email}`} className="hover:text-primary-dark">
                  {site.email}
                </a>
              </ContactRow>
              <ContactRow icon={Clock} label={t("hours")}>
                {site.hours[locale]}
              </ContactRow>
            </dl>

            <div className="mt-8 border-t border-border pt-6">
              <p className="mb-3 text-sm text-muted-foreground">{t("socials")}</p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary">
                  <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                    <TelegramIcon className="size-5" />
                    Telegram
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                    <InstagramIcon className="size-5" />
                    Instagram
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[320px] overflow-hidden rounded-card bg-white ring-1 ring-primary/10 md:min-h-[420px]">
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
