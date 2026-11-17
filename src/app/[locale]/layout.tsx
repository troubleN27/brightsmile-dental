import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/seo/JsonLd";
import { site, siteUrl } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";
import { localeAlternates, localizedPath, ogLocale } from "@/lib/seo";
import { BookingProvider } from "@/store/booking";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#14B8A6",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Metadata");
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(siteUrl()),
    // Pages set their own title; the home page uses the default
    title: { default: title, template: `%s — ${site.name}` },
    description,
    applicationName: site.name,
    alternates: localeAlternates(locale),
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: localizedPath(locale),
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}

async function getCurrentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function LocaleLayout({
  children,
}: LayoutProps<"/[locale]">) {
  const locale = await getLocale();
  const year = await getCurrentYear();

  return (
    <html lang={locale} className={manrope.variable}>
      <body className="flex min-h-dvh flex-col font-sans">
        <JsonLd locale={locale as Locale} />
        <NextIntlClientProvider>
          <Header />
          <BookingProvider>
            <main className="flex-1">{children}</main>
          </BookingProvider>
          <Footer year={year} />
          <FloatingButtons />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
