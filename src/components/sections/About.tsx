import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";

const points = ["numbing", "plan", "warranty", "scan", "kids", "everyday"] as const;

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="type-h2 max-w-[20ch] text-navy">{t("title")}</h2>
            <div className="mt-6 max-w-[62ch] space-y-4 text-navy/80">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
            </div>

            <figure className="mt-10 rounded-card bg-surface p-6 md:p-8">
              <blockquote className="text-xl leading-8 font-medium tracking-[-0.01em] text-navy md:text-[22px] md:leading-[34px]">
                «{t("quote")}»
              </blockquote>
              <figcaption className="mt-4 text-[15px] text-muted-foreground">{t("quoteAuthor")}</figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5">
            <Photo
              src="/images/about.webp"
              alt={t("photoAlt")}
              width={1200}
              height={1746}
              sizes="(min-width: 1024px) 460px, 100vw"
              className="aspect-[4/5] rounded-card object-cover lg:aspect-auto lg:h-full lg:max-h-[640px]"
            />
          </div>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {points.map((point) => (
            <li key={point} className="border-t-2 border-sky py-6">
              <h3 className="type-h3 text-navy">
                {t(`points.${point}.title`, { years: site.stats.warrantyYears })}
              </h3>
              <p className="mt-2 text-[16px] leading-[26px] text-muted-foreground">{t(`points.${point}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
