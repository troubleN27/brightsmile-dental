"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AutoplayVideoProps = {
  /** Path without extension inside /public, e.g. "/videos/hero" (.webm and .mp4 must exist) */
  src: string;
  /** Optional lighter, phone-shaped version used below 768px, e.g. "/videos/hero-mobile" */
  mobileSrc?: string;
  className?: string;
};

const MOBILE_QUERY = "(max-width: 767px)";

/**
 * Muted looping video laid over a poster image that the parent renders underneath.
 * Nothing is downloaded until the block scrolls into view, and never for visitors
 * who prefer reduced motion or use data saver. It fades in once playing and
 * pauses while off screen.
 */
export function AutoplayVideo({ src, mobileSrc, className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [source, setSource] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);

  // Decide once on the client whether this visitor gets the video and which file
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    const isPhone = window.matchMedia(MOBILE_QUERY).matches;
    const chosen = reducedMotion || saveData ? null : isPhone && mobileSrc ? mobileSrc : src;
    // Deferred to keep the effect free of synchronous state updates
    const id = window.setTimeout(() => setSource(chosen), 0);
    return () => window.clearTimeout(id);
  }, [src, mobileSrc]);

  // Load on first sight, play only while visible
  useEffect(() => {
    const video = videoRef.current;
    if (!source || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [source]);

  if (!source) return null;

  return (
    <video
      ref={videoRef}
      aria-hidden
      muted
      loop
      playsInline
      preload="none"
      onPlaying={() => setPlaying(true)}
      className={cn(
        "absolute inset-0 size-full object-cover transition-opacity duration-700",
        playing ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      <source src={`${source}.webm`} type="video/webm" />
      <source src={`${source}.mp4`} type="video/mp4" />
    </video>
  );
}
