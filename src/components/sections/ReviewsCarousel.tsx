"use client";

import { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ReviewCard = {
  id: string;
  author: string;
  rating: number;
  text: string;
  service: string;
};

type CarouselApi = UseEmblaCarouselType[1];

const EMPTY_SNAPSHOT = "0|0|0|0";

/** Reads navigation state straight from Embla and re-renders on its events. */
function useCarouselState(api: CarouselApi) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!api) return () => {};
      api.on("select", onChange).on("reInit", onChange);
      return () => {
        api.off("select", onChange).off("reInit", onChange);
      };
    },
    [api],
  );

  // A string snapshot keeps the value stable between identical states
  const snapshot = useSyncExternalStore(
    subscribe,
    () =>
      api
        ? [
            api.scrollSnapList().length,
            api.selectedScrollSnap(),
            Number(api.canScrollPrev()),
            Number(api.canScrollNext()),
          ].join("|")
        : EMPTY_SNAPSHOT,
    () => EMPTY_SNAPSHOT,
  );

  const [snapCount, selected, canPrev, canNext] = snapshot.split("|").map(Number);
  return { snapCount, selected, canPrev: canPrev === 1, canNext: canNext === 1 };
}

type ReviewsCarouselProps = {
  reviews: ReviewCard[];
};

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const t = useTranslations("Reviews");
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
      // Near-instant scrolling for people who prefer less motion
      "(prefers-reduced-motion: reduce)": { duration: 10 },
    },
  });
  const { snapCount, selected, canPrev, canNext } = useCarouselState(emblaApi);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={t("carousel")}>
      <div ref={emblaRef} className="-mx-3 overflow-hidden px-3 py-2">
        <div className="-ml-4 flex touch-pan-y lg:-ml-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={t("slide", { index: index + 1, total: reviews.length })}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3 lg:pl-6"
            >
              <figure className="flex h-full flex-col rounded-card bg-white p-6 ring-1 ring-primary/10 md:p-7">
                <div className="flex items-center justify-between">
                  <div
                    role="img"
                    aria-label={t("rating", { rating: review.rating })}
                    className="flex gap-0.5"
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden
                        className={cn(
                          "size-5",
                          i < review.rating
                            ? "fill-warning text-warning"
                            : "fill-slate-200 text-slate-200",
                        )}
                      />
                    ))}
                  </div>
                  <Quote aria-hidden className="size-7 text-primary/30" />
                </div>
                <blockquote className="mt-4 flex-1 text-navy/85">{review.text}</blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-bold text-navy">{review.author}</p>
                  <p className="text-sm text-primary-dark">{review.service}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={t("goTo", { index: index + 1 })}
              aria-current={index === selected ? "true" : undefined}
              className="group flex size-6 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  index === selected ? "w-6 bg-primary-dark" : "w-2 bg-navy/20 group-hover:bg-navy/40",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={t("prev")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canNext}
            aria-label={t("next")}
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
