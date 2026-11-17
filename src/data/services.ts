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
      ru: "Осмотр, 3D-снимок при необходимости и письменный план с ценами на каждый этап.",
      en: "A full exam, 3D scan if needed, and a written plan with the cost of every step.",
    },
    priceFrom: 60,
  },
  {
    id: "filling",
    category: "therapy",
    title: { ru: "Лечение кариеса с пломбой", en: "Tooth-Colored Filling" },
    description: {
      ru: "Светоотверждаемая пломба в цвет зуба под местной анестезией.",
      en: "A composite filling matched to your tooth shade, done under local numbing.",
    },
    priceFrom: 150,
  },
  {
    id: "root-canal",
    category: "therapy",
    title: { ru: "Лечение каналов", en: "Root Canal Treatment" },
    description: {
      ru: "Лечение под микроскопом, чтобы сохранить зуб и избавить от воспаления.",
      en: "Microscope-guided treatment that clears infection and saves the natural tooth.",
    },
    priceFrom: 900,
  },
  {
    id: "crown",
    category: "therapy",
    title: { ru: "Керамическая коронка", en: "Ceramic Crown" },
    description: {
      ru: "Восстановление сильно разрушенного зуба прочной и естественной на вид коронкой.",
      en: "A strong, natural-looking crown to restore a heavily damaged tooth.",
    },
    priceFrom: 1100,
  },

  // Hygiene
  {
    id: "cleaning",
    category: "hygiene",
    title: { ru: "Профессиональная гигиена", en: "Professional Cleaning" },
    description: {
      ru: "Ультразвук, Air Flow и полировка — удаляем налёт и камень за один визит.",
      en: "Ultrasonic scaling, Air Flow and polishing to remove plaque and tartar in one visit.",
    },
    priceFrom: 120,
  },
  {
    id: "deep-cleaning",
    category: "hygiene",
    title: { ru: "Глубокая чистка дёсен", en: "Deep Cleaning (Scaling & Root Planing)" },
    description: {
      ru: "Чистка под линией десны при кровоточивости и воспалении.",
      en: "Cleaning below the gumline for bleeding or inflamed gums.",
    },
    priceFrom: 250,
  },
  {
    id: "fluoride",
    category: "hygiene",
    title: { ru: "Фторирование эмали", en: "Fluoride Treatment" },
    description: {
      ru: "Укрепляет эмаль и снижает чувствительность зубов.",
      en: "Strengthens enamel and helps reduce tooth sensitivity.",
    },
    priceFrom: 40,
  },

  // Implants
  {
    id: "implant",
    category: "implants",
    title: { ru: "Имплант под ключ", en: "Single Implant, Start to Finish" },
    description: {
      ru: "Установка импланта, абатмент и коронка — с гарантией на всю конструкцию.",
      en: "Implant, abutment and crown, with a warranty covering the whole restoration.",
    },
    priceFrom: 2400,
  },
  {
    id: "bone-graft",
    category: "implants",
    title: { ru: "Наращивание кости", en: "Bone Grafting" },
    description: {
      ru: "Восстанавливает объём кости, если её недостаточно для импланта.",
      en: "Rebuilds bone volume when there is not enough to place an implant.",
    },
    priceFrom: 600,
  },
  {
    id: "all-on-4",
    category: "implants",
    title: { ru: "Протез на 4 имплантах", en: "All-on-4 Full Arch" },
    description: {
      ru: "Несъёмный протез всей челюсти на четырёх имплантах.",
      en: "A fixed full-arch bridge supported by four implants.",
    },
    priceFrom: 14500,
  },
  {
    id: "extraction",
    category: "implants",
    title: { ru: "Удаление зуба", en: "Tooth Extraction" },
    description: {
      ru: "Аккуратное удаление, в том числе зубов мудрости, с бережным обезболиванием.",
      en: "Gentle removal, including wisdom teeth, with careful numbing.",
    },
    priceFrom: 180,
  },

  // Orthodontics
  {
    id: "aligners",
    category: "orthodontics",
    title: { ru: "Элайнеры", en: "Clear Aligners" },
    description: {
      ru: "Прозрачные капы для выравнивания зубов — почти незаметны для окружающих.",
      en: "Nearly invisible trays that gradually straighten your teeth.",
    },
    priceFrom: 3500,
  },
  {
    id: "braces",
    category: "orthodontics",
    title: { ru: "Брекет-система", en: "Braces" },
    description: {
      ru: "Металлические или керамические брекеты для исправления прикуса.",
      en: "Metal or ceramic braces to correct your bite and alignment.",
    },
    priceFrom: 4200,
  },
  {
    id: "retainer",
    category: "orthodontics",
    title: { ru: "Ретейнер", en: "Retainer" },
    description: {
      ru: "Сохраняет результат после брекетов или элайнеров.",
      en: "Keeps your teeth in place after braces or aligners.",
    },
    priceFrom: 250,
  },

  // Aesthetics
  {
    id: "whitening",
    category: "aesthetics",
    title: { ru: "Отбеливание в клинике", en: "In-Office Whitening" },
    description: {
      ru: "Осветление эмали на несколько тонов за один визит.",
      en: "Brightens your smile by several shades in a single visit.",
    },
    priceFrom: 350,
  },
  {
    id: "veneers",
    category: "aesthetics",
    title: { ru: "Керамические виниры", en: "Porcelain Veneers" },
    description: {
      ru: "Тонкие накладки, которые меняют форму и цвет зуба. Цена за один зуб.",
      en: "Thin shells that refine tooth shape and color. Price per tooth.",
    },
    priceFrom: 1100,
  },
  {
    id: "bonding",
    category: "aesthetics",
    title: { ru: "Художественная реставрация", en: "Cosmetic Bonding" },
    description: {
      ru: "Исправляем сколы и щели композитом за один визит.",
      en: "Repairs chips and small gaps with composite in one visit.",
    },
    priceFrom: 250,
  },

  // Kids
  {
    id: "kids-checkup",
    category: "kids",
    title: { ru: "Первый визит ребёнка", en: "Child's First Visit" },
    description: {
      ru: "Знакомство с врачом в игровой форме, осмотр и советы родителям.",
      en: "A playful first meeting with the dentist, an exam, and tips for parents.",
    },
    priceFrom: 50,
  },
  {
    id: "kids-filling",
    category: "kids",
    title: { ru: "Лечение молочных зубов", en: "Baby Tooth Fillings" },
    description: {
      ru: "Бережное лечение с обезболиванием и короткими перерывами.",
      en: "Gentle treatment with numbing and plenty of short breaks.",
    },
    priceFrom: 110,
  },
  {
    id: "sealants",
    category: "kids",
    title: { ru: "Герметизация фиссур", en: "Dental Sealants" },
    description: {
      ru: "Защищает жевательные зубы от кариеса. Цена за один зуб.",
      en: "Protects back teeth from cavities. Price per tooth.",
    },
    priceFrom: 45,
  },
];

export function getService(id: string) {
  return services.find((service) => service.id === id);
}
