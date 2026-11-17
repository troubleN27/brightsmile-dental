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
          <div className="rounded-card bg-white p-5 sm:p-8">
            <LazyBookingForm />
          </div>

          <aside className="space-y-6 rounded-card bg-sky p-6 sm:p-8 lg:self-start">
            <h3 className="type-h3 text-navy">{t("nextTitle")}</h3>
            {/* What happens after the request, in order */}
            <ol className="space-y-4">
              {nextSteps.map((key, index) => (
                <li key={key} className="grid grid-cols-[28px_1fr] gap-3">
                  <span
                    aria-hidden
                    className="flex size-7 items-center justify-center rounded-full bg-white text-sm font-bold text-primary-dark"
                  >
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-6 text-navy/85">{t(`next.${key}`)}</p>
                </li>
              ))}
            </ol>
            <div className="border-t border-navy/10 pt-5">
              <p className="text-sm text-navy/70">{t("preferPhone")}</p>
              <a
                href={phoneHref}
                className="mt-1 inline-block text-xl font-bold tracking-[-0.01em] text-navy tabular-nums hover:text-primary-dark"
              >
                {site.phone}
              </a>
              <p className="mt-1 text-sm text-navy/70">{site.hours[locale]}</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
