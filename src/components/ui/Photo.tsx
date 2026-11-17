import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";

type PhotoProps = {
  /** Path inside /public, e.g. "/images/hero.webp" */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Responsive sizes hint for next/image */
  sizes: string;
  /** Only for the above-the-fold hero image */
  preload?: boolean;
  placeholderIcon?: LucideIcon;
  placeholderTone?: "brand" | "muted";
  /** Cover the positioned parent instead of keeping the photo's own ratio */
  fill?: boolean;
  /** Square corners, for full-bleed photos */
  square?: boolean;
  className?: string;
};

function publicFileExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src));
}

/**
 * Renders the photo once it is added to /public, otherwise a placeholder of the
 * same proportions. Swapping in real photos needs no code changes.
 * Server-only: checks the file system at render (build) time.
 */
export function Photo({
  src,
  alt,
  width,
  height,
  sizes,
  preload = false,
  placeholderIcon,
  placeholderTone,
  fill = false,
  square = false,
  className,
}: PhotoProps) {
  if (!publicFileExists(src)) {
    return (
      <ImagePlaceholder
        ratio={fill ? undefined : `${width} / ${height}`}
        label={alt}
        icon={placeholderIcon}
        tone={placeholderTone}
        square={square}
        className={className}
      />
    );
  }

  const rounding = square ? "rounded-none" : "rounded-card";

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className={cn("object-cover", rounding, className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      preload={preload}
      className={cn("h-auto w-full object-cover", rounding, className)}
    />
  );
}
