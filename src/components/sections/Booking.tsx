import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ToothMarker } from "@/components/ui/ToothMarker";
import { phoneHref, site } from "@/config/site";
import { formatOpeningDays } from "@/lib/format";
import { LazyBookingForm } from "./LazyBookingForm";

const nextSteps = ["call", "visit", "plan"] as const;

/** Form and side panel both on frosted glass over the brand gradient. */
export function Booking() {
  const t = useTranslations("Booking");
  const locale = useLocale();

  return (
    <section id="booking" className="bg-brand-gradient py-16 md:py-24">
      <Container>
        <SectionTitle tone="light" title={t("title")} subtitle={t("subtitle")} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
          <div className="rounded-[28px] bg-white/10 p-5 shadow-[0_30px_70px_-40px_rgba(11,31,58,0.8)] ring-1 ring-white/25 backdrop-blur-md sm:p-8">
            <LazyBookingForm />
          </div>

          <aside className="space-y-7 rounded-[28px] bg-white/10 p-6 text-white/85 ring-1 ring-white/25 backdrop-blur-md sm:p-8 lg:self-start">
            <div>
              <h3 className="text-lg font-bold text-white">{t("nextTitle")}</h3>
              <ol className="mt-5 space-y-4">
                {nextSteps.map((key, index) => (
                  <li key={key} className="flex items-center gap-4">
                    <ToothMarker number={index + 1} id={`booking-${index}`} size="sm" />
                    <p className="text-sm leading-6">{t(`next.${key}`)}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-card bg-white/10 px-5 py-4">
              <h3 className="font-bold text-white">{t("hoursTitle")}</h3>
              <table className="mt-2 w-full text-sm">
                <tbody>
                  {site.openingHours.map((row) => (
                    <tr key={row.opens + row.days[0]} className="border-b border-white/15 last:border-b-0">
                      <th scope="row" className="py-2 text-left font-normal">
                        {formatOpeningDays(row.days, locale)}
                      </th>
                      <td className="py-2 text-right font-semibold text-white tabular-nums">
                        {row.opens}–{row.closes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a
              href={phoneHref}
              className="group flex items-center gap-4 rounded-card bg-white/10 px-5 py-4 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-violet">
                <Phone aria-hidden className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-white/80">{t("preferPhone")}</span>
                <span className="block text-lg font-extrabold">{site.phone}</span>
              </span>
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
