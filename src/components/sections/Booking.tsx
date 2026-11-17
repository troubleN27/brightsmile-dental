import { CalendarCheck, ClipboardList, Phone, PhoneCall, ScanLine, type LucideIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { BookingForm } from "./BookingForm";

const nextSteps: { key: string; icon: LucideIcon }[] = [
  { key: "call", icon: PhoneCall },
  { key: "visit", icon: ScanLine },
  { key: "plan", icon: ClipboardList },
];

export function Booking() {
  const t = useTranslations("Booking");
  const locale = useLocale() as Locale;

  return (
    <section id="booking" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
          <div className="rounded-card bg-white p-5 shadow-[0_24px_60px_-32px_rgba(15,118,110,0.45)] ring-1 ring-primary/10 sm:p-8">
            <BookingForm />
          </div>

          <aside className="space-y-6 rounded-card bg-navy p-6 text-slate-300 sm:p-8 lg:self-start">
            <h3 className="flex items-center gap-2 text-lg font-bold text-white">
              <CalendarCheck aria-hidden className="size-5 text-primary" />
              {t("nextTitle")}
            </h3>
            <ol className="space-y-5">
              {nextSteps.map(({ key, icon: Icon }) => (
                <li key={key} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-button bg-white/10 text-primary">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <p className="pt-1.5 text-sm leading-6">{t(`next.${key}`)}</p>
                </li>
              ))}
            </ol>
            <div className="border-t border-white/10 pt-5">
              <p className="text-sm">{t("preferPhone")}</p>
              <a href={phoneHref} className="mt-1 inline-flex items-center gap-2 text-xl font-extrabold text-white hover:text-primary">
                <Phone aria-hidden className="size-5 text-primary" />
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
