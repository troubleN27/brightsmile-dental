"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  /** "onDark" for the dark blue header */
  tone?: "light" | "onDark";
  className?: string;
};

export function LanguageSwitcher({ tone = "light", className }: LanguageSwitcherProps) {
  const t = useTranslations("LanguageSwitcher");
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(event: React.MouseEvent, locale: Locale) {
    event.preventDefault();
    // Keep the current section anchor, e.g. /ru#doctors -> /en#doctors
    router.replace(`${pathname}${window.location.hash}`, { locale });
  }

  return (
    <nav
      aria-label={t("label")}
      className={cn(
        "inline-flex rounded-button border p-0.5 text-sm font-semibold",
        tone === "light" ? "border-border bg-white" : "border-white/25 bg-white/10",
        className,
      )}
    >
      {routing.locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={pathname}
            locale={locale}
            hrefLang={locale}
            lang={locale}
            aria-current={isActive ? "true" : undefined}
            aria-label={t(locale)}
            onClick={(event) => switchTo(event, locale)}
            className={cn(
              "rounded-[10px] px-2.5 py-1.5 uppercase transition-colors",
              tone === "light" &&
                (isActive ? "bg-navy text-white" : "text-muted-foreground hover:text-navy"),
              tone === "onDark" &&
                (isActive ? "bg-white text-primary-dark" : "text-white/80 hover:text-white"),
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
