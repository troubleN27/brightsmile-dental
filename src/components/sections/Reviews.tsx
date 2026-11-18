import { useFormatter, useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { site } from "@/config/site";
import { cases } from "@/data/cases";
import { reviews } from "@/data/reviews";
import { getService } from "@/data/services";
import type { Locale } from "@/i18n/routing";
import { ReviewsCarousel, type ReviewCard } from "./ReviewsCarousel";

export function Reviews() {
  const t = useTranslations("Reviews");
  const format = useFormatter();
  const locale = useLocale() as Locale;

  // Reviews already shown next to a before/after case are not repeated here
  const shownWithCases = new Set(cases.map((item) => item.reviewId));
  const cards: ReviewCard[] = reviews
    .filter((review) => !shownWithCases.has(review.id))
    .map((review) => ({
    id: review.id,
    author: review.author[locale],
    rating: review.rating,
    text: review.text[locale],
    service: getService(review.serviceId)?.title[locale] ?? "",
  }));

  return (
    <section id="reviews" className="bg-mint py-16 md:py-24">
      <Container>
        <SectionTitle
          title={t("title")}
          subtitle={t("subtitle", { rating: format.number(site.stats.rating) })}
        />
        <ReviewsCarousel reviews={cards} />
      </Container>
    </section>
  );
}
