"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type RevealProps = {
  children: React.ReactNode;
};

/**
 * Fades the blocks of a section in from below as they scroll into view.
 * Animates the direct children of the section's container (title, grid, …).
 * Nothing moves when the visitor prefers reduced motion.
 */
export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = gsap.utils.toArray<HTMLElement>(":scope > section > div > *", ref.current);
        targets.forEach((target) => {
          // Opacity only (not visibility), so content stays reachable by keyboard
          gsap.from(target, {
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: target, start: "top 88%", once: true },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
