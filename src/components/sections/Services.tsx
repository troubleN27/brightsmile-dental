"use client";

import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceCategories, services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";

export function Services() {
  const t = useTranslations("Services");
  const tLegal = useTranslations("Legal");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <Tabs defaultValue={serviceCategories[0]} className="gap-6">
          {/* Scrolls sideways on small screens instead of wrapping */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <TabsList className="flex h-auto w-max gap-1 rounded-full bg-white p-1 ring-1 ring-line">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="h-10 flex-none cursor-pointer rounded-full border-none px-4 text-[15px] font-semibold text-navy/70 shadow-none hover:text-navy data-[state=active]:bg-navy data-[state=active]:text-white data-[state=active]:shadow-none"
                >
                  {t(`categories.${category}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {serviceCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <ul className="divide-y divide-line rounded-card bg-white px-5 md:px-8">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => {
                    const title = service.title[locale];
                    return (
                      <li
                        key={service.id}
                        className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[1fr_auto_auto] md:items-center md:py-6"
                      >
                        <div>
                          <h3 className="type-h3 text-navy">{title}</h3>
                          <p className="mt-1 max-w-[60ch] text-[15px] leading-6 text-muted-foreground">
                            {service.description[locale]}
                          </p>
                        </div>
                        <p className="text-lg font-bold whitespace-nowrap text-navy tabular-nums">
                          {t("priceFrom", { price: formatPrice(service.priceFrom, locale) })}
                        </p>
                        <BookingLink
                          serviceId={service.id}
                          aria-label={t("bookLabel", { service: title })}
                          className="w-fit text-[15px] font-semibold text-primary-dark underline decoration-primary-dark/30 underline-offset-4 hover:decoration-primary-dark"
                        >
                          {t("book")}
                        </BookingLink>
                      </li>
                    );
                  })}
              </ul>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-6 max-w-3xl space-y-2 text-sm leading-6 text-muted-foreground">
          <p>{t("note")}</p>
          <p className="font-semibold text-navy/80">{tLegal("contraindications")}</p>
        </div>
      </Container>
    </section>
  );
}
