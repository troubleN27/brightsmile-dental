import { Gift, ScanLine } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { sectionHref } from "@/components/layout/nav-items";
import { Link } from "@/i18n/navigation";

export function Offer() {
  const t = useTranslations("Offer");

  return (
    <section id="offer" className="py-16 md:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] bg-primary-dark px-6 py-10 text-white md:px-12 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full bg-primary/40 blur-3xl"
          />
          <ScanLine
            aria-hidden
            strokeWidth={1}
            className="pointer-events-none absolute -right-6 -bottom-10 hidden size-72 text-white/10 md:block"
          />
          <div className="relative max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-warning px-3.5 py-1.5 text-sm font-bold text-navy">
              <Gift aria-hidden className="size-4" />
              {t("badge")}
            </p>
            <h2 className="mt-5 text-h2 text-balance">{t("title")}</h2>
            <p className="mt-4 text-lg leading-8 text-white/90 text-pretty">{t("text")}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary-dark hover:bg-surface hover:text-primary-dark"
              >
                <Link href={sectionHref("booking")}>{t("cta")}</Link>
              </Button>
              <p className="text-sm text-white/80">{t("note")}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
