import { cn } from "@/lib/utils";

type SectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** "light" for dark blue and gradient sections */
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
        "mb-8 max-w-2xl md:mb-12",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {/* Plain string, not cn(): tailwind-merge mistakes text-h2 for a colour and drops it */}
      <h2 className={`text-h2 text-balance ${tone === "dark" ? "text-navy" : "text-white"}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-lg text-pretty",
            tone === "dark" ? "text-muted-foreground" : "text-white/85",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
