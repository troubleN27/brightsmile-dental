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
    <section className="pt-8 pb-16 md:pt-14 md:pb-24">
      <Container>
        <h1 className="text-h1 max-w-[14ch] text-navy sm:max-w-none">{t("title")}</h1>

        <div className="mt-6 grid gap-8 md:mt-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <p className="max-w-[52ch] text-lg leading-8 text-navy/80 lg:col-span-6">{t("lead")}</p>

          <div className="lg:col-span-6 lg:col-start-7 lg:justify-self-end">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button asChild size="lg">
                <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
              </Button>
              <Link
                href={sectionHref("services")}
                className="font-semibold text-navy underline decoration-navy/25 underline-offset-[6px] transition-colors hover:decoration-navy"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
            <OpenStatus className="mt-5" />
          </div>
        </div>

        <figure className="mt-10 md:mt-14">
          <Photo
            src="/images/hero.webp"
            alt={t("photoAlt")}
            width={1600}
            height={1200}
            sizes="(min-width: 1248px) 1200px, 100vw"
            preload
            className="aspect-[4/3] max-h-[640px] rounded-[20px] object-cover md:aspect-[16/8]"
          />
        </figure>

        <ul className="mt-6 grid gap-x-10 gap-y-2 text-[15px] text-navy/70 sm:grid-cols-3 md:mt-8">
          {facts.map((fact) => (
            <li key={fact} className="border-t border-line pt-3">
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
