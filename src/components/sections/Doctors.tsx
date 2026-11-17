import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { doctors } from "@/data/doctors";
import type { Locale } from "@/i18n/routing";

export function Doctors() {
  const t = useTranslations("Doctors");
  const locale = useLocale() as Locale;

  return (
    <section id="doctors" className="py-16 md:py-24">
      <Container>
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => {
            const name = doctor.name[locale];
            const specialty = doctor.specialty[locale];
            return (
              <li
                key={doctor.id}
                className="flex flex-col"
              >
                <Photo
                  src={doctor.photo}
                  alt={t("photoAlt", { name, specialty })}
                  width={600}
                  height={750}
                  sizes="(min-width: 1024px) 270px, (min-width: 640px) 45vw, 100vw"
                  square
                  placeholderIcon={UserRound}
                />
                <div className="flex flex-1 flex-col pt-4">
                  <h3 className="text-lg font-bold text-navy">{name}</h3>
                  <p className="mt-1 text-primary-dark">{specialty}</p>
                  <p className="mt-1 mb-5 text-sm text-muted-foreground">
                    {t("experience", { years: doctor.experienceYears })}
                  </p>
                  <Button asChild variant="outline" className="mt-auto w-full">
                    <BookingLink doctorId={doctor.id} aria-label={`${t("book")}: ${name}`}>
                      {t("book")}
                    </BookingLink>
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
