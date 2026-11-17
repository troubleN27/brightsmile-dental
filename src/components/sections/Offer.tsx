import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { sectionHref } from "@/components/layout/nav-items";
import { Link } from "@/i18n/navigation";

const included = ["exam", "scan", "plan"] as const;

export function Offer() {
  const t = useTranslations("Offer");

  return (
    <section id="offer" className="pb-16 md:pb-24">
      <Container>
        <div className="grid gap-10 rounded-[28px] bg-sky px-6 py-10 md:px-12 md:py-14 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="w-fit rounded-full bg-peach px-3.5 py-1 text-sm font-semibold text-navy">{t("badge")}</p>
            <h2 className="type-h2 mt-5 max-w-[18ch] text-navy">{t("title")}</h2>
            <p className="mt-4 max-w-[52ch] text-lg leading-8 text-navy/80">{t("text")}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href={sectionHref("booking")}>{t("cta")}</Link>
            </Button>
          </div>

          <div className="rounded-card bg-white p-6 md:p-8 lg:col-span-5">
            <h3 className="type-h3 text-navy">{t("includedTitle")}</h3>
            <ul className="mt-4 divide-y divide-line">
              {included.map((item) => (
                <li key={item} className="flex items-baseline justify-between gap-4 py-3">
                  <span className="text-navy">{t(`included.${item}.name`)}</span>
                  <span className="text-[15px] whitespace-nowrap text-muted-foreground">
                    <span className="line-through">{t(`included.${item}.price`)}</span>{" "}
                    <span className="font-semibold text-primary-dark no-underline">{t("free")}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
