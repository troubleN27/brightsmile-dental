import type { Doctor } from "./types";

export const doctors: Doctor[] = [
  {
    id: "anna-sokolova",
    name: { ru: "Анна Соколова", en: "Anna Sokolova, DDS" },
    specialty: {
      ru: "Главный врач, терапевт-эндодонтист",
      en: "Clinical Director, Endodontics",
    },
    experienceYears: 15,
    photo: "/images/doctors/anna-sokolova.webp",
  },
  {
    id: "michael-reyes",
    name: { ru: "Майкл Рейес", en: "Michael Reyes, DMD" },
    specialty: {
      ru: "Хирург-имплантолог",
      en: "Oral Surgery & Implants",
    },
    experienceYears: 18,
    photo: "/images/doctors/michael-reyes.webp",
  },
  {
    id: "elena-park",
    name: { ru: "Елена Пак", en: "Elena Park, DDS" },
    specialty: {
      ru: "Ортодонт",
      en: "Orthodontics",
    },
    experienceYears: 11,
    photo: "/images/doctors/elena-park.webp",
  },
  {
    id: "olivia-grant",
    name: { ru: "Оливия Грант", en: "Olivia Grant, DDS" },
    specialty: {
      ru: "Детский стоматолог",
      en: "Pediatric Dentistry",
    },
    experienceYears: 9,
    photo: "/images/doctors/olivia-grant.webp",
  },
];

export function getDoctor(id: string) {
  return doctors.find((doctor) => doctor.id === id);
}
