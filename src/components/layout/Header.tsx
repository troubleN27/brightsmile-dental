"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { phoneHref, site } from "@/config/site";
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
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-line bg-white/95 backdrop-blur-sm" : "border-transparent bg-paper",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={t("Common.logoLabel")}
          onClick={handleLogoClick}
          className="rounded-button"
        >
          <Logo />
        </Link>

        <nav aria-label={t("Nav.label")} className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navItems.map((id) => {
              const isActive = id === activeId;
              return (
                <li key={id}>
                  <Link
                    href={sectionHref(id)}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "border-b py-1 text-[15px] font-medium whitespace-nowrap transition-colors hover:text-navy",
                      isActive ? "border-primary-dark text-navy" : "border-transparent text-navy/70",
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
          <a
            href={phoneHref}
            className="hidden font-semibold whitespace-nowrap text-navy tabular-nums transition-colors hover:text-primary-dark 2xl:block"
          >
            {site.phone}
          </a>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="2xl:hidden"
            aria-label={t("Header.call")}
          >
            <a href={phoneHref}>
              <Phone className="size-5" />
            </a>
          </Button>
          <LanguageSwitcher className="hidden md:inline-flex" />
          <Button asChild className="hidden sm:inline-flex">
            <Link href={sectionHref("booking")}>{t("Header.book")}</Link>
          </Button>
          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
