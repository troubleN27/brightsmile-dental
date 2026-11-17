import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Same aspect ratio as the future photo, e.g. "4 / 5" or "16 / 9" */
  ratio: string;
  /** Describes the future photo, used as the accessible name */
  label: string;
  icon?: LucideIcon;
  /** "muted" is a cooler grey variant, e.g. for "before" shots */
  tone?: "brand" | "muted";
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
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-card",
        tone === "brand" ? "bg-sky" : "bg-[#dfe5ec]",
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-10", tone === "brand" ? "text-primary-dark/40" : "text-slate-500/60")}
        strokeWidth={1.5}
      />
    </div>
  );
}
