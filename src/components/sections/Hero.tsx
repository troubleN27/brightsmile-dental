import { Smile } from "lucide-react";
import { useFormatter, useTranslations } from "next-intl";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
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
    // Phones: the whole 16:9 video sits as a strip under the header, text follows
    // on dark blue. From 768px: the video fills the section under the see-through
    // header with a dark overlay and the text centred on top. A wave closes it.
    <section className="relative -mt-16 overflow-hidden bg-ink md:flex md:min-h-[640px] md:items-center lg:-mt-20 lg:min-h-[740px]">
      <div className="relative mt-16 aspect-video md:absolute md:inset-0 md:mt-0 md:aspect-auto">
        {/* Poster = first frame of the video: it is the LCP image and what
            reduced-motion visitors see */}
        <Photo
          src="/images/hero.webp"
          alt={t("photoAlt")}
          width={1920}
          height={1080}
          sizes="100vw"
          preload
          fill
          square
          placeholderIcon={Smile}
        />
        <AutoplayVideo src="/videos/hero" mobileSrc="/videos/hero-mobile" />
        {/* Phones: only fade the bottom edge into the text area; desktop: full tint */}
        <div
          aria-hidden
          className="absolute inset-0 bg-hero-overlay"
        />
      </div>

      <Container className="relative z-10 pt-6 pb-24 text-center md:pt-32 md:pb-28 lg:pt-40 lg:pb-36">
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
