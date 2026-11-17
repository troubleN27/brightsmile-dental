import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { phoneHref, site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { Logo } from "./Logo";
import { navItems, sectionHref } from "./nav-items";

type FooterProps = {
  year: number;
};

export function Footer({ year }: FooterProps) {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  // Registration numbers and licence appear once filled in site.ts
  const legal = [
    site.legal.name[locale],
    site.legal.inn && t("Footer.inn", { inn: site.legal.inn }),
    site.legal.ogrn && t("Footer.ogrn", { ogrn: site.legal.ogrn }),
    site.legal.license && t("Footer.license", { license: site.legal.license }),
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="bg-navy text-white/70">
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.3fr] md:py-16">
        <div className="space-y-4">
          <Link href="/" aria-label={t("Common.logoLabel")} className="inline-block">
            <Logo tone="light" />
          </Link>
          <p className="max-w-xs text-[15px] leading-6">{t("Footer.tagline")}</p>
        </div>

        <nav aria-label={t("Footer.navTitle")}>
          <h2 className="mb-4 font-semibold text-white">{t("Footer.navTitle")}</h2>
          <ul className="space-y-2.5 text-[15px]">
            {navItems.map((id) => (
              <li key={id}>
                <Link href={sectionHref(id)} className="transition-colors hover:text-white">
                  {t(`Nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-semibold text-white">{t("Footer.contactsTitle")}</h2>
          <ul className="space-y-2.5 text-[15px]">
            <li>
              <a href={phoneHref} className="font-semibold text-white tabular-nums transition-colors hover:text-primary">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
            <li>{site.address[locale]}</li>
            <li>{site.hours[locale]}</li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-4 py-6 text-sm sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <p>{t("Footer.rights", { year })}</p>
            <p className="text-white/50">{legal}</p>
            <p className="font-semibold text-white/80">{t("Legal.contraindications")}</p>
          </div>
          <Link
            href="/privacy"
            className="shrink-0 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white"
          >
            {t("Footer.privacy")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
