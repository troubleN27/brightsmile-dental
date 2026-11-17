import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  /** Headings are left-aligned; "center" is for the rare centered block */
  align?: "left" | "center";
  /** For headings on dark backgrounds */
  tone?: "dark" | "light";
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10 max-w-2xl md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <h2 className={cn("type-h2 text-balance", tone === "dark" ? "text-navy" : "text-white")}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-[60ch] text-pretty",
            tone === "dark" ? "text-muted-foreground" : "text-white/75",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
