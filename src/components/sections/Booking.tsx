import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { LazyBookingForm } from "./LazyBookingForm";

const nextSteps = ["call", "visit", "plan"] as const;

export function Booking() {
  const t = useTranslations("Booking");
  const locale = useLocale() as Locale;

  return (
    <section id="booking" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
          <div className="rounded-card bg-white p-5 shadow-[0_24px_60px_-32px_rgba(15,118,110,0.45)] ring-1 ring-primary/10 sm:p-8">
            <LazyBookingForm />
          </div>

          <aside className="space-y-6 rounded-card bg-navy p-6 text-slate-300 sm:p-8 lg:self-start">
            <h3 className="text-lg font-bold text-white">
              {t("nextTitle")}
            </h3>
            <ol className="space-y-4">
              {nextSteps.map((key, index) => (
                <li key={key} className="flex gap-3">
                  <span className="font-bold text-primary">{index + 1}.</span>
                  <p className="text-sm leading-6">{t(`next.${key}`)}</p>
                </li>
              ))}
            </ol>
            <div className="border-t border-white/10 pt-5">
              <p className="text-sm">{t("preferPhone")}</p>
              <a href={phoneHref} className="mt-1 inline-block text-xl font-extrabold text-white hover:text-primary">
                {site.phone}
              </a>
              <p className="mt-1 text-sm">{site.hours[locale]}</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
