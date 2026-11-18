import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "anna-sokolova",
    name: { ru: "Анна Соколова", en: "Anna Sokolova" },
    specialty: {
      ru: "Главный врач, терапевт-эндодонтист",
      en: "Clinical Director, Endodontics",
    },
    experienceYears: 15,
    photo: "/images/doctors/anna-sokolova.webp",
    bio: {
      ru: "Лечит каналы под микроскопом и берётся за зубы, которые в других клиниках советуют удалить. Как главный врач проверяет каждый план лечения.",
      en: "Does root canals under a microscope and takes on teeth other clinics suggest pulling. As clinical director, she reviews every treatment plan.",
    },
    education: {
      ru: "МГМСУ им. А. И. Евдокимова, ординатура по терапевтической стоматологии",
      en: "Moscow State University of Medicine and Dentistry, residency in restorative dentistry",
    },
  },
  {
    id: "mikhail-remizov",
    name: { ru: "Михаил Ремизов", en: "Mikhail Remizov" },
    specialty: {
      ru: "Хирург-имплантолог",
      en: "Oral Surgery & Implants",
    },
    experienceYears: 18,
    photo: "/images/doctors/mikhail-remizov.webp",
    bio: {
      ru: "Ставит импланты и удаляет сложные зубы мудрости. До операции показывает план на 3D-снимке и честно говорит, сколько займёт заживление.",
      en: "Places implants and removes difficult wisdom teeth. Before surgery he walks you through the plan on a 3D scan and is honest about healing time.",
    },
    education: {
      ru: "Первый МГМУ им. И. М. Сеченова, ординатура по хирургической стоматологии",
      en: "Sechenov First Moscow State Medical University, residency in oral surgery",
    },
  },
  {
    id: "elena-pak",
    name: { ru: "Елена Пак", en: "Elena Pak" },
    specialty: {
      ru: "Ортодонт",
      en: "Orthodontics",
    },
    experienceYears: 11,
    photo: "/images/doctors/elena-pak.webp",
    bio: {
      ru: "Исправляет прикус брекетами и элайнерами у подростков и взрослых. На каждом визите показывает на 3D-модели, как сдвинулись зубы.",
      en: "Straightens teeth with braces and clear aligners for teens and adults. At every visit she shows you on a 3D model how your teeth have moved.",
    },
    education: {
      ru: "РУДН, ординатура по ортодонтии",
      en: "RUDN University, residency in orthodontics",
    },
  },
  {
    id: "olga-granina",
    name: { ru: "Ольга Гранина", en: "Olga Granina" },
    specialty: {
      ru: "Детский стоматолог",
      en: "Pediatric Dentistry",
    },
    experienceYears: 9,
    photo: "/images/doctors/olga-granina.webp",
    bio: {
      ru: "Лечит детей с трёх лет. Первый визит проводит без лечения, чтобы ребёнок привык к креслу и к ней самой.",
      en: "Sees children from age three. The first visit has no treatment at all, so kids can get used to the chair and to her.",
    },
    education: {
      ru: "РНИМУ им. Н. И. Пирогова, ординатура по детской стоматологии",
      en: "Pirogov Russian National Research Medical University, residency in pediatric dentistry",
    },
  },
];

export function getDoctor(id: string) {
  return doctors.find((doctor) => doctor.id === id);
}
