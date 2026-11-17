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
      ru: "Поставил имплант у Михаила Ремизова. Получил план с ценой на каждый этап. В итоге заплатил ровно столько, сколько там было написано.",
      en: "Had an implant placed by Dr. Remizov. The plan listed a price for every step, and I paid exactly that, not a ruble more.",
    },
  },
  {
    id: "r3",
    author: { ru: "Марина Л.", en: "Marina L." },
    rating: 5,
    serviceId: "kids-checkup",
    text: {
      ru: "Сын впервые пошёл к стоматологу без слёз. Ольга Андреевна показала инструменты, дала подержать зеркальце. Теперь сам спрашивает, когда снова пойдём.",
      en: "My son's first dentist visit with zero tears. Dr. Granina let him hold the mirror and showed him every tool. Now he actually asks to go back.",
    },
  },
  {
    id: "r4",
    author: { ru: "Софья Р.", en: "Sofia R." },
    rating: 5,
    serviceId: "aligners",
    text: {
      ru: "Носила элайнеры 10 месяцев. Елена Викторовна каждый визит показывала на 3D-модели, как сдвинулись зубы. Очень помогает не бросить.",
      en: "Wore aligners for 10 months. Dr. Pak showed my progress on a 3D model at every visit, which kept me motivated.",
    },
  },
  {
    id: "r5",
    author: { ru: "Джеймс Т.", en: "James T." },
    rating: 4,
    serviceId: "cleaning",
    text: {
      ru: "Врач и администратор говорят по-английски, так что переводчик не понадобился. Звезду снимаю только за парковку: в центре её почти нет, проще доехать на метро.",
      en: "Really glad to find a clinic in Moscow where the staff speak English. No translator needed. One star off for parking, which is tough in the center. Take the metro.",
    },
  },
  {
    id: "r6",
    author: { ru: "Ольга В.", en: "Olga V." },
    rating: 5,
    serviceId: "veneers",
    text: {
      ru: "Сделала шесть виниров. Сначала примерили временный вариант, чтобы я увидела форму. Выглядит естественно, никто не догадывается.",
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
  {
    id: "r8",
    author: { ru: "Павел Г.", en: "Pavel G." },
    rating: 5,
    serviceId: "extraction",
    text: {
      ru: "Удаляли нижнюю восьмёрку, которая росла боком. Михаил Ремизов показал на снимке, как лежат корни, и честно сказал, что будет отёк. Отёк был, но через три дня уже ходил на работу.",
      en: "Had a sideways lower wisdom tooth taken out. Dr. Remizov showed me on the scan how the roots sat and was upfront that there'd be swelling. There was, but I was back at work in three days.",
    },
  },
  {
    id: "r9",
    author: { ru: "Наталья С.", en: "Natalia S." },
    rating: 4,
    serviceId: "kids-filling",
    text: {
      ru: "Дочке шесть лет, лечили два молочных зуба за два визита. Врач терпеливая, дочь не плакала. Одна звезда долой: на второй приём пришлось ждать минут двадцать.",
      en: "My daughter is six and had two baby teeth filled over two visits. The dentist was patient and there were no tears. One star off because we waited about twenty minutes for the second appointment.",
    },
  },
  {
    id: "r10",
    author: { ru: "Анна М.", en: "Anna M." },
    rating: 5,
    serviceId: "deep-cleaning",
    text: {
      ru: "Год кровили дёсны при чистке зубов, думала, так и надо. Сделали глубокую чистку и показали, как пользоваться ирригатором. Через месяц кровь пропала.",
      en: "My gums had bled when I brushed for a year and I thought that was normal. They did a deep cleaning and showed me how to use a water flosser. A month later the bleeding stopped.",
    },
  },
];
