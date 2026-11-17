import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { localeAlternates, localizedPath, ogLocale } from "@/lib/seo";

/** Date of the current policy version — update it whenever the text changes. */
const LAST_UPDATED = new Date("2026-11-17T12:00:00Z");

type Section = { title: string; paragraphs: string[] };

export async function generateMetadata(): Promise<Metadata> {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: localeAlternates(locale, "/privacy"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      url: localizedPath(locale, "/privacy"),
      locale: ogLocale[locale],
    },
  };
}

export default async function PrivacyPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Privacy");
  const tFooter = await getTranslations("Footer");
  const format = await getFormatter();
  const sections = t.raw("sections") as Section[];

  // Registration numbers are shown only once they are filled in src/config/site.ts
  const { inn, ogrn } = site.legal;
  const registration = [inn && tFooter("inn", { inn }), ogrn && tFooter("ogrn", { ogrn })]
    .filter(Boolean)
    .join(", ");
  const fill = (text: string) =>
    text
      .replaceAll("{legalName}", site.legal.name[locale])
      .replaceAll("{legalDetails}", registration ? ` (${registration})` : "")
      .replaceAll("{address}", site.address[locale])
      .replaceAll("{email}", site.email)
      .replaceAll("{phone}", site.phone);

  return (
    <article className="py-12 break-words md:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:underline"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t("back")}
        </Link>
        {/* Slightly smaller on narrow phones so long Russian words fit on one line */}
        <h1 className="type-h1 hyphens-auto break-words text-navy max-sm:text-[28px] max-sm:leading-9">
          {t("title")}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("updated", { date: format.dateTime(LAST_UPDATED, { dateStyle: "long" }) })}
        </p>
        <p className="mt-6 text-lg leading-8 text-navy/80">{t("intro")}</p>

        <div className="mt-10 space-y-10">
          {sections.map((section, index) => (
            <section key={section.title} aria-labelledby={`privacy-${index}`}>
              <h2 id={`privacy-${index}`} className="text-xl font-bold text-navy md:text-2xl">
                {section.title}
              </h2>
              <div className="mt-3 space-y-3 text-navy/80">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{fill(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <Button asChild variant="outline" className="mt-12">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Button>
      </Container>
    </article>
  );
}
