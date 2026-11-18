import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { BookingLink } from "@/components/ui/BookingLink";
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
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-28 grid gap-x-8 gap-y-28 sm:grid-cols-2 xl:grid-cols-4">
          {doctors.map((doctor) => {
            const name = doctor.name[locale];
            const specialty = doctor.specialty[locale];
            return (
              <li
                key={doctor.id}
                className="flex flex-col items-center rounded-card bg-white px-6 pb-7 text-center md:px-7 shadow-[0_24px_48px_-30px_rgba(3,105,161,0.5)]"
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
                <h3 className="mt-6 text-lg font-bold text-navy">{name}</h3>
                <p className="mt-1.5 text-primary-dark">{specialty}</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {t("experience", { years: doctor.experienceYears })}
                </p>
                <p className="mt-5 text-[15px] leading-7 text-navy/85 text-pretty">
                  {doctor.bio[locale]}
                </p>
                <p className="mt-6 mb-6 w-full border-t border-border pt-5 text-[13px] leading-5 text-muted-foreground text-pretty">
                  <span className="mb-1 block font-semibold text-navy/70">{t("education")}</span>
                  {doctor.education[locale]}
                </p>
                {/* A quiet link rather than a button: the main call to action is elsewhere */}
                <BookingLink
                  doctorId={doctor.id}
                  aria-label={`${t("book")}: ${name}`}
                  className="mt-auto rounded-button font-semibold text-violet underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-sky focus-visible:outline-none"
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
