import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    author: { ru: "Ирина К.", en: "Irina K." },
    rating: 5,
    serviceId: "root-canal",
    text: {
      ru: "Очень боялась лечить каналы, но Анна всё объяснила заранее и делала перерывы. Было спокойно, а зуб удалось сохранить.",
      en: "I was dreading a root canal, but Dr. Sokolova explained everything up front and gave me breaks whenever I needed. It was calm, and she saved the tooth.",
    },
  },
  {
    id: "r2",
    author: { ru: "Джеймс Т.", en: "James T." },
    rating: 5,
    serviceId: "implant",
    text: {
      ru: "Поставил имплант у доктора Рейеса. Получил план с ценой на каждый этап — итог совпал до доллара.",
      en: "Had an implant placed by Dr. Reyes. The written plan priced every step, and the final bill matched it to the dollar.",
    },
  },
  {
    id: "r3",
    author: { ru: "Марина Л.", en: "Marina L." },
    rating: 5,
    serviceId: "kids-checkup",
    text: {
      ru: "Сын впервые пошёл к стоматологу без слёз. Доктор Грант показала инструменты, дала подержать зеркальце — теперь он сам просится на осмотр.",
      en: "My son's first dentist visit with zero tears. Dr. Grant let him hold the mirror and showed him every tool. Now he actually asks to go back.",
    },
  },
  {
    id: "r4",
    author: { ru: "Софья Р.", en: "Sofia R." },
    rating: 5,
    serviceId: "aligners",
    text: {
      ru: "Носила элайнеры 10 месяцев. Елена каждый визит показывала прогресс на 3D-модели — мотивирует не бросать.",
      en: "Wore aligners for 10 months. Dr. Park showed my progress on a 3D model at every visit, which kept me motivated.",
    },
  },
  {
    id: "r5",
    author: { ru: "Дэвид М.", en: "David M." },
    rating: 4,
    serviceId: "cleaning",
    text: {
      ru: "Гигиена аккуратная и без спешки. Минус звезда только за парковку рядом — лучше приезжать на метро.",
      en: "Thorough, unhurried cleaning. One star off only because parking nearby is tough — BART is easier.",
    },
  },
  {
    id: "r6",
    author: { ru: "Ольга В.", en: "Olga V." },
    rating: 5,
    serviceId: "veneers",
    text: {
      ru: "Сделала шесть виниров. Сначала примерили временный вариант, чтобы я увидела форму. Результат естественный — никто не догадывается.",
      en: "Got six veneers. They let me try a temporary mock-up first so I could see the shape. The result looks so natural nobody can tell.",
    },
  },
  {
    id: "r7",
    author: { ru: "Алекс Н.", en: "Alex N." },
    rating: 5,
    serviceId: "whitening",
    text: {
      ru: "Записался через сайт вечером, утром перезвонили. Отбеливание прошло за час, чувствительности почти не было.",
      en: "Booked online in the evening and got a call back the next morning. Whitening took about an hour with barely any sensitivity.",
    },
  },
];
