import { Baby, UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { getDoctor } from "@/data/doctors";
import type { Locale } from "@/i18n/routing";

const facts = ["firstVisit", "short", "parent"] as const;

/** Rounded photo with an age badge, three short facts, the pediatric dentist and two actions. */
export function Kids() {
  const t = useTranslations("Kids");
  const tDoctors = useTranslations("Doctors");
  const locale = useLocale() as Locale;
  const doctor = getDoctor("olga-granina");

  return (
    <section id="kids" className="bg-lavender py-16 md:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(109,79,212,0.45)]">
            <Photo
              src="/images/kids.webp"
              alt={t("photoAlt")}
              width={1600}
              height={1200}
              sizes="(min-width: 1024px) 520px, 100vw"
              square
              placeholderIcon={Baby}
            />
          </div>
          <p className="absolute top-4 left-4 rounded-full bg-white px-4 py-2 text-sm font-bold text-violet shadow-[0_8px_24px_-12px_rgba(11,31,58,0.5)]">
            {t("badge")}
          </p>
        </div>

        <div>
          <h2 className="text-h2 text-navy text-balance">{t("title")}</h2>
          <p className="mt-4 text-lg leading-8 text-navy/80 text-pretty">{t("text")}</p>

          <ul className="mt-8 grid gap-2 sm:grid-cols-3 sm:gap-3">
            {facts.map((key) => (
              <li key={key} className="flex items-baseline gap-3 rounded-card bg-white px-4 py-3 sm:block sm:py-5">
                <p className="shrink-0 text-lg font-extrabold whitespace-nowrap text-violet sm:text-xl">{t(`facts.${key}.value`)}</p>
                <p className="text-sm leading-5 text-muted-foreground sm:mt-1">{t(`facts.${key}.label`)}</p>
              </li>
            ))}
          </ul>

          {doctor && (
            <div className="mt-6 flex items-center gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
                <Photo
                  src={doctor.photo}
                  alt=""
                  width={960}
                  height={1200}
                  sizes="56px"
                  fill
                  square
                  className="object-[50%_20%]"
                  placeholderIcon={UserRound}
                />
              </div>
              <p>
                <span className="block font-bold text-navy">{doctor.name[locale]}</span>
                <span className="text-sm text-muted-foreground">
                  {doctor.specialty[locale]}, {tDoctors("experience", { years: doctor.experienceYears }).toLowerCase()}
                </span>
              </p>
            </div>
          )}

          <Button asChild size="lg" className="mt-8">
            <BookingLink serviceId="kids-checkup">{t("cta")}</BookingLink>
          </Button>
        </div>
      </Container>
    </section>
  );
}
