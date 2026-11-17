import type { FaqItem } from "./types";

export const faq: FaqItem[] = [
  {
    id: "pain",
    question: { ru: "Будет больно?", en: "Will it hurt?" },
    answer: {
      ru: "Перед уколом мы смазываем десну обезболивающим гелем, поэтому сам укол почти не чувствуется. После анестезии большинство пациентов ощущают только давление. Если станет неприятно, поднимите руку, и врач сразу остановится.",
      en: "We put numbing gel on the gum before the injection, so you barely feel it. Once the anesthetic kicks in, most people only notice some pressure. If anything bothers you, raise your hand and your dentist will stop.",
    },
  },
  {
    id: "price",
    question: { ru: "Сколько будет стоить лечение?", en: "How much will my treatment cost?" },
    answer: {
      ru: "Начальные цены есть в разделе «Услуги и цены». Точную сумму врач назовёт после осмотра и запишет в план лечения. Без вашего согласия она не изменится.",
      en: "Starting prices are in the Services & Pricing section. After the exam, your dentist writes the exact cost into your treatment plan, and it won't change unless you agree to it.",
    },
  },
  {
    id: "installments",
    question: { ru: "Можно платить частями?", en: "Can I pay in installments?" },
    answer: {
      ru: "Да, если лечение стоит от 30 000 ₽. Платежи можно растянуть до 12 месяцев без переплаты. Рассрочку оформляет банк-партнёр прямо в клинике, подробности расскажем на консультации.",
      en: "Yes, for treatment over ₽30,000. You can spread payments over up to 12 months with no interest. Our partner bank sets it up right here at the clinic, and we'll walk you through it at the consultation.",
    },
  },
  {
    id: "warranty",
    question: { ru: "Какая гарантия?", en: "What's the warranty?" },
    answer: {
      ru: "На пломбы 2 года, на коронки, виниры и импланты до 5 лет. Все условия есть в договоре. Главное из них: раз в полгода приходить на осмотр.",
      en: "Two years on fillings and up to five years on crowns, veneers and implants. The full terms are in your contract. The main one is coming in for a checkup every six months.",
    },
  },
  {
    id: "kids",
    question: { ru: "Детей лечите?", en: "Do you treat children?" },
    answer: {
      ru: "Да, с трёх лет. Детский врач сначала знакомится с ребёнком, даёт посидеть в кресле и подержать зеркальце. Лечит короткими визитами, чтобы ребёнок не устал и не испугался.",
      en: "Yes, from age three. Our pediatric dentist lets your child sit in the chair and hold the mirror before doing anything. Visits are kept short so kids don't get tired or scared.",
    },
  },
  {
    id: "prepare",
    question: { ru: "Что взять с собой на первый приём?", en: "What should I bring to my first visit?" },
    answer: {
      ru: "Паспорт, список лекарств, которые вы принимаете, и старые снимки, если они есть. Приходите минут за десять: нужно будет заполнить короткую анкету.",
      en: "Your passport, a list of any medications you take, and old X-rays if you have them. Come about ten minutes early to fill out a short form.",
    },
  },
  {
    id: "insurance",
    question: { ru: "Принимаете ДМС? Дадите документы для налогового вычета?", en: "Do you take health insurance?" },
    answer: {
      ru: "Да, работаем с полисами ДМС крупных страховых. Назовите свою страховую при записи, и администратор проверит, что входит в полис. Для налогового вычета дадим справку об оплате и копию лицензии.",
      en: "Yes, we work with the major Russian DMS insurers. Tell us your provider when you book and we'll check your coverage. If you have travel insurance, we can give you an itemized invoice in English for your claim.",
    },
  },
  {
    id: "urgent",
    question: { ru: "Болит зуб. Можно прийти сегодня?", en: "I have a toothache. Can I come in today?" },
    answer: {
      ru: "Позвоните нам, а не оставляйте заявку на сайте: так быстрее. С острой болью стараемся принять в тот же день, даже если на сегодня всё расписано. Врач снимет боль и скажет, что делать дальше.",
      en: "Call us rather than booking online, it's faster. We try to see people in pain the same day, even when the schedule is full. Your dentist will deal with the pain first and then explain what comes next.",
    },
  },
  {
    id: "pregnancy",
    question: { ru: "Можно лечить зубы во время беременности?", en: "Can I have dental work while pregnant?" },
    answer: {
      ru: "Можно, и запускать кариес как раз не стоит. Удобнее всего лечиться во втором триместре. Используем анестетики, которые разрешены беременным, а снимки делаем только если без них никак. Скажите о беременности, когда будете записываться.",
      en: "Yes, and it's better not to let a cavity get worse. The second trimester is the most comfortable time. We use anesthetics that are safe in pregnancy and only take X-rays when there's no way around it. Just let us know you're pregnant when you book.",
    },
  },
  {
    id: "lifespan",
    question: { ru: "Сколько прослужит пломба или винир?", en: "How long will a filling or veneer last?" },
    answer: {
      ru: "Пломба обычно служит 5–7 лет, керамические виниры и коронки 10–15 лет. Многое зависит от вас: если раз в полгода приходить на осмотр и чистку, работа живёт дольше. Гарантийные сроки прописаны в договоре.",
      en: "A filling usually lasts 5 to 7 years, porcelain veneers and crowns 10 to 15. A lot depends on you: coming in for a checkup and cleaning every six months makes them last longer. The warranty periods are in your contract.",
    },
  },
  {
    id: "after-care",
    question: { ru: "Что делать, если после лечения что-то беспокоит?", en: "What if something bothers me after treatment?" },
    answer: {
      ru: "Позвоните администратору и опишите, что происходит. Лёгкая чувствительность пару дней после пломбы бывает и проходит сама. Если болит сильнее или дольше, врач посмотрит вас в ближайшие дни, и по гарантии это бесплатно.",
      en: "Call the front desk and tell us what's going on. Some sensitivity for a couple of days after a filling is normal and passes on its own. If it hurts more or for longer, your dentist will see you within a few days, free of charge under the warranty.",
    },
  },
];
