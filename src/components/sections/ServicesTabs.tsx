"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ServicesTab = {
  id: string;
  label: string;
  /** Rendered on the server: photo, description and the price list */
  content: React.ReactNode;
};

type ServicesTabsProps = {
  tabs: ServicesTab[];
};

/** Client wrapper only for tab switching; the panels come from the server. */
export function ServicesTabs({ tabs }: ServicesTabsProps) {
  return (
    <Tabs defaultValue={tabs[0]?.id} className="gap-8">
      {/* Scrolls sideways on small screens instead of wrapping */}
      <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
        <TabsList className="flex h-auto w-max gap-1 rounded-button bg-surface p-1.5">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="h-10 flex-none cursor-pointer rounded-[10px] px-4 text-[15px] font-semibold text-navy/70 hover:text-navy data-[state=active]:bg-primary-dark data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
