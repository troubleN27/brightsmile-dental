import { Smile } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CompareSlider } from "@/components/ui/CompareSlider";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { cases } from "@/data/cases";
import { CaseLightbox } from "./CaseLightbox";
import { reviews } from "@/data/reviews";
import { getService } from "@/data/services";
import type { Case } from "@/data/types";
import type { Locale } from "@/i18n/routing";

const PHOTO = { width: 1200, height: 900 };

type CaseSliderProps = {
  item: Case;
  sizes: string;
};

function CaseSlider({ item, sizes }: CaseSliderProps) {
  const t = useTranslations("Results");
  const locale = useLocale() as Locale;
  const service = getService(item.serviceId)?.title[locale] ?? "";

  return (
    <figure>
      <CompareSlider
        label={t("sliderLabel", { service })}
        beforeLabel={t("before")}
        afterLabel={t("after")}
        before={
          <Photo
            src={item.before}
            alt={t("beforeAlt", { service })}
            {...PHOTO}
            sizes={sizes}
            square
            placeholderIcon={Smile}
            placeholderTone="muted"
          />
        }
        after={
          <Photo
            src={item.after}
            alt={t("afterAlt", { service })}
            {...PHOTO}
            sizes={sizes}
            square
            placeholderIcon={Smile}
          />
        }
      />
      {/* Service and duration on separate lines; the duration never breaks mid-phrase */}
      <figcaption className="pt-4">
        <span className="block leading-6 font-bold text-navy text-balance">{service}</span>
        <span className="mt-1 block text-sm whitespace-nowrap text-muted-foreground">
          {t("duration", { duration: item.duration[locale] })}
        </span>
      </figcaption>
    </figure>
  );
}

export function BeforeAfter() {
  const t = useTranslations("Results");
  const locale = useLocale() as Locale;

  // The first case with a linked review is shown large, next to that review
  const featured = cases.find((item) => item.reviewId) ?? cases[0];
  const review = reviews.find((item) => item.id === featured.reviewId);
  const rest = cases.filter((item) => item !== featured);

  return (
    <section id="results" className="bg-lavender py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16">
          <div>
            <SectionTitle title={t("title")} subtitle={t("subtitle")} />
            {review && (
              <blockquote className="border-l-2 border-primary pl-6">
                <p className="text-lg leading-8 text-navy text-pretty">{review.text[locale]}</p>
                <footer className="mt-3 text-sm text-muted-foreground">{review.author[locale]}</footer>
              </blockquote>
            )}
          </div>
          <CaseSlider item={featured} sizes="(min-width: 1024px) 660px, 100vw" />
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {rest.map((item) => (
            <li key={item.id}>
              <CaseSlider item={item} sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw" />
              {/* Small sliders are fiddly on desktop: offer a large view there */}
              <div className="hidden lg:block">
                <CaseLightbox
                  title={getService(item.serviceId)?.title[locale] ?? ""}
                  openLabel={t("enlarge")}
                  closeLabel={t("close")}
                >
                  <CaseSlider item={item} sizes="960px" />
                </CaseLightbox>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
