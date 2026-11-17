import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";

const steps = ["request", "call", "consultation", "treatment"] as const;

export function Process() {
  const t = useTranslations("Process");

  return (
    <section id="process" className="py-16 md:py-24">
      <Container>
        <SectionTitle title={t("title")} subtitle={t("subtitle")} />
        {/* A real sequence, so numbers and a connecting line make sense here */}
        <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-8">
          <span
            aria-hidden
            // Runs from the first circle to the last one: a column is 25% minus 3/4 of the 32px gap
            className="absolute top-5 bottom-5 left-5 w-px bg-line lg:top-5 lg:right-[calc(25%-44px)] lg:bottom-auto lg:left-5 lg:h-px lg:w-auto"
          />
          {steps.map((step, index) => (
            <li key={step} className="relative grid grid-cols-[40px_1fr] gap-5 lg:block">
              <span
                aria-hidden
                className="relative flex size-10 items-center justify-center rounded-full bg-sky text-[15px] font-bold text-primary-dark ring-8 ring-paper"
              >
                {index + 1}
              </span>
              <div className="lg:mt-6 lg:pr-4">
                <h3 className="type-h3 text-navy">{t(`steps.${step}.title`)}</h3>
                <p className="mt-2 text-[16px] leading-[26px] text-muted-foreground">{t(`steps.${step}.text`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
