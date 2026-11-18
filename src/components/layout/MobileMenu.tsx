"use client";

import { useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { phoneHref, site } from "@/config/site";
import { Link, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { navItems, sectionHref } from "./nav-items";

export function MobileMenu() {
  const t = useTranslations();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  // Navigation waits until the sheet has closed and unlocked page scroll,
  // otherwise the jump to the section is swallowed by the scroll lock.
  const pendingHref = useRef<string | null>(null);

  function goTo(event: React.MouseEvent, href: string) {
    event.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  }

  function handleCloseAutoFocus(event: Event) {
    const href = pendingHref.current;
    if (!href) return;
    event.preventDefault();
    pendingHref.current = null;
    router.push(href);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-white xl:hidden"
          aria-label={t("Header.openMenu")}
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        onCloseAutoFocus={handleCloseAutoFocus}
        className="w-full gap-0 border-none sm:max-w-full"
      >
        <SheetTitle className="sr-only">{t("Header.menuTitle")}</SheetTitle>
        <SheetDescription className="sr-only">{t("Nav.label")}</SheetDescription>

        <div className="flex h-16 items-center justify-between border-b px-4">
          <Logo />
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t("Header.closeMenu")}
            >
              <X className="size-6" />
            </Button>
          </SheetClose>
        </div>

        <nav aria-label={t("Nav.label")} className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((id) => (
              <li key={id}>
                <Link
                  href={sectionHref(id)}
                  onClick={(event) => goTo(event, sectionHref(id))}
                  className="block rounded-button px-3 py-3 text-xl font-bold text-navy transition-colors hover:bg-surface hover:text-primary-dark"
                >
                  {t(`Nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-4 border-t px-4 py-6">
          <LanguageSwitcher />
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-lg font-bold text-navy"
          >
            <Phone aria-hidden className="size-5 text-primary-dark" />
            {site.phone}
          </a>
          <Button asChild size="lg" className="w-full">
            <Link
              href={sectionHref("booking")}
              onClick={(event) => goTo(event, sectionHref("booking"))}
            >
              {t("Header.book")}
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
