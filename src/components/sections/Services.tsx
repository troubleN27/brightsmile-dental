"use client";

import { CalendarPlus, Info } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { sectionHref } from "@/components/layout/nav-items";
import { serviceCategories, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { formatPrice } from "@/lib/format";

export function Services() {
  const t = useTranslations("Services");
  const locale = useLocale() as Locale;

  return (
    <section id="services" className="py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

        <Tabs defaultValue={serviceCategories[0]} className="gap-6">
          {/* Scrolls sideways on small screens instead of wrapping */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <TabsList className="flex h-auto w-max gap-1 rounded-button bg-surface p-1.5 ring-1 ring-primary/10 md:mx-auto">
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
              <ul className="grid gap-4 md:grid-cols-2">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => {
                    const title = service.title[locale];
                    return (
                      <li
                        key={service.id}
                        className="flex flex-col gap-4 rounded-card bg-white p-5 ring-1 ring-border transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(15,118,110,0.4)] sm:flex-row sm:items-center md:p-6"
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
                            <Link href={sectionHref("booking")} aria-label={t("bookLabel", { service: title })}>
                              <CalendarPlus />
                              {t("book")}
                            </Link>
                          </Button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mx-auto mt-8 flex max-w-3xl gap-3 rounded-card bg-surface p-4 text-sm leading-6 text-navy/80 md:p-5">
          <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-primary-dark" />
          {t("note")}
        </p>
      </Container>
    </section>
  );
}
