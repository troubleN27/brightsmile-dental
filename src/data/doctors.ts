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
  },
];

export function getDoctor(id: string) {
  return doctors.find((doctor) => doctor.id === id);
}
