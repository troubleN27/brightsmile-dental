import { cn } from "@/lib/utils";

type WaveProps = {
  /** Text colour class = colour of the section below, e.g. "text-mint" */
  className?: string;
};

/** Soft wave at the bottom of a coloured band, filled with the next section's colour. */
export function Wave({ className }: WaveProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={cn("pointer-events-none absolute inset-x-0 bottom-0 z-20 h-12 w-full md:h-20 lg:h-24", className)}
    >
      <path
        fill="currentColor"
        d="M0 72C180 24 360 8 560 34s380 78 600 58c120-11 210-40 280-62v90H0Z"
      />
    </svg>
  );
}
