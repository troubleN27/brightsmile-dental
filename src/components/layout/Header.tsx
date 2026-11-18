"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { phoneHref } from "@/config/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { navItems, sectionHref } from "./nav-items";
import { useActiveSection } from "./useActiveSection";

const SCROLL_THRESHOLD = 50;

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const activeId = useActiveSection(navItems);
  const pathname = usePathname();
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On the home page the router sees "/" as the same route and does nothing,
  // so scroll to the top ourselves and drop the section anchor from the URL.
  // From other pages the link simply navigates home (and Next starts at the top).
  function handleLogoClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname !== "/") return;
    event.preventDefault();
    window.scrollTo({ top: 0 }); // smooth unless the visitor prefers reduced motion (CSS)
    if (window.location.hash) {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow] duration-300",
        // Over the home page hero the header is see-through until the page scrolls
        overHero ? "bg-transparent" : "bg-ink shadow-[0_8px_24px_-12px_rgba(2,6,23,0.6)]",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={t("Common.logoLabel")}
          onClick={handleLogoClick}
          className="rounded-button"
        >
          <Logo tone="brand" />
        </Link>

        <nav aria-label={t("Nav.label")} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((id) => {
              const isActive = id === activeId;
              return (
                <li key={id}>
                  <Link
                    href={sectionHref(id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "rounded-button px-2 py-2 text-sm font-semibold whitespace-nowrap transition-colors hover:text-white",
                      isActive ? "bg-white/15 text-white" : "text-white/80",
                    )}
                  >
                    {t(`Nav.${id}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 xl:gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 hover:text-white"
            aria-label={t("Header.call")}
          >
            <a href={phoneHref}>
              <Phone className="size-5" />
            </a>
          </Button>
          <LanguageSwitcher tone="onDark" className="hidden md:inline-flex" />
          <Button asChild className="hidden sm:inline-flex">
            <Link href={sectionHref("booking")}>{t("Header.book")}</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
