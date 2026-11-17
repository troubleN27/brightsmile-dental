import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Manrope } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { FloatingButtons } from "@/components/layout/FloatingButtons";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { routing } from "@/i18n/routing";
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

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Metadata");
  return {
    title: t("title"),
    description: t("description"),
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
