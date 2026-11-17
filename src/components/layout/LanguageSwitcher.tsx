"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

type LanguageSwitcherProps = {
  className?: string;
};

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
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
        "inline-flex items-center gap-1 text-sm font-semibold",
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
              "rounded-md px-1.5 py-1 uppercase transition-colors",
              isActive
                ? "text-navy underline decoration-primary-dark decoration-2 underline-offset-[6px]"
                : "text-muted-foreground hover:text-navy",
            )}
          >
            {locale}
          </Link>
        );
      })}
    </nav>
  );
}
