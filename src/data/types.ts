import type { Locale } from "@/i18n/routing";

export type Localized = Record<Locale, string>;

export type ServiceCategory =
  | "therapy"
  | "hygiene"
  | "implants"
  | "orthodontics"
  | "aesthetics"
  | "kids";

export type Service = {
  id: string;
  category: ServiceCategory;
  title: Localized;
  description: Localized;
  /** Starting price in US dollars */
  priceFrom: number;
};

export type Doctor = {
  id: string;
  name: Localized;
  specialty: Localized;
  experienceYears: number;
  /** Path inside /public */
  photo: string;
};

/** Before/after case */
export type Case = {
  id: string;
  serviceId: string;
  before: string;
  after: string;
  duration: Localized;
};

export type Review = {
  id: string;
  author: Localized;
  rating: 1 | 2 | 3 | 4 | 5;
  text: Localized;
  serviceId: string;
};

export type FaqItem = {
  id: string;
  question: Localized;
  answer: Localized;
};
