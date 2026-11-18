"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type AutoplayVideoProps = {
  /** Path without extension inside /public, e.g. "/videos/hero" (.webm and .mp4 must exist) */
  src: string;
  /** Only load the video when this media query matches, e.g. "(min-width: 768px)" */
  media?: string;
  className?: string;
  /** Extra classes for the pause button, e.g. to position it */
  controlClassName?: string;
};

/**
 * Muted looping video laid over a poster image that the parent renders underneath.
 * Nothing is downloaded until the block scrolls into view, and never for visitors
 * who prefer reduced motion, use data saver or (with `media`) small screens.
 * It fades in once playing and pauses while off screen.
 */
export function AutoplayVideo({ src, media, className, controlClassName }: AutoplayVideoProps) {
  const t = useTranslations("Common");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);

  // Decide once on the client whether this visitor should get the video at all
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mediaOk = !media || window.matchMedia(media).matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
      ?.saveData;
    // Deferred to keep the effect free of synchronous state updates
    const id = window.setTimeout(() => setEnabled(!reducedMotion && mediaOk && !saveData), 0);
    return () => window.clearTimeout(id);
  }, [media]);

  // Play only while visible
  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser) {
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
  }, [enabled, pausedByUser]);

  if (!enabled) return null;

  function togglePause() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      setPausedByUser(false);
      video.play().catch(() => {});
    } else {
      setPausedByUser(true);
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden
        muted
        loop
        playsInline
        preload="none"
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className={cn(
          "absolute inset-0 size-full object-cover transition-opacity duration-700",
          playing || pausedByUser ? "opacity-100" : "opacity-0",
          className,
        )}
      >
        <source src={`${src}.webm`} type="video/webm" />
        <source src={`${src}.mp4`} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={togglePause}
        aria-label={playing ? t("pauseVideo") : t("playVideo")}
        className={cn(
          "absolute z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-colors hover:bg-black/55 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none",
          controlClassName ?? "right-4 bottom-4",
        )}
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </>
  );
}
