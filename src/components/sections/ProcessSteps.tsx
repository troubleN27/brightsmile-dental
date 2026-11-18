import { useTranslations } from "next-intl";
import { ToothMarker } from "@/components/ui/ToothMarker";
import { cn } from "@/lib/utils";

const steps = ["request", "call", "consultation", "treatment"] as const;

/**
 * What happens after a request: four steps as white teeth along a smile.
 * Desktop: a dashed arc links the markers, the middle two sit lower to follow
 * the curve. Below 1024px: a vertical timeline with a dashed line between them.
 * Meant for the gradient booking band, so all text is white.
 */
export function ProcessSteps() {
  const t = useTranslations("Process");

  return (
    <ol className="relative grid gap-0 lg:grid-cols-4 lg:gap-8">
      <svg
        aria-hidden
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 hidden h-[100px] w-full lg:block"
      >
        <path
          d="M125 32 Q500 130 875 32"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
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
              "relative flex gap-5 pb-8 lg:flex-col lg:items-center lg:pb-0 lg:text-center",
              // Middle teeth sit lower so the four follow the smile curve
              (index === 1 || index === 2) && "lg:mt-11",
            )}
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute top-16 bottom-2 left-8 border-l-2 border-dashed border-white/40 lg:hidden"
              />
            )}
            <ToothMarker number={index + 1} id={`process-${index}`} tone="white" />
            <div className="pt-2 lg:pt-4">
              <h3 className="text-lg font-bold text-white">{t(`steps.${step}.title`)}</h3>
              <p className="mt-2 text-white/85 text-pretty lg:mx-auto lg:max-w-[16rem]">
                {t(`steps.${step}.text`)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
