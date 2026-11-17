import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <Container className="flex flex-col items-center py-20 text-center md:py-32">
      <title>{t("metaTitle")}</title>
      <p
        aria-hidden
        className="text-[96px] leading-none font-extrabold tracking-tight text-primary/25 md:text-[160px]"
      >
        404
      </p>
      <h1 className="mt-4 type-h2 text-navy text-balance">{t("title")}</h1>
      <p className="mt-4 max-w-md text-muted-foreground text-pretty">{t("text")}</p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">
          <ArrowLeft />
          {t("home")}
        </Link>
      </Button>
    </Container>
  );
}
