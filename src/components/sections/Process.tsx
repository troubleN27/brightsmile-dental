import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ToothMarker } from "@/components/ui/ToothMarker";
import { cn } from "@/lib/utils";

const steps = ["request", "call", "consultation", "treatment"] as const;

/**
 * Four steps as teeth along a smile. Desktop: a dashed arc links the markers,
 * the middle two sit lower to follow the curve. Below 1024px: a vertical
 * timeline with a dashed line between markers.
 */
export function Process() {
  const t = useTranslations("Process");

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-16 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(14,165,233,0.16)_0%,transparent_65%)]"
      />
      <Container className="relative">
        <SectionTitle tone="light" align="center" title={t("title")} subtitle={t("subtitle")} />

        <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
          {/* Smile arc behind the markers (desktop only) */}
          <svg
            aria-hidden
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-[100px] w-full lg:block"
          >
            <path
              d="M125 32 Q500 130 875 32"
              fill="none"
              stroke="#7dd3fc"
              strokeOpacity="0.45"
              strokeWidth="2"
              strokeDasharray="6 8"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            return (
              <li
                key={step}
                className={cn(
                  "relative flex gap-5 pb-10 lg:flex-col lg:items-center lg:pb-0 lg:text-center",
                  // Middle teeth sit lower so the four follow the smile curve
                  (index === 1 || index === 2) && "lg:mt-11",
                )}
              >
                {/* Vertical dashed connector on phones and tablets */}
                {!isLast && (
                  <span
                    aria-hidden
                    className="absolute top-16 bottom-2 left-8 border-l-2 border-dashed border-sky-light/40 lg:hidden"
                  />
                )}
                <ToothMarker number={index + 1} id={`process-${index}`} />
                <div className="pt-2 lg:pt-4">
                  <h3 className="text-lg font-bold text-white">{t(`steps.${step}.title`)}</h3>
                  <p className="mt-2 text-white/80 text-pretty lg:mx-auto lg:max-w-[16rem]">
                    {t(`steps.${step}.text`)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
