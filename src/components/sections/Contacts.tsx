import { Clock, Mail, MapPin, Navigation, Phone, TrainFront, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { TelegramIcon, VkIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

// Yandex Maps widget: no API key needed. Coordinates go as "longitude,latitude".
function mapEmbedUrl(locale: Locale) {
  const { lat, lng, zoom } = site.map;
  const lang = locale === "ru" ? "ru_RU" : "en_US";
  return `https://yandex.ru/map-widget/v1/?ll=${lng},${lat}&z=${zoom}&pt=${lng},${lat},pm2rdm&lang=${lang}`;
}

const directionsUrl = `https://yandex.ru/maps/?rtext=~${site.map.lat},${site.map.lng}&rtt=auto`;

type ContactRowProps = {
  icon: LucideIcon;
  label: string;
  children: React.ReactNode;
};

function ContactRow({ icon: Icon, label, children }: ContactRowProps) {
  return (
    <li className="flex gap-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-button bg-primary/15 text-primary-dark">
        <Icon aria-hidden className="size-5" />
      </span>
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
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="rounded-card bg-white p-6 ring-1 ring-primary/10 md:p-8">
            <ul className="space-y-6">
              <ContactRow icon={MapPin} label={t("address")}>
                {site.address[locale]}
              </ContactRow>
              <ContactRow icon={TrainFront} label={t("metro")}>
                {site.metro[locale]}
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
            </ul>

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
                  <a href={site.vk} target="_blank" rel="noopener noreferrer">
                    <VkIcon className="size-5" />
                    {t("vk")}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="relative min-h-[320px] flex-1 overflow-hidden rounded-card bg-white ring-1 ring-primary/10 md:min-h-[420px]">
              <iframe
                title={t("mapTitle")}
                src={mapEmbedUrl(locale)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
            {/* Below the map, not on top of it: the Yandex widget has its own controls and banners */}
            <Button asChild variant="outline" className="self-start bg-white">
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
