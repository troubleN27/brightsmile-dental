import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/config/site";

const items = ["painless", "equipment", "warranty", "installments", "kids", "everyday"] as const;

export function Advantages() {
  const t = useTranslations("Advantages");

  return (
    <section id="advantages" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid gap-x-16 md:grid-cols-2">
          {items.map((key) => (
            <li key={key} className="border-t border-navy/10 py-6 md:py-7">
              <h3 className="text-lg font-bold text-navy">
                {t(`items.${key}.title`, { years: site.stats.warrantyYears })}
              </h3>
              <p className="mt-2 max-w-lg text-muted-foreground">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
