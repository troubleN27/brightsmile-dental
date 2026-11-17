import { Smile } from "lucide-react";
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
  const { years, patients, rating } = site.stats;

  return (
    // On desktop the lower part of the section turns grey, the photo bleeds to
    // the right edge and the framed text box overlaps it
    <section className="relative">
      <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-[38%] bg-mist lg:block" />
      <Container className="relative z-10 pt-8 pb-10 md:pt-12 lg:py-24">
        <div className="lg:w-[64%] lg:border lg:border-navy/15 lg:bg-white lg:p-10 xl:w-[58%] xl:px-12">
          <h1 className="text-h1 text-navy text-balance">{t("title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="h-auto min-h-13 py-3 text-center whitespace-normal">
              <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="link" className="px-2 text-primary-dark">
              <Link href={sectionHref("services")}>{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <p className="mt-8 max-w-xl border-t border-border pt-6 text-[15px] leading-7 text-navy/75 text-pretty">
            {t("facts", {
              years,
              patients: format.number(patients),
              rating: format.number(rating),
            })}
          </p>
        </div>
      </Container>

      <div className="relative aspect-[3/2] lg:absolute lg:top-0 lg:right-0 lg:bottom-20 lg:aspect-auto lg:w-1/2">
        <Photo
          src="/images/hero.webp"
          alt={t("photoAlt")}
          width={1500}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 100vw"
          preload
          fill
          square
          placeholderIcon={Smile}
        />
      </div>
    </section>
  );
}
