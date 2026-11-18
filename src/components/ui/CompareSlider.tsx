"use client";

import { useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CompareSliderProps = {
  before: React.ReactNode;
  after: React.ReactNode;
  beforeLabel: string;
  afterLabel: string;
  /** Accessible name of the slider handle */
  label: string;
  className?: string;
};

const KEY_STEP = 5;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

/**
 * Before/after comparison: "before" is left of the divider, "after" right of it,
 * each half labelled in its own top corner. Dragging right reveals more "before".
 * Mouse, touch, arrow keys and Home / End all move the handle.
 */
export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  label,
  className,
}: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  function positionFromPointer(clientX: number) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragging(true);
    positionFromPointer(event.clientX);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragging) positionFromPointer(event.clientX);
  }

  function stopDragging(event: React.PointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    setDragging(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const next: Record<string, number> = {
      ArrowLeft: position - KEY_STEP,
      ArrowDown: position - KEY_STEP,
      ArrowRight: position + KEY_STEP,
      ArrowUp: position + KEY_STEP,
      Home: 0,
      End: 100,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    setPosition(clamp(next[event.key]));
  }

  return (
    <div className={className}>
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      // Vertical swipes still scroll the page; horizontal ones move the divider
      className={cn(
        "relative touch-pan-y overflow-hidden rounded-card select-none",
        dragging ? "cursor-grabbing" : "cursor-ew-resize",
      )}
    >
      {/* "After" sits underneath and defines the size */}
      <div className="[&_*]:rounded-none">{after}</div>

      <div
        className="absolute inset-0 [&_*]:rounded-none"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {before}
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-navy/75 px-2.5 py-1 text-xs font-semibold text-white">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-navy">
        {afterLabel}
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(15,23,42,0.12)]"
        style={{ left: `${position}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-orientation="horizontal"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}%`}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary-dark shadow-lg ring-1 ring-navy/10 outline-none focus-visible:ring-4 focus-visible:ring-primary/60"
        style={{ left: `${position}%` }}
      >
        <ChevronsLeftRight aria-hidden className="size-5" />
      </div>
    </div>
    </div>
  );
}
