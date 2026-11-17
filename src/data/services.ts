import type { Service, ServiceCategory } from "./types";

export const serviceCategories: ServiceCategory[] = [
  "therapy",
  "hygiene",
  "implants",
  "orthodontics",
  "aesthetics",
  "kids",
];

export const services: Service[] = [
  // Therapy
  {
    id: "consultation",
    category: "therapy",
    title: { ru: "Консультация и план лечения", en: "Exam & Treatment Plan" },
    description: {
      ru: "Осмотр, 3D-снимок, если он нужен, и план лечения, где расписана цена каждого этапа.",
      en: "An exam, a 3D scan if needed, and a written plan that prices out each step.",
    },
    priceFrom: 1500,
  },
  {
    id: "filling",
    category: "therapy",
    title: { ru: "Лечение кариеса с пломбой", en: "Tooth-Colored Filling" },
    description: {
      ru: "Пломба под цвет вашего зуба. Ставим под местной анестезией.",
      en: "A filling matched to the shade of your tooth, done under local anesthetic.",
    },
    priceFrom: 6500,
  },
  {
    id: "root-canal",
    category: "therapy",
    title: { ru: "Лечение каналов", en: "Root Canal Treatment" },
    description: {
      ru: "Чистим и пломбируем каналы под микроскопом. Цель одна: оставить вам свой зуб.",
      en: "We clean and seal the canals under a microscope. The goal is to keep your own tooth.",
    },
    priceFrom: 18000,
  },
  {
    id: "crown",
    category: "therapy",
    title: { ru: "Керамическая коронка", en: "Ceramic Crown" },
    description: {
      ru: "Когда от зуба осталось мало. Коронку подбираем по цвету соседних зубов.",
      en: "For a tooth that's too damaged for a filling. Shade-matched to the teeth next to it.",
    },
    priceFrom: 28000,
  },

  // Hygiene
  {
    id: "cleaning",
    category: "hygiene",
    title: { ru: "Профессиональная гигиена", en: "Professional Cleaning" },
    description: {
      ru: "Снимаем камень ультразвуком, налёт убираем Air Flow, потом полируем. Около часа.",
      en: "Ultrasonic scaling for tartar, Air Flow for stains, then polishing. About an hour.",
    },
    priceFrom: 7500,
  },
  {
    id: "deep-cleaning",
    category: "hygiene",
    title: { ru: "Глубокая чистка дёсен", en: "Deep Cleaning (Scaling & Root Planing)" },
    description: {
      ru: "Чистка под десной. Помогает, если дёсны кровоточат при чистке зубов.",
      en: "Cleaning below the gumline. Helps if your gums bleed when you brush.",
    },
    priceFrom: 9000,
  },
  {
    id: "fluoride",
    category: "hygiene",
    title: { ru: "Фторирование эмали", en: "Fluoride Treatment" },
    description: {
      ru: "Покрываем эмаль фтором. Зубы меньше реагируют на холодное и кислое.",
      en: "A fluoride coating that makes teeth less sensitive to cold and sour food.",
    },
    priceFrom: 2500,
  },

  // Implants
  {
    id: "implant",
    category: "implants",
    title: { ru: "Имплант под ключ", en: "Single Implant, Start to Finish" },
    description: {
      ru: "Имплант, абатмент и коронка. Гарантия распространяется на всё целиком.",
      en: "Implant, abutment and crown. The warranty covers all three.",
    },
    priceFrom: 75000,
  },
  {
    id: "bone-graft",
    category: "implants",
    title: { ru: "Наращивание кости", en: "Bone Grafting" },
    description: {
      ru: "Нужно, если кости не хватает, чтобы поставить имплант. Покажет 3D-снимок.",
      en: "Needed when there isn't enough bone to hold an implant. A 3D scan will show it.",
    },
    priceFrom: 25000,
  },
  {
    id: "all-on-4",
    category: "implants",
    title: { ru: "Протез на 4 имплантах", en: "All-on-4 Full Arch" },
    description: {
      ru: "Несъёмный протез на всю челюсть, который держится на четырёх имплантах.",
      en: "A fixed full-arch bridge held by four implants.",
    },
    priceFrom: 380000,
  },
  {
    id: "extraction",
    category: "implants",
    title: { ru: "Удаление зуба", en: "Tooth Extraction" },
    description: {
      ru: "Удаляем зубы, в том числе зубы мудрости. После расскажем, как ухаживать за лункой.",
      en: "Including wisdom teeth. We'll tell you how to look after the socket afterwards.",
    },
    priceFrom: 4500,
  },

  // Orthodontics
  {
    id: "aligners",
    category: "orthodontics",
    title: { ru: "Элайнеры", en: "Clear Aligners" },
    description: {
      ru: "Прозрачные капы, которые постепенно выравнивают зубы. Со стороны их почти не видно.",
      en: "Clear trays that move your teeth bit by bit. Hard to spot from the outside.",
    },
    priceFrom: 180000,
  },
  {
    id: "braces",
    category: "orthodontics",
    title: { ru: "Брекет-система", en: "Braces" },
    description: {
      ru: "Металлические или керамические. Исправляют прикус и кривые зубы.",
      en: "Metal or ceramic. They fix your bite and crooked teeth.",
    },
    priceFrom: 140000,
  },
  {
    id: "retainer",
    category: "orthodontics",
    title: { ru: "Ретейнер", en: "Retainer" },
    description: {
      ru: "Без него зубы после брекетов или элайнеров понемногу возвращаются назад.",
      en: "Without one, teeth slowly drift back after braces or aligners.",
    },
    priceFrom: 12000,
  },

  // Aesthetics
  {
    id: "whitening",
    category: "aesthetics",
    title: { ru: "Отбеливание в клинике", en: "In-Office Whitening" },
    description: {
      ru: "Осветляем эмаль на несколько тонов. Занимает около часа.",
      en: "Lightens your teeth by a few shades. Takes about an hour.",
    },
    priceFrom: 25000,
  },
  {
    id: "veneers",
    category: "aesthetics",
    title: { ru: "Керамические виниры", en: "Porcelain Veneers" },
    description: {
      ru: "Тонкие керамические пластинки, которые меняют форму и цвет зуба. Цена за один зуб.",
      en: "Thin porcelain shells that change a tooth's shape and color. Price per tooth.",
    },
    priceFrom: 45000,
  },
  {
    id: "bonding",
    category: "aesthetics",
    title: { ru: "Художественная реставрация", en: "Cosmetic Bonding" },
    description: {
      ru: "Закрываем сколы и небольшие щели композитом. Обычно хватает одного визита.",
      en: "We fix chips and small gaps with composite. Usually done in one visit.",
    },
    priceFrom: 9000,
  },

  // Kids
  {
    id: "kids-checkup",
    category: "kids",
    title: { ru: "Первый визит ребёнка", en: "Child's First Visit" },
    description: {
      ru: "Ребёнок знакомится с врачом и креслом, врач смотрит зубы и даёт советы родителям.",
      en: "Your child meets the dentist and the chair, gets a checkup, and you get tips for home.",
    },
    priceFrom: 1500,
  },
  {
    id: "kids-filling",
    category: "kids",
    title: { ru: "Лечение молочных зубов", en: "Baby Tooth Fillings" },
    description: {
      ru: "Лечим с обезболиванием и делаем перерывы, когда ребёнок устаёт.",
      en: "Done with numbing, and we take breaks whenever your child needs one.",
    },
    priceFrom: 4500,
  },
  {
    id: "sealants",
    category: "kids",
    title: { ru: "Герметизация фиссур", en: "Dental Sealants" },
    description: {
      ru: "Закрываем бороздки на жевательных зубах, чтобы туда не попадала еда. Цена за один зуб.",
      en: "We seal the grooves in back teeth so food can't get stuck there. Price per tooth.",
    },
    priceFrom: 2500,
  },
];

export function getService(id: string) {
  return services.find((service) => service.id === id);
}
