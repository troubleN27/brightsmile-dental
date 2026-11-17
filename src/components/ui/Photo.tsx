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
  className,
}: PhotoProps) {
  if (!publicFileExists(src)) {
    return (
      <ImagePlaceholder
        ratio={`${width} / ${height}`}
        label={alt}
        icon={placeholderIcon}
        tone={placeholderTone}
        className={className}
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
      className={cn("h-auto w-full rounded-card object-cover", className)}
    />
  );
}
