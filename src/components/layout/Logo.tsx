import { cn } from "@/lib/utils";

type LogoProps = {
  /** "light" is for dark backgrounds such as the footer */
  tone?: "dark" | "light";
  className?: string;
};

/** Outline tooth mark + wordmark set in Lora */
export function Logo({ tone = "dark", className }: LogoProps) {
  const dark = tone === "dark";
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        aria-hidden
        viewBox="0 0 32 32"
        className={cn("size-7 shrink-0", dark ? "text-primary-dark" : "text-primary")}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M11.2 5.5c-3.2 0-5.2 2.4-5.2 5.6 0 2.4.8 4 1.5 5.9.7 1.7 1 3.6 1.3 5.7.4 2.3 1 3.8 2.2 3.8 1.4 0 1.8-1.7 2.2-3.7.4-1.7.8-3.1 2.8-3.1s2.4 1.4 2.8 3.1c.4 2 .8 3.7 2.2 3.7 1.2 0 1.8-1.5 2.2-3.8.3-2.1.6-4 1.3-5.7.7-1.9 1.5-3.5 1.5-5.9 0-3.2-2-5.6-5.2-5.6-2 0-3 1-4.8 1s-2.8-1-4.8-1Z" />
        <path d="M20.6 9.4c.9.4 1.5 1.2 1.6 2.3" />
      </svg>
      <span className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span
          className={cn(
            "font-serif text-[21px] leading-none font-semibold tracking-[-0.01em]",
            dark ? "text-navy" : "text-white",
          )}
        >
          BrightSmile
        </span>
        <span className={cn("text-sm leading-none font-medium", dark ? "text-muted-foreground" : "text-white/60")}>
          Dental
        </span>
      </span>
    </span>
  );
}
