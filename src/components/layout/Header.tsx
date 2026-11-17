"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { phoneHref, site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { navItems, sectionHref } from "./nav-items";

const SCROLL_THRESHOLD = 50;

export function Header() {
  const t = useTranslations();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,box-shadow] duration-300",
        scrolled
          ? "bg-white/90 shadow-[0_8px_24px_-12px_rgba(15,23,42,0.18)] backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" aria-label={t("Common.logoLabel")} className="rounded-button">
          <Logo />
        </Link>

        <nav aria-label={t("Nav.label")} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {navItems.map((id) => (
              <li key={id}>
                <Link
                  href={sectionHref(id)}
                  className="rounded-button px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-navy/80 transition-colors hover:text-primary-dark"
                >
                  {t(`Nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 xl:gap-3">
          <a
            href={phoneHref}
            className="hidden items-center gap-2 font-bold whitespace-nowrap text-navy transition-colors hover:text-primary-dark 2xl:flex"
          >
            <Phone aria-hidden className="size-4 text-primary-dark" />
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
