import type { FaqItem } from "./types";

export const faq: FaqItem[] = [
  {
    id: "pain",
    question: { ru: "Будет ли больно?", en: "Will it hurt?" },
    answer: {
      ru: "Мы используем современную местную анестезию и наносим обезболивающий гель перед уколом. Большинство пациентов чувствуют только лёгкое давление. Если станет некомфортно, достаточно поднять руку — врач сразу остановится.",
      en: "We use modern local anesthetic and apply a numbing gel before the injection, so most patients feel only light pressure. If anything feels uncomfortable, just raise your hand and your dentist will stop right away.",
    },
  },
  {
    id: "price",
    question: { ru: "Сколько стоит лечение?", en: "How much will my treatment cost?" },
    answer: {
      ru: "Цены «от» указаны в разделе «Услуги и цены». Точную стоимость врач назовёт после осмотра и выдаст письменный план — цена в нём не меняется без вашего согласия.",
      en: "Starting prices are listed under Services & Pricing. After your exam, your dentist gives you a written plan with exact costs, and that price won't change without your OK.",
    },
  },
  {
    id: "installments",
    question: { ru: "Можно ли оплатить в рассрочку?", en: "Do you offer payment plans?" },
    answer: {
      ru: "Да. Лечение от $500 можно разделить на ежемесячные платежи до 12 месяцев без переплаты. Условия обсудим на консультации.",
      en: "Yes. Treatment over $500 can be split into monthly payments for up to 12 months, interest-free. We'll go over the details at your consultation.",
    },
  },
  {
    id: "warranty",
    question: { ru: "Какая гарантия на лечение?", en: "Is my treatment guaranteed?" },
    answer: {
      ru: "Гарантия зависит от вида работы: на пломбы — 2 года, на коронки, виниры и импланты — до 5 лет. Условия гарантии прописаны в договоре, главное — приходить на профилактические осмотры.",
      en: "Coverage depends on the work: 2 years for fillings and up to 5 years for crowns, veneers and implants. The terms are spelled out in your agreement — the main condition is keeping up with routine checkups.",
    },
  },
  {
    id: "kids",
    question: { ru: "Лечите ли вы детей?", en: "Do you see children?" },
    answer: {
      ru: "Да, с трёх лет. Детский стоматолог начинает с знакомства и игры, а лечение проводит короткими визитами, чтобы у ребёнка не осталось страха.",
      en: "Yes, from age three. Our pediatric dentist starts with a friendly, playful introduction and keeps treatment visits short so kids leave without fear.",
    },
  },
  {
    id: "prepare",
    question: { ru: "Как подготовиться к первому визиту?", en: "How should I prepare for my first visit?" },
    answer: {
      ru: "Ничего особенного не нужно. Возьмите документ, список лекарств, которые принимаете, и прошлые снимки, если они есть. Приходите за 10 минут, чтобы спокойно заполнить анкету.",
      en: "Nothing special. Bring a photo ID, a list of any medications you take, and previous X-rays if you have them. Arriving 10 minutes early gives you time to fill out a short form.",
    },
  },
  {
    id: "insurance",
    question: { ru: "Вы работаете со страховкой?", en: "Do you accept dental insurance?" },
    answer: {
      ru: "Да, мы работаем с большинством PPO-страховок и сами оформляем документы для страховой компании. Уточните ваш план у администратора при записи.",
      en: "Yes, we're in network with most PPO plans and handle the claims paperwork for you. Mention your plan when you book and we'll check your coverage.",
    },
  },
];
