import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { TelegramIcon } from "@/components/ui/BrandIcons";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { phoneHref, site } from "@/config/site";
import { LazyBookingForm } from "./LazyBookingForm";
import { ProcessSteps } from "./ProcessSteps";

/**
 * Booking band on the brand gradient: the four steps after a request along a
 * smile, then the frosted-glass form with a phone and Telegram shortcut.
 */
export function Booking() {
  const t = useTranslations("Booking");

  return (
    <section id="booking" className="bg-brand-gradient py-16 md:py-24">
      <Container>
        <SectionTitle
          tone="light"
          align="center"
          title={t("title")}
          subtitle={t("subtitle")}
        />

        {/* Phones: form first, steps after it; desktop: steps above the form */}
        <div className="flex flex-col">
          <div className="order-2 mt-12 lg:order-1 lg:mt-0 lg:mb-16">
            <ProcessSteps />
          </div>

          <div className="order-1 grid gap-6 lg:order-2 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-8">
            <div className="rounded-[28px] bg-white/10 p-5 shadow-[0_30px_70px_-40px_rgba(11,31,58,0.8)] ring-1 ring-white/25 backdrop-blur-md sm:p-8">
              <LazyBookingForm />
            </div>

            <aside className="space-y-4 lg:self-start">
              <p className="text-white/85">{t("preferPhone")}</p>
              <a
                href={phoneHref}
                className="flex items-center gap-4 rounded-card bg-white/10 px-5 py-4 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-violet">
                  <Phone aria-hidden className="size-5" />
                </span>
                <span className="text-lg font-extrabold">{site.phone}</span>
              </a>
              <a
                href={site.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-card bg-white/10 px-5 py-4 text-white ring-1 ring-white/20 backdrop-blur-md transition-colors hover:bg-white/20"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-[#229ED9]">
                  <TelegramIcon className="size-5" />
                </span>
                <span className="font-bold">{t("telegram")}</span>
              </a>
            </aside>
          </div>
        </div>
      </Container>
    </section>
  );
}
