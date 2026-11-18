import { Building2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AutoplayVideo } from "@/components/ui/AutoplayVideo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { sectionHref } from "@/components/layout/nav-items";
import { Link } from "@/i18n/navigation";

/** Gradient band: a short clinic tour plays by itself next to the free consultation offer. */
export function Offer() {
  const t = useTranslations("Offer");

  return (
    <section id="offer" className="bg-brand-gradient py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-16">
        <div className="relative aspect-video overflow-hidden rounded-card shadow-[0_30px_60px_-30px_rgba(11,31,58,0.8)] ring-1 ring-white/25">
          <Photo
            src="/images/tour.webp"
            alt={t("videoAlt")}
            width={1920}
            height={1080}
            sizes="(min-width: 1024px) 620px, 100vw"
            fill
            square
            placeholderIcon={Building2}
          />
          <AutoplayVideo src="/videos/tour" />
        </div>

        <div>
          <p className="font-semibold text-white/90">{t("badge")}</p>
          <h2 className="mt-3 text-h2 text-white">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-white/85 text-pretty">{t("text")}</p>
          <Button asChild size="lg" className="mt-8 bg-white text-violet hover:bg-surface">
            <Link href={sectionHref("booking")}>{t("cta")}</Link>
          </Button>
          <p className="mt-3 text-sm text-white/80">{t("note")}</p>
        </div>
      </Container>
    </section>
  );
}
