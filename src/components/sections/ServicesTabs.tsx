"use client";

import { useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ServicesTab = {
  id: string;
  label: string;
  /** Rendered on the server: category photo shown on the card */
  photo: React.ReactNode;
  /** Rendered on the server: description and the price list */
  content: React.ReactNode;
};

type ServicesTabsProps = {
  tabs: ServicesTab[];
};

/**
 * Photo cards act as tabs; the price list of the chosen category opens below.
 * On phones and tablets the list is often off screen, so after a pick the page
 * scrolls to it (smoothly unless the visitor prefers reduced motion, via CSS).
 */
export function ServicesTabs({ tabs }: ServicesTabsProps) {
  const panelsRef = useRef<HTMLDivElement>(null);

  function revealPrices() {
    const panels = panelsRef.current;
    if (!panels || !window.matchMedia("(max-width: 1023px)").matches) return;
    // Wait for the new panel to render before measuring
    requestAnimationFrame(() => {
      const top = panels.getBoundingClientRect().top;
      if (top > window.innerHeight * 0.5) panels.scrollIntoView({ block: "start" });
    });
  }

  return (
    <Tabs defaultValue={tabs[0]?.id} onValueChange={revealPrices} className="gap-8">
      <TabsList className="grid h-auto w-full grid-cols-2 gap-3 bg-transparent p-0 group-data-[orientation=horizontal]/tabs:h-auto md:gap-4 lg:grid-cols-3">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="group relative flex h-auto cursor-pointer flex-col items-stretch justify-start gap-0 overflow-hidden rounded-card border-0 bg-surface p-0 text-left whitespace-normal shadow-none ring-2 ring-transparent transition-shadow hover:ring-sky/50 data-[state=active]:bg-ink data-[state=active]:shadow-[0_20px_40px_-24px_rgba(11,31,58,0.8)] data-[state=active]:ring-violet"
          >
            <span className="relative block aspect-[3/2] overflow-hidden">{tab.photo}</span>
            <span className="block px-4 py-3 text-[15px] font-bold text-navy group-data-[state=active]:text-white md:px-5 md:py-4 md:text-lg">
              {tab.label}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div ref={panelsRef}>
        {tabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            {tab.content}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
