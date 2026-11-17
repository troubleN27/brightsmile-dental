import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Same aspect ratio as the future photo, e.g. "4 / 5"; omit to fill the parent */
  ratio?: string;
  /** Describes the future photo, used as the accessible name */
  label: string;
  icon?: LucideIcon;
  /** "muted" is a cooler grey variant, e.g. for "before" shots */
  tone?: "brand" | "muted";
  /** Square corners, for full-bleed photos */
  square?: boolean;
  className?: string;
};

/**
 * Brand-coloured block shown until the real photo is placed in public/images.
 * Keeps exactly the same proportions so the layout does not shift later.
 */
export function ImagePlaceholder({
  ratio,
  label,
  icon: Icon = ImageIcon,
  tone = "brand",
  square = false,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={ratio ? { aspectRatio: ratio } : undefined}
      className={cn(
        "flex w-full items-center justify-center overflow-hidden",
        square ? "rounded-none" : "rounded-card",
        !ratio && "h-full",
        tone === "brand"
          ? "border border-primary/15 bg-[radial-gradient(circle_at_30%_20%,#ccfbf1,transparent_60%),linear-gradient(135deg,#f0fdfa,#e6fffa)]"
          : "border border-slate-300/60 bg-[radial-gradient(circle_at_30%_20%,#f1f5f9,transparent_60%),linear-gradient(135deg,#e2e8f0,#cbd5e1)]",
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-10", tone === "brand" ? "text-primary/60" : "text-slate-500/70")}
        strokeWidth={1.5}
      />
    </div>
  );
}
