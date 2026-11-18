import { Armchair, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/config/site";

const items = ["painless", "equipment", "warranty", "installments", "kids", "everyday"] as const;

/** Wide photo band: clinic room under a blue-to-violet tint, reasons with check marks. */
export function Advantages() {
  const t = useTranslations("Advantages");

  return (
    <section id="advantages" className="relative overflow-hidden bg-ink py-16 md:py-24">
      <div className="absolute inset-0">
        <Photo
          src="/images/clinic/room-wide.webp"
          alt={t("photoAlt")}
          width={2400}
          height={1340}
          sizes="100vw"
          fill
          square
          placeholderIcon={Armchair}
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-brand-overlay"
      />

      <Container className="relative">
        <SectionTitle tone="light" align="center" title={t("title")} subtitle={t("subtitle")} />
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((key) => (
            <li key={key} className="flex gap-4">
              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/40">
                <Check aria-hidden className="size-4 text-white" strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {t(`items.${key}.title`, { years: site.stats.warrantyYears })}
                </h3>
                <p className="mt-1.5 text-white/85">{t(`items.${key}.text`)}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
