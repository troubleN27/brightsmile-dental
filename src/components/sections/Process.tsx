import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = ["request", "call", "consultation", "treatment"] as const;

export function Process() {
  const t = useTranslations("Process");

  return (
    <section id="process" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, index) => (
            <li key={step} className="relative rounded-card bg-white p-6 ring-1 ring-primary/10">
              <span
                aria-hidden
                className="flex size-11 items-center justify-center rounded-full bg-navy text-lg font-extrabold text-white"
              >
                {index + 1}
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-[46px] right-[-26px] hidden h-0.5 w-8 bg-primary/40 lg:block"
                />
              )}
              <h3 className="mt-5 text-lg font-bold text-navy">{t(`steps.${step}.title`)}</h3>
              <p className="mt-2 text-muted-foreground">{t(`steps.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
