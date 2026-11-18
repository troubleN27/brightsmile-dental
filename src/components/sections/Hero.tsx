import { Smile } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { Wave } from "@/components/ui/Wave";
import { sectionHref } from "@/components/layout/nav-items";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";

export function Hero() {
  const t = useTranslations("Hero");
  const format = useFormatter();
  const { years, patients, rating } = site.stats;

  return (
    // Teal band continuing the header; on desktop the photo bleeds to the right
    // edge and the white text box overlaps it. A wave leads into the next section.
    <section className="relative overflow-hidden bg-teal-gradient">
      <Container className="relative z-10 pt-6 pb-10 md:pt-10 lg:pt-20 lg:pb-32">
        <div className="bg-white p-6 shadow-[0_30px_60px_-30px_rgba(4,47,46,0.7)] sm:p-8 lg:w-[64%] lg:p-10 xl:w-[58%] xl:px-12">
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

      <div className="relative aspect-[3/2] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2">
        <Photo
          src="/images/hero.webp"
          alt={t("photoAlt")}
          width={1500}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 100vw"
          preload
          fill
          square
          // People sit right of centre in the shot; keep them in the crop
          className="object-[70%_50%]"
          placeholderIcon={Smile}
        />
      </div>

      <Wave className="text-mint" />
    </section>
  );
}
