import { cn } from "@/lib/utils";

type LogoProps = {
  /** "light" is for dark backgrounds such as the footer, "brand" for the teal header */
  tone?: "dark" | "light" | "brand";
  className?: string;
};

export function Logo({ tone = "dark", className }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        aria-hidden
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        fill="none"
      >
        <rect width="40" height="40" rx="12" fill="#14B8A6" />
        <path
          d="M14.6 9.5c-3.4 0-5.6 2.6-5.6 6 0 2.6.8 4.3 1.6 6.3.7 1.8 1.1 3.8 1.4 6 .4 2.4 1 4.2 2.4 4.2 1.5 0 1.9-1.8 2.4-4 .4-1.8.8-3.3 3.2-3.3s2.8 1.5 3.2 3.3c.5 2.2.9 4 2.4 4 1.4 0 2-1.8 2.4-4.2.3-2.2.7-4.2 1.4-6 .8-2 1.6-3.7 1.6-6.3 0-3.4-2.2-6-5.6-6-2.2 0-3.3 1.1-5.4 1.1s-3.2-1.1-5.4-1.1Z"
          fill="#fff"
        />
        <path
          d="M25.5 13.2c.9.4 1.5 1.3 1.6 2.4"
          stroke="#14B8A6"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          "text-lg leading-none font-extrabold tracking-tight whitespace-nowrap",
          tone === "dark" ? "text-navy" : "text-white",
        )}
      >
        BrightSmile
        <span
          className={cn(
            "font-semibold",
            tone === "dark" && "text-primary-dark",
            tone === "light" && "text-primary",
            tone === "brand" && "text-mint",
          )}
        >
          {" "}
          Dental
        </span>
      </span>
    </span>
  );
}
