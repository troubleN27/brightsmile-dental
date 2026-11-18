"use client";

import { useCallback, useSyncExternalStore } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
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
    align: "center",
    loop: true,
    breakpoints: {
      // Near-instant scrolling for people who prefer less motion
      "(prefers-reduced-motion: reduce)": { duration: 10 },
    },
  });
  const { snapCount, selected, canPrev, canNext } = useCarouselState(emblaApi);

  return (
    <div role="region" aria-roledescription="carousel" aria-label={t("carousel")}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              role="group"
              aria-roledescription="slide"
              aria-label={t("slide", { index: index + 1, total: reviews.length })}
              className="min-w-0 shrink-0 grow-0 basis-full px-1"
            >
              <figure className="mx-auto flex h-full max-w-3xl flex-col items-center text-center">
                <div>
                  <div
                    role="img"
                    aria-label={t("rating", { rating: review.rating })}
                    className="flex justify-center gap-1"
                  >
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        aria-hidden
                        className={cn(
                          "size-5",
                          i < review.rating
                            ? "fill-warning text-warning"
                            : "fill-white/25 text-white/25",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 text-xl leading-9 font-medium text-white text-pretty md:text-2xl md:leading-10">
                  «{review.text}»
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-bold text-white">{review.author}</p>
                  <p className="text-sm text-sky-light">{review.service}</p>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: snapCount }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => emblaApi?.scrollTo(index)}
              aria-label={t("goTo", { index: index + 1 })}
              aria-current={index === selected ? "true" : undefined}
              className="group flex size-6 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span
                className={cn(
                  "block h-2 rounded-full transition-all",
                  index === selected ? "w-6 bg-white" : "w-2 bg-white/35 group-hover:bg-white/60",
                )}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white disabled:opacity-40"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canPrev}
            aria-label={t("prev")}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-white/50 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white disabled:opacity-40"
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
