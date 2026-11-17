import { Baby } from "lucide-react";
import { useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

const points = ["firstVisit", "short", "parent"] as const;

/** Mirror of the hero: photo bleeds to the left edge, framed text box on the right. */
export function Kids() {
  const t = useTranslations("Kids");

  return (
    <section id="kids" className="relative py-16 md:py-24 lg:py-0">
      <div className="relative aspect-[4/3] lg:absolute lg:inset-y-16 lg:left-0 lg:aspect-auto lg:w-1/2">
        <Photo
          src="/images/kids.webp"
          alt={t("photoAlt")}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 50vw, 100vw"
          fill
          square
          placeholderIcon={Baby}
        />
      </div>

      <Container className="relative z-10 pt-10 lg:flex lg:justify-end lg:py-28">
        <div className="lg:w-[56%] lg:border lg:border-navy/15 lg:bg-white lg:p-10 xl:px-12">
          <h2 className="text-h2 text-navy text-balance">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground text-pretty">{t("text")}</p>
          <ul className="mt-6 space-y-3 border-t border-border pt-6">
            {points.map((key) => (
              <li key={key} className="text-navy/85">
                <span className="font-bold text-navy">{t(`points.${key}.title`)}</span>{" "}
                {t(`points.${key}.text`)}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8">
            <BookingLink serviceId="kids-checkup">{t("cta")}</BookingLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
