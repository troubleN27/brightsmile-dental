"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children: React.ReactNode;
};

/**
 * Fades the blocks of a section in from below as they scroll into view.
 * Animates the direct children of the section's container (title, grid, …).
 * GSAP is loaded after the first paint so it never delays the first screen,
 * and nothing moves when the visitor prefers reduced motion.
 */
export function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const ctx = gsap.context(() => {
          const targets = gsap.utils.toArray<HTMLElement>(":scope > section > div > *", root);
          targets.forEach((target) => {
            // Blocks already on screen stay put instead of flashing
            if (target.getBoundingClientRect().top < window.innerHeight) return;
            // Lists and grids come in item by item; other blocks as a whole
            const items =
              target.matches("ul, ol") && target.children.length > 1
                ? Array.from(target.children)
                : [target];
            // Opacity only (not visibility), so content stays reachable by keyboard
            gsap.from(items, {
              y: 12,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.07,
              scrollTrigger: { trigger: target, start: "top 88%", once: true },
            });
          });
        }, root);
        revert = () => ctx.revert();
      },
    );

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
