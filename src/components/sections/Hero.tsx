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
    // Full-width photo under the see-through header, dark blue overlay keeps
    // the centred white text readable; a wave leads into the next section
    <section className="relative -mt-16 flex min-h-[640px] items-center overflow-hidden bg-ink lg:-mt-20 lg:min-h-[740px]">
      <div className="absolute inset-0">
        <Photo
          src="/images/hero.webp"
          alt={t("photoAlt")}
          width={2400}
          height={1340}
          sizes="100vw"
          preload
          fill
          square
          // People sit right of centre in the shot; keep them in the crop
          className="object-[70%_50%]"
          placeholderIcon={Smile}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,31,58,0.7)_0%,rgba(11,31,58,0.5)_45%,rgba(11,31,58,0.8)_100%)]"
      />

      <Container className="relative z-10 pt-32 pb-28 text-center lg:pt-40 lg:pb-36">
        <h1 className="mx-auto max-w-3xl text-h1 text-white text-balance lg:text-[60px] lg:leading-[68px]">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 text-pretty">
          {t("subtitle")}
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-auto min-h-13 py-3 text-center whitespace-normal">
            <Link href={sectionHref("booking")}>{t("ctaPrimary")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
          >
            <Link href={sectionHref("services")}>{t("ctaSecondary")}</Link>
          </Button>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-[15px] leading-7 text-white/80 text-pretty">
          {t("facts", {
            years,
            patients: format.number(patients),
            rating: format.number(rating),
          })}
        </p>
      </Container>

      <Wave className="text-surface" />
    </section>
  );
}
