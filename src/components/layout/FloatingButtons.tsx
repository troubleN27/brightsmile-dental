"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { TelegramIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/button";
import { phoneHref, site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { sectionHref } from "./nav-items";

const BOOKING_ID = "booking";

/** True while the booking form is on screen (always false if it is not on the page). */
function useBookingInView() {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const form = document.getElementById(BOOKING_ID);
    if (!form) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  return inView;
}

export function FloatingButtons() {
  const t = useTranslations("Floating");
  const bookingInView = useBookingInView();
  const barVisible = !bookingInView;

  return (
    <>
      <a
        href={site.telegram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("telegram")}
        className={cn(
          "fixed right-4 z-30 flex size-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-[0_12px_32px_-8px_rgba(34,158,217,0.6)] transition-[bottom,transform] duration-300 hover:scale-105 focus-visible:ring-4 focus-visible:ring-[#229ED9]/40 focus-visible:outline-none md:right-6 md:bottom-6 md:size-14",
          barVisible ? "bottom-[88px]" : "bottom-4",
        )}
      >
        <TelegramIcon className="size-6 -translate-x-px md:size-7" />
      </a>

      {/* Mobile booking bar */}
      <div
        aria-hidden={!barVisible}
        inert={!barVisible}
        className={cn(
          "fixed inset-x-0 bottom-0 z-30 flex gap-3 border-t border-border bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(15,23,42,0.2)] backdrop-blur-md transition-transform duration-300 md:hidden",
          barVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <Button asChild variant="outline" size="icon" className="size-12 shrink-0">
          <a href={phoneHref} aria-label={t("call")}>
            <Phone className="size-5" />
          </a>
        </Button>
        <Button asChild className="h-12 flex-1 text-base">
          <Link href={sectionHref("booking")}>{t("book")}</Link>
        </Button>
      </div>
      {/* Keeps the footer clear of the fixed bar on mobile */}
      <div aria-hidden className="h-[76px] bg-ink md:hidden" />
    </>
  );
}
