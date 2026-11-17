import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  /** Small label above the title, e.g. "Prices" */
  eyebrow?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-8 max-w-2xl md:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold tracking-wider text-primary-dark uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="text-h2 text-navy text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </div>
  );
}
