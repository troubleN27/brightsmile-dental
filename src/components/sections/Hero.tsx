import { ArrowRight, CalendarCheck, Smile } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { sectionHref } from "@/components/layout/nav-items";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");
  const format = useFormatter();
  const { years, patients, rating, warrantyYears } = site.stats;

  const stats = [
    { value: t("years", { count: years }), label: t("yearsLabel") },
    { value: t("patients", { count: format.number(patients) }), label: t("patientsLabel") },
    { value: t("rating", { rating: format.number(rating) }), label: t("ratingLabel") },
    { value: t("warranty", { count: warrantyYears }), label: t("warrantyLabel") },
  ];

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,#ccfbf1_0%,transparent_70%)] md:size-[720px]"
      />
      <Container className="relative grid items-center gap-10 pt-8 pb-16 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-button bg-surface px-3.5 py-1.5 text-sm font-semibold text-primary-dark ring-1 ring-primary/20">
            <Smile aria-hidden className="size-4" />
            {t("eyebrow")}
          </p>
          <h1 className="text-h1 text-navy text-balance">{t("title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-13 py-3 text-center whitespace-normal">
              <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={sectionHref("services")}>
                {t("ctaSecondary")}
                <ArrowRight />
              </Link>
            </Button>
          </div>

          <dl
            aria-label={t("statsLabel")}
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse justify-end gap-1">
                <dt className="text-sm leading-5 text-muted-foreground">{stat.label}</dt>
                <dd className="text-2xl font-extrabold tracking-tight text-navy">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Photo
            src="/images/hero.webp"
            alt={t("photoAlt")}
            width={960}
            height={1200}
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 100vw"
            preload
            placeholderIcon={Smile}
          />
          <div className="absolute -bottom-5 left-4 flex max-w-[260px] items-center gap-3 rounded-card bg-white p-4 shadow-[0_16px_40px_-16px_rgba(15,23,42,0.35)] sm:-left-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-button bg-primary/15 text-primary-dark">
              <CalendarCheck aria-hidden className="size-5" />
            </span>
            <div>
              <p className="font-bold text-navy">{t("badgeTitle")}</p>
              <p className="text-sm leading-5 text-muted-foreground">{t("badgeText")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
