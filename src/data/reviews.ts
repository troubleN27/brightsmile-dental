import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    author: { ru: "Ирина К.", en: "Irina K." },
    rating: 5,
    serviceId: "root-canal",
    text: {
      ru: "Очень боялась лечить каналы, но Анна Сергеевна всё объяснила заранее и делала перерывы. Было спокойно, а зуб удалось сохранить.",
      en: "I was dreading a root canal, but Dr. Sokolova explained everything up front and gave me breaks whenever I needed. It was calm, and she saved the tooth.",
    },
  },
  {
    id: "r2",
    author: { ru: "Дмитрий В.", en: "Dmitry V." },
    rating: 5,
    serviceId: "implant",
    text: {
      ru: "Поставил имплант у Михаила Ремизова. Получил план с ценой на каждый этап — итог совпал до рубля.",
      en: "Had an implant placed by Dr. Remizov. The written plan priced every step, and the final bill matched it to the ruble.",
    },
  },
  {
    id: "r3",
    author: { ru: "Марина Л.", en: "Marina L." },
    rating: 5,
    serviceId: "kids-checkup",
    text: {
      ru: "Сын впервые пошёл к стоматологу без слёз. Ольга Андреевна показала инструменты, дала подержать зеркальце — теперь он сам просится на осмотр.",
      en: "My son's first dentist visit with zero tears. Dr. Granina let him hold the mirror and showed him every tool. Now he actually asks to go back.",
    },
  },
  {
    id: "r4",
    author: { ru: "Софья Р.", en: "Sofia R." },
    rating: 5,
    serviceId: "aligners",
    text: {
      ru: "Носила элайнеры 10 месяцев. Елена Викторовна каждый визит показывала прогресс на 3D-модели — мотивирует не бросать.",
      en: "Wore aligners for 10 months. Dr. Pak showed my progress on a 3D model at every visit, which kept me motivated.",
    },
  },
  {
    id: "r5",
    author: { ru: "Джеймс Т.", en: "James T." },
    rating: 4,
    serviceId: "cleaning",
    text: {
      ru: "Хорошо, что в клинике говорят по-английски — всё объяснили без переводчика. Минус звезда только за парковку в центре: удобнее приезжать на метро.",
      en: "Great to find a clinic in Moscow where the staff speak English — everything was explained without a translator. One star off only for parking in the center; the metro is easier.",
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
    author: { ru: "Алексей Н.", en: "Alexey N." },
    rating: 5,
    serviceId: "whitening",
    text: {
      ru: "Записался через сайт вечером, утром перезвонили. Отбеливание прошло за час, чувствительности почти не было.",
      en: "Booked online in the evening and got a call back the next morning. Whitening took about an hour with barely any sensitivity.",
    },
  },
];
