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
    <section>
      <Container className="grid items-center gap-10 pt-8 pb-16 md:pt-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24">
        <div>
          <h1 className="text-h1 text-navy text-balance">{t("title")}</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-13 py-3 text-center whitespace-normal">
              <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={sectionHref("services")}>{t("ctaSecondary")}</Link>
            </Button>
          </div>

          <p className="mt-10 max-w-xl border-t border-border pt-6 leading-7 text-navy/80 text-pretty">
            {t("facts", {
              years,
              patients: format.number(patients),
              rating: format.number(rating),
            })}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md lg:max-w-none">
          <Photo
            src="/images/hero.webp"
            alt={t("photoAlt")}
            width={960}
            height={1200}
            sizes="(min-width: 1024px) 520px, (min-width: 640px) 448px, 100vw"
            preload
            placeholderIcon={Smile}
          />
        </div>
      </Container>
    </section>
  );
}
