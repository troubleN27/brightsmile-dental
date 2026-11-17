import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  title,
  subtitle,
  align = "left",
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
      <h2 className="text-h2 text-navy text-balance">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground text-pretty">{subtitle}</p>
      )}
    </div>
  );
}
