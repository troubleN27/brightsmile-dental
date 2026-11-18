import { ImageIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { serviceCategories, services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";
import { ServicesTabs, type ServicesTab } from "./ServicesTabs";

export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;

  const tabs: ServicesTab[] = serviceCategories.map((category) => {
    const label = t(`categories.${category}`);
    return {
      id: category,
      label,
      content: (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <Photo
              src={`/images/services/${category}.webp`}
              alt={t("photoAlt", { category: label })}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 440px, 100vw"
              square
              placeholderIcon={ImageIcon}
            />
            <p className="mt-5 text-muted-foreground text-pretty">
              {t(`categoryText.${category}`)}
            </p>
          </div>

          <ul className="border-b border-navy/10">
            {services
              .filter((service) => service.category === category)
              .map((service) => {
                const title = service.title[locale];
                return (
                  <li
                    key={service.id}
                    className="flex flex-col gap-3 border-t border-navy/10 py-5 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-navy">{title}</h3>
                      <p className="mt-1 text-muted-foreground">{service.description[locale]}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                      <p className="text-xl font-extrabold whitespace-nowrap text-primary-dark">
                        {t("priceFrom", { price: formatPrice(service.priceFrom, locale) })}
                      </p>
                      <Button asChild size="sm" variant="outline">
                        <BookingLink serviceId={service.id} aria-label={t("bookLabel", { service: title })}>
                          {t("book")}
                        </BookingLink>
                      </Button>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      ),
    };
  });

  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <ServicesTabs tabs={tabs} />
        <p className="mt-10 max-w-3xl text-sm leading-6 text-muted-foreground">{t("note")}</p>
      </Container>
    </section>
  );
}
