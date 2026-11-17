import {
  Baby,
  CalendarCheck,
  HeartHandshake,
  Microscope,
  ShieldCheck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/config/site";

const items: { key: string; icon: LucideIcon }[] = [
  { key: "painless", icon: HeartHandshake },
  { key: "equipment", icon: Microscope },
  { key: "warranty", icon: ShieldCheck },
  { key: "installments", icon: Wallet },
  { key: "kids", icon: Baby },
  { key: "everyday", icon: CalendarCheck },
];

export function Advantages() {
  const t = useTranslations("Advantages");

  return (
    <section id="advantages" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {items.map(({ key, icon: Icon }) => (
            <li
              key={key}
              className="rounded-card bg-white p-6 ring-1 ring-primary/10 transition-shadow hover:shadow-[0_16px_40px_-20px_rgba(15,118,110,0.35)] md:p-7"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-button bg-primary/15 text-primary-dark">
                <Icon aria-hidden className="size-6" />
              </span>
              <h3 className="text-lg font-bold text-navy">
                {t(`items.${key}.title`, { years: site.stats.warrantyYears })}
              </h3>
              <p className="mt-2 text-muted-foreground">{t(`items.${key}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
