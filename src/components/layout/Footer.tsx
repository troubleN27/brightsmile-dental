import { Clock, Mail, MapPin, Phone } from "lucide-react";
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

  return (
    <footer className="bg-ink text-slate-300">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1.3fr] md:py-16">
        <div className="space-y-4">
          <Link href="/" aria-label={t("Common.logoLabel")} className="inline-block">
            <Logo tone="light" />
          </Link>
          <p className="max-w-xs text-sm leading-6">{t("Footer.tagline")}</p>
        </div>

        <nav aria-label={t("Footer.navTitle")}>
          <h2 className="mb-4 font-semibold text-white">
            {t("Footer.navTitle")}
          </h2>
          <ul className="space-y-2.5 text-sm">
            {navItems.map((id) => (
              <li key={id}>
                <Link href={sectionHref(id)} className="transition-colors hover:text-sky-light">
                  {t(`Nav.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-semibold text-white">
            {t("Footer.contactsTitle")}
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={phoneHref} className="flex gap-3 transition-colors hover:text-sky-light">
                <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-sky-light" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 transition-colors hover:text-sky-light">
                <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-sky-light" />
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-sky-light" />
              {site.address[locale]}
            </li>
            <li className="flex gap-3">
              <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-sky-light" />
              {site.hours[locale]}
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>{t("Footer.rights", { year })}</p>
            {/* Legal details: registration numbers and licence appear once filled in site.ts */}
            <p className="text-xs text-slate-400">
              {[
                site.legal.name[locale],
                site.legal.inn && t("Footer.inn", { inn: site.legal.inn }),
                site.legal.ogrn && t("Footer.ogrn", { ogrn: site.legal.ogrn }),
                site.legal.license && t("Footer.license", { license: site.legal.license }),
              ]
                .filter(Boolean)
                .join(", ")}
            </p>
          </div>
          <Link href="/privacy" className="underline-offset-4 transition-colors hover:text-sky-light hover:underline">
            {t("Footer.privacy")}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
