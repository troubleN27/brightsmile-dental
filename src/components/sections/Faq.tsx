import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TelegramIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import { faq } from "@/data/faq";
import type { Locale } from "@/i18n/routing";

export function Faq() {
  const t = useTranslations("Faq");
  const locale = useLocale() as Locale;

  return (
    <section id="faq" className="py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionTitle
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-6 md:mb-8"
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <a href={phoneHref}>
                <Phone />
                {t("call")}
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={site.telegram} target="_blank" rel="noopener noreferrer">
                <TelegramIcon className="size-4" />
                {t("telegram")}
              </a>
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible className="border-t border-line">
          {faq.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border-b border-line">
              <AccordionTrigger className="cursor-pointer py-6 text-[17px] font-semibold text-navy hover:text-primary-dark hover:no-underline md:text-lg [&>svg]:size-5 [&>svg]:text-primary-dark">
                {item.question[locale]}
              </AccordionTrigger>
              <AccordionContent className="max-w-[64ch] pb-6 text-base leading-7 text-muted-foreground">
                {item.answer[locale]}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
