import { Clock, Smile } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CompareSlider } from "@/components/ui/CompareSlider";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cases } from "@/data/cases";
import { getService } from "@/data/services";
import type { Locale } from "@/i18n/routing";

const PHOTO = { width: 1200, height: 900 };
const SIZES = "(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw";

export function BeforeAfter() {
  const t = useTranslations("Results");
  const locale = useLocale() as Locale;

  return (
    <section id="results" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => {
            const service = getService(item.serviceId)?.title[locale] ?? "";
            return (
              <li key={item.id} className="rounded-card bg-white p-3 ring-1 ring-primary/10">
                <CompareSlider
                  label={t("sliderLabel", { service })}
                  beforeLabel={t("before")}
                  afterLabel={t("after")}
                  before={
                    <Photo
                      src={item.before}
                      alt={t("beforeAlt", { service })}
                      {...PHOTO}
                      sizes={SIZES}
                      placeholderIcon={Smile}
                      placeholderTone="muted"
                    />
                  }
                  after={
                    <Photo
                      src={item.after}
                      alt={t("afterAlt", { service })}
                      {...PHOTO}
                      sizes={SIZES}
                      placeholderIcon={Smile}
                    />
                  }
                />
                <div className="px-2 pt-4 pb-1">
                  <h3 className="font-bold text-navy">{service}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock aria-hidden className="size-4 text-primary-dark" />
                    {t("duration", { duration: item.duration[locale] })}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
