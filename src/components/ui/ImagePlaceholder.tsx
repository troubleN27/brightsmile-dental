import { ImageIcon, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  /** Same aspect ratio as the future photo, e.g. "4 / 5" or "16 / 9" */
  ratio: string;
  /** Describes the future photo, used as the accessible name */
  label: string;
  icon?: LucideIcon;
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
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full items-center justify-center overflow-hidden rounded-card",
        "bg-[radial-gradient(circle_at_30%_20%,#ccfbf1,transparent_60%),linear-gradient(135deg,#f0fdfa,#e6fffa)]",
        "border border-primary/15",
        className,
      )}
    >
      <Icon aria-hidden className="size-10 text-primary/60" strokeWidth={1.5} />
    </div>
  );
}
