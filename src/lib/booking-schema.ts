import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";
import { doctors } from "@/data/doctors";
import { services } from "@/data/services";
import { routing } from "@/i18n/routing";

// Error messages are translation keys (Booking.errors.*), so the same schema
// works on the client and the server and errors show in the visitor's language.

const serviceIds = services.map((s) => s.id) as [string, ...string[]];
const doctorIds = doctors.map((d) => d.id) as [string, ...string[]];

export const timesOfDay = ["morning", "day", "evening"] as const;
export type TimeOfDay = (typeof timesOfDay)[number];

/** "YYYY-MM-DD" for a Date in local time */
export function toIsoDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Earliest date a visitor may pick. In the browser it is today; on the server
 * we allow one extra day back because the visitor's time zone is unknown.
 */
function earliestAllowedDate() {
  const now = new Date();
  if (typeof window === "undefined") now.setDate(now.getDate() - 1);
  return toIsoDate(now);
}

/** True for an existing calendar day: rejects "2026-02-31", "2026-13-01" and the like */
function isRealDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

const optional = <T extends z.ZodType>(schema: T) =>
  z.union([schema, z.literal("")]).optional();

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "nameRequired" })
    .min(2, { error: "nameTooShort" })
    .max(50, { error: "nameTooLong" }),
  phone: z
    .string()
    .min(1, { error: "phoneRequired" })
    .refine((value) => isValidPhoneNumber(value), { error: "phoneInvalid" }),
  serviceId: optional(z.enum(serviceIds, { error: "invalidChoice" })),
  doctorId: optional(z.enum(doctorIds, { error: "invalidChoice" })),
  date: optional(
    z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, { error: "dateInvalid" })
      .refine(isRealDate, { error: "dateInvalid" })
      .refine((value) => value >= earliestAllowedDate(), { error: "dateInPast" }),
  ),
  timeOfDay: optional(z.enum(timesOfDay, { error: "invalidChoice" })),
  comment: z.string().trim().max(500, { error: "commentTooLong" }).optional(),
  consent: z.literal(true, { error: "consentRequired" }),
  // Honeypot: real visitors never see this field
  website: z.string().max(200).optional(),
  locale: z.enum(routing.locales),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingData = z.output<typeof bookingSchema>;
