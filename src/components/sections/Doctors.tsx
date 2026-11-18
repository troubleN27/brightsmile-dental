import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { doctors } from "@/data/doctors";
import type { Locale } from "@/i18n/routing";

/** White cards with a round portrait that sits half above the card. */
export function Doctors() {
  const t = useTranslations("Doctors");
  const locale = useLocale() as Locale;

  return (
    <section id="doctors" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle align="center" title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-20 grid gap-x-6 gap-y-24 sm:grid-cols-2 xl:grid-cols-4">
          {doctors.map((doctor) => {
            const name = doctor.name[locale];
            const specialty = doctor.specialty[locale];
            return (
              <li
                key={doctor.id}
                className="flex flex-col items-center rounded-card bg-white px-5 pb-6 text-center shadow-[0_24px_48px_-30px_rgba(3,105,161,0.5)]"
              >
                <div className="relative -mt-16 size-36 overflow-hidden rounded-full bg-surface ring-6 ring-white">
                  <Photo
                    src={doctor.photo}
                    alt={t("photoAlt", { name, specialty })}
                    width={960}
                    height={1200}
                    sizes="144px"
                    fill
                    square
                    className="object-[50%_20%]"
                    placeholderIcon={UserRound}
                  />
                </div>
                <h3 className="mt-5 text-lg font-bold text-navy">{name}</h3>
                <p className="mt-1 text-primary-dark">{specialty}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("experience", { years: doctor.experienceYears })}
                </p>
                <p className="mt-4 text-[15px] leading-6 text-navy/85 text-pretty">
                  {doctor.bio[locale]}
                </p>
                <p className="mt-4 mb-5 w-full border-t border-border pt-4 text-[13px] leading-5 text-muted-foreground text-pretty">
                  <span className="block font-semibold text-navy/70">{t("education")}</span>
                  {doctor.education[locale]}
                </p>
                <Button asChild variant="outline" className="mt-auto w-full">
                  <BookingLink doctorId={doctor.id} aria-label={`${t("book")}: ${name}`}>
                    {t("book")}
                  </BookingLink>
                </Button>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
