"use client";

import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { serviceCategories, services } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";

export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />

        <Tabs defaultValue={serviceCategories[0]} className="gap-6">
          {/* Scrolls sideways on small screens instead of wrapping */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <TabsList className="flex h-auto w-max gap-1 rounded-button bg-surface p-1.5 ring-1 ring-primary/10">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="h-10 flex-none cursor-pointer rounded-[10px] px-4 text-[15px] font-semibold text-navy/70 hover:text-navy data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:shadow-sm"
                >
                  {t(`categories.${category}`)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {serviceCategories.map((category) => (
            <TabsContent key={category} value={category}>
              <ul className="grid gap-x-12 md:grid-cols-2">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => {
                    const title = service.title[locale];
                    return (
                      <li
                        key={service.id}
                        className="flex flex-col gap-4 border-b border-border py-5 sm:flex-row sm:items-center md:py-6"
                      >
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-navy">{title}</h3>
                          <p className="mt-1.5 text-muted-foreground">{service.description[locale]}</p>
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
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-8 max-w-3xl text-sm leading-6 text-muted-foreground">
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
