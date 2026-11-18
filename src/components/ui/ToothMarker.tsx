import { cn } from "@/lib/utils";

// Same tooth outline as the logo
const TOOTH_PATH =
  "M14.6 9.5c-3.4 0-5.6 2.6-5.6 6 0 2.6.8 4.3 1.6 6.3.7 1.8 1.1 3.8 1.4 6 .4 2.4 1 4.2 2.4 4.2 1.5 0 1.9-1.8 2.4-4 .4-1.8.8-3.3 3.2-3.3s2.8 1.5 3.2 3.3c.5 2.2.9 4 2.4 4 1.4 0 2-1.8 2.4-4.2.3-2.2.7-4.2 1.4-6 .8-2 1.6-3.7 1.6-6.3 0-3.4-2.2-6-5.6-6-2.2 0-3.3 1.1-5.4 1.1s-3.2-1.1-5.4-1.1Z";

type ToothMarkerProps = {
  /** Shown in the crown of the tooth */
  number: number;
  /** Unique per page: the gradient id inside the SVG is built from it */
  id: string;
  size?: "sm" | "md";
  /** "white" for gradient backgrounds where a coloured tooth would blend in */
  tone?: "gradient" | "white";
};

/** Step number inside a tooth: sky-to-violet on dark backgrounds, white on gradients. */
export function ToothMarker({ number, id, size = "md", tone = "gradient" }: ToothMarkerProps) {
  const gradientId = `tooth-${id}`;
  return (
    <div
      aria-hidden
      className={cn(
        "relative shrink-0",
        tone === "gradient"
          ? "drop-shadow-[0_10px_18px_rgba(14,165,233,0.35)]"
          : "drop-shadow-[0_10px_18px_rgba(11,31,58,0.35)]",
        size === "md" ? "size-16" : "size-10",
      )}
    >
      <svg viewBox="8 8 24 26" className="size-full">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#6d4fd4" />
          </linearGradient>
        </defs>
        <path d={TOOTH_PATH} fill={tone === "gradient" ? `url(#${gradientId})` : "#ffffff"} />
      </svg>
      <span
        className={cn(
          "absolute inset-x-0 top-[36%] -translate-y-1/2 text-center font-extrabold",
          tone === "gradient" ? "text-white" : "text-violet",
          size === "md" ? "text-xl" : "text-sm",
        )}
      >
        {number}
      </span>
    </div>
  );
}
