import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { sectionHref } from "@/components/layout/nav-items";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { OpenStatus } from "./OpenStatus";

export function Hero() {
  const t = useTranslations("Hero");
  const format = useFormatter();
  const { rating, reviewCount } = site.stats;

  const facts = [
    t("factSince"),
    t("factRating", { rating: format.number(rating), count: reviewCount }),
    t("factKids"),
  ];

  return (
    <section className="px-2 pt-2 pb-14 sm:px-4 md:pb-20">
      {/* The soft blue panel is the page's one strong gesture */}
      <div className="mx-auto max-w-[1440px] rounded-[28px] bg-sky md:rounded-[36px]">
        <Container className="grid gap-8 py-10 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-16">
          <div className="lg:col-span-6">
            <OpenStatus className="mb-6 w-fit rounded-full bg-white/70 px-3.5 py-1.5 max-sm:text-[13px]" />
            <h1 className="type-h1 text-navy text-balance">{t("title")}</h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-8 text-navy/80">{t("lead")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild size="lg">
                <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
              </Button>
              <Link
                href={sectionHref("services")}
                className="font-semibold text-navy underline decoration-navy/30 underline-offset-[6px] transition-colors hover:decoration-navy"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <Photo
              src="/images/hero.webp"
              alt={t("photoAlt")}
              width={1200}
              height={1500}
              sizes="(min-width: 1024px) 600px, 100vw"
              preload
              className="aspect-[4/3] rounded-[22px] object-cover object-[40%_center] lg:aspect-[4/5] lg:max-h-[620px]"
            />
          </div>
        </Container>
      </div>

      <Container>
        <ul className="mt-6 grid gap-x-10 gap-y-1 text-[15px] text-navy/75 sm:grid-cols-3 md:mt-8">
          {facts.map((fact) => (
            <li key={fact} className="flex items-center gap-3 py-2">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-primary-dark" />
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
