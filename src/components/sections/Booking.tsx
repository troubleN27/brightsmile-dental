import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import { formatOpeningDays } from "@/lib/format";
import { LazyBookingForm } from "./LazyBookingForm";

const nextSteps = ["call", "visit", "plan"] as const;

export function Booking() {
  const t = useTranslations("Booking");
  const locale = useLocale();

  return (
    <section id="booking" className="bg-teal-gradient py-16 md:py-24">
      <Container>
        <SectionTitle tone="light" title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
          <div className="rounded-card bg-white p-5 shadow-[0_30px_60px_-30px_rgba(4,47,46,0.7)] sm:p-8">
            <LazyBookingForm />
          </div>

          <aside className="space-y-8 rounded-card bg-ink p-6 text-slate-300 sm:p-8 lg:self-start">
            <div>
              <h3 className="text-lg font-bold text-white">{t("nextTitle")}</h3>
              <ol className="mt-4 space-y-4">
                {nextSteps.map((key, index) => (
                  <li key={key} className="flex gap-3">
                    <span className="font-bold text-primary">{index + 1}.</span>
                    <p className="text-sm leading-6">{t(`next.${key}`)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white">{t("hoursTitle")}</h3>
              <table className="mt-3 w-full text-sm">
                <tbody>
                  {site.openingHours.map((row) => (
                    <tr key={row.opens + row.days[0]} className="border-b border-white/10">
                      <th scope="row" className="py-2.5 text-left font-normal">
                        {formatOpeningDays(row.days, locale)}
                      </th>
                      <td className="py-2.5 text-right font-semibold text-white tabular-nums">
                        {row.opens}–{row.closes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <p className="text-sm">{t("preferPhone")}</p>
              <a href={phoneHref} className="mt-1 inline-block text-xl font-extrabold text-white hover:text-primary">
                {site.phone}
              </a>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
