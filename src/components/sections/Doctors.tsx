import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { doctors } from "@/data/doctors";
import type { Locale } from "@/i18n/routing";

export function Doctors() {
  const t = useTranslations("Doctors");
  const locale = useLocale() as Locale;

  return (
    <section id="doctors" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => {
            const name = doctor.name[locale];
            const specialty = doctor.specialty[locale];
            return (
              <li key={doctor.id} className="flex flex-col">
                <Photo
                  src={doctor.photo}
                  alt={t("photoAlt", { name, specialty })}
                  width={600}
                  height={750}
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 100vw"
                  placeholderIcon={UserRound}
                  className="bg-white"
                />
                <h3 className="type-h3 mt-5 text-navy">{name}</h3>
                <p className="mt-1 text-[15px] text-navy/75">{specialty}</p>
                <p className="mt-1 mb-4 text-[15px] text-muted-foreground">
                  {t("experience", { years: doctor.experienceYears })}
                </p>
                <BookingLink
                  doctorId={doctor.id}
                  aria-label={`${t("book")}: ${name}`}
                  className="mt-auto w-fit text-[15px] font-semibold text-primary-dark underline decoration-primary-dark/30 underline-offset-4 hover:decoration-primary-dark"
                >
                  {t("book")}
                </BookingLink>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
