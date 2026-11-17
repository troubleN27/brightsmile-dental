import type { Case } from "./types";

const casePhoto = (id: string, stage: "before" | "after") =>
  `/images/cases/${id}-${stage}.webp`;

export const cases: Case[] = [
  {
    id: "veneers-front",
    serviceId: "veneers",
    before: casePhoto("veneers-front", "before"),
    after: casePhoto("veneers-front", "after"),
    duration: { ru: "3 недели", en: "3 weeks" },
  },
  {
    id: "aligners-crowding",
    serviceId: "aligners",
    before: casePhoto("aligners-crowding", "before"),
    after: casePhoto("aligners-crowding", "after"),
    duration: { ru: "11 месяцев", en: "11 months" },
  },
  {
    id: "implant-molar",
    serviceId: "implant",
    before: casePhoto("implant-molar", "before"),
    after: casePhoto("implant-molar", "after"),
    duration: { ru: "4 месяца", en: "4 months" },
  },
  {
    id: "whitening",
    serviceId: "whitening",
    before: casePhoto("whitening", "before"),
    after: casePhoto("whitening", "after"),
    duration: { ru: "1 визит", en: "1 visit" },
  },
  {
    id: "bonding-chip",
    serviceId: "bonding",
    before: casePhoto("bonding-chip", "before"),
    after: casePhoto("bonding-chip", "after"),
    duration: { ru: "1 визит", en: "1 visit" },
  },
];
