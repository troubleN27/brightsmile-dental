import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = ["request", "call", "consultation", "treatment"] as const;

export function Process() {
  const t = useTranslations("Process");

  return (
    <section id="process" className="bg-surface py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        <ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step} className="border-t-2 border-navy py-6">
              <h3 className="text-lg font-bold text-navy">
                <span className="mr-2 text-primary-dark">{index + 1}.</span>
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 text-muted-foreground">{t(`steps.${step}.text`)}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
