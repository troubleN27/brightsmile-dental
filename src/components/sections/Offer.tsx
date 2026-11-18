import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { sectionHref } from "@/components/layout/nav-items";
import { Link } from "@/i18n/navigation";

export function Offer() {
  const t = useTranslations("Offer");

  return (
    <section id="offer" className="bg-sand py-16 md:py-24">
      <Container>
        <div className="grid gap-8 border-y border-navy/15 py-10 md:py-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:items-end lg:gap-16">
          <div>
            <p className="font-semibold text-primary-dark">{t("badge")}</p>
            <h2 className="mt-3 text-h2 text-navy">{t("title")}</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground text-pretty">
              {t("text")}
            </p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Button asChild size="lg">
              <Link href={sectionHref("booking")}>{t("cta")}</Link>
            </Button>
            <p className="text-sm text-muted-foreground">{t("note")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
