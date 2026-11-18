import { Armchair } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/config/site";

const items = ["painless", "equipment", "warranty", "installments", "kids", "everyday"] as const;

export function Advantages() {
  const t = useTranslations("Advantages");

  return (
    <section id="advantages" className="bg-mint py-16 md:py-24">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div>
          <SectionTitle title={t("title")} subtitle={t("subtitle")} className="md:mb-10" />
          <div className="hidden max-w-sm lg:block">
            <Photo
              src="/images/clinic/room.webp"
              alt={t("photoAlt")}
              width={1200}
              height={1500}
              sizes="384px"
              square
              placeholderIcon={Armchair}
            />
          </div>
        </div>

        <ul className="border-b border-navy/10 lg:self-center">
          {items.map((key) => (
            <li
              key={key}
              className="grid gap-2 border-t border-navy/10 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8"
            >
              <h3 className="text-lg font-bold text-navy">
                {t(`items.${key}.title`, { years: site.stats.warrantyYears })}
              </h3>
              <p className="text-muted-foreground">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
