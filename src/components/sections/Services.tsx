import { ImageIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
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
      photo: (
        <Photo
          src={`/images/services/${category}.webp`}
          alt={t("photoAlt", { category: label })}
          width={1500}
          height={1000}
          sizes="(min-width: 1024px) 380px, 50vw"
          fill
          square
          className="transition-transform duration-500 group-hover:scale-105"
          placeholderIcon={ImageIcon}
        />
      ),
      content: (
        <div className="rounded-card bg-surface p-6 md:p-10">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-extrabold text-navy">{label}</h3>
            <p className="mt-2 text-muted-foreground text-pretty">{t(`categoryText.${category}`)}</p>
          </div>

          <ul className="mt-6 grid gap-x-12 lg:grid-cols-2">
            {services
              .filter((service) => service.category === category)
              .map((service) => {
                const title = service.title[locale];
                return (
                  <li
                    key={service.id}
                    className="flex flex-col gap-3 border-t border-primary-dark/15 py-5 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-navy">{title}</h4>
                      <p className="mt-1 text-muted-foreground">{service.description[locale]}</p>
                    </div>
                    <p className="text-xl font-extrabold whitespace-nowrap text-primary-dark sm:text-right">
                      {t("priceFrom", { price: formatPrice(service.priceFrom, locale) })}
                    </p>
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
        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted-foreground">{t("note")}</p>
      </Container>
    </section>
  );
}
