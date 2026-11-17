import { cn } from "@/lib/utils";

type LogoProps = {
  /** "light" is for dark backgrounds such as the footer */
  tone?: "dark" | "light";
  className?: string;
};

/** Outline tooth mark on a soft blue circle + wordmark */
export function Logo({ tone = "dark", className }: LogoProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        aria-hidden
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          dark ? "bg-sky text-primary-dark" : "bg-white/10 text-primary",
        )}
      >
        <svg
          viewBox="0 0 32 32"
          className="size-[22px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.1"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          <path d="M11.2 5.5c-3.2 0-5.2 2.4-5.2 5.6 0 2.4.8 4 1.5 5.9.7 1.7 1 3.6 1.3 5.7.4 2.3 1 3.8 2.2 3.8 1.4 0 1.8-1.7 2.2-3.7.4-1.7.8-3.1 2.8-3.1s2.4 1.4 2.8 3.1c.4 2 .8 3.7 2.2 3.7 1.2 0 1.8-1.5 2.2-3.8.3-2.1.6-4 1.3-5.7.7-1.9 1.5-3.5 1.5-5.9 0-3.2-2-5.6-5.2-5.6-2 0-3 1-4.8 1s-2.8-1-4.8-1Z" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span
          className={cn(
            "text-[19px] leading-none font-extrabold tracking-[-0.03em]",
            dark ? "text-navy" : "text-white",
          )}
        >
          BrightSmile
        </span>
        <span
          className={cn(
            "text-[15px] leading-none font-medium tracking-[-0.01em]",
            dark ? "text-primary-dark" : "text-primary",
          )}
        >
          Dental
        </span>
      </span>
    </span>
  );
}
