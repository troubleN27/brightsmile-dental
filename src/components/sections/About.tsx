import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { site } from "@/config/site";

const points = ["numbing", "plan", "warranty", "scan", "kids", "everyday"] as const;

export function About() {
  const t = useTranslations("About");

  return (
    <section id="about" className="bg-surface py-20 md:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Photo
              src="/images/about.webp"
              alt={t("photoAlt")}
              width={1200}
              height={1746}
              sizes="(min-width: 1024px) 440px, 100vw"
              className="aspect-[4/5] rounded-[20px] object-cover lg:aspect-[2/3]"
            />
          </div>

          <div className="lg:col-span-7 lg:pt-6">
            <h2 className="text-h2 max-w-[18ch] text-navy">{t("title")}</h2>
            <div className="mt-6 max-w-[62ch] space-y-4 text-navy/80">
              <p>{t("story1")}</p>
              <p>{t("story2")}</p>
            </div>

            <figure className="mt-10 max-w-[56ch] border-l-2 border-primary-dark pl-6">
              <blockquote className="font-serif text-[22px] leading-[32px] text-navy italic md:text-2xl md:leading-[36px]">
                {t("quote")}
              </blockquote>
              <figcaption className="mt-4 text-[15px] text-navy/70">{t("quoteAuthor")}</figcaption>
            </figure>
          </div>
        </div>

        <ul className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {points.map((point) => (
            <li key={point} className="border-t border-navy/15 py-6">
              <h3 className="text-h3 text-navy">
                {t(`points.${point}.title`, { years: site.stats.warrantyYears })}
              </h3>
              <p className="mt-2 text-[16px] leading-[26px] text-navy/75">{t(`points.${point}.text`)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
