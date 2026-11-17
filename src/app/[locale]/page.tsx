import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations();

  return (
    <section className="bg-[radial-gradient(ellipse_at_top_right,#ccfbf1,transparent_55%)]">
      <Container className="py-16 md:py-28">
        <div className="max-w-2xl">
          <h1 className="text-h1 text-navy text-balance">{t("Home.title")}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground text-pretty">
            {t("Home.subtitle")}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/#booking">{t("Header.book")}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
