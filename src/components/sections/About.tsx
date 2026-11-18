import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { sectionHref } from "@/components/layout/nav-items";
import { doctors } from "@/data/doctors";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

/** Short word from the chief dentist, next to her portrait. */
export function About() {
  const t = useTranslations("About");
  const locale = useLocale() as Locale;
  const chief = doctors[0];

  return (
    <section id="about" className="bg-surface pt-8 pb-16 md:pb-24">
      <Container className="grid items-center gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
        <div className="mx-auto w-full max-w-sm md:max-w-none">
          <div className="overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-30px_rgba(3,105,161,0.45)]">
            <Photo
              src={chief.photo}
              alt={t("photoAlt", { name: chief.name[locale] })}
              width={960}
              height={1200}
              sizes="(min-width: 768px) 400px, 100vw"
              square
              placeholderIcon={UserRound}
            />
          </div>
        </div>

        <div>
          <h2 className="text-h2 text-navy text-balance">{t("title")}</h2>
          <p className="mt-5 text-lg leading-8 text-navy/80 text-pretty">{t("text1")}</p>
          <p className="mt-4 text-lg leading-8 text-navy/80 text-pretty">{t("text2")}</p>
          <p className="mt-6 border-l-2 border-sky pl-4">
            <span className="block font-bold text-navy">{chief.name[locale]}</span>
            <span className="text-sm text-muted-foreground">{t("role")}</span>
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href={sectionHref("booking")}>{t("cta")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
