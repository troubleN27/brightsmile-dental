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

// In production public/ never changes, so each check runs once per server
// instance. In development it is not cached, so newly added photos show up.
const existsCache = new Map<string, boolean>();
const cacheChecks = process.env.NODE_ENV === "production";

function publicFileExists(src: string) {
  const cached = cacheChecks ? existsCache.get(src) : undefined;
  if (cached !== undefined) return cached;
  const exists = existsSync(path.join(process.cwd(), "public", src));
  if (cacheChecks) existsCache.set(src, exists);
  return exists;
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
