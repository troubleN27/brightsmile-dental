"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const CLINIC_TIME_ZONE = "Europe/Moscow";
const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

type Status =
  | { kind: "open"; until: string }
  | { kind: "opensToday"; at: string }
  | { kind: "opensTomorrow"; at: string };

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "09:00" → "9:00" */
const shortTime = (hhmm: string) => hhmm.replace(/^0/, "");

function hoursFor(weekday: string) {
  return site.openingHours.find((slot) => (slot.days as readonly string[]).includes(weekday));
}

/** Clinic status right now, by Moscow time */
function currentStatus(now: Date): Status | null {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: CLINIC_TIME_ZONE,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const weekday = get("weekday");
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));

  const today = hoursFor(weekday);
  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { kind: "open", until: shortTime(today.closes) };
  }
  if (today && minutes < toMinutes(today.opens)) {
    return { kind: "opensToday", at: shortTime(today.opens) };
  }
  const tomorrow = hoursFor(WEEKDAYS[(WEEKDAYS.indexOf(weekday) + 1) % 7]);
  return tomorrow ? { kind: "opensTomorrow", at: shortTime(tomorrow.opens) } : null;
}

function subscribe(onChange: () => void) {
  const timer = setInterval(onChange, 60_000);
  return () => clearInterval(timer);
}

// A string snapshot keeps the value stable within the same minute
const snapshot = () => JSON.stringify(currentStatus(new Date()));

/** "Open today until 20:00" / "Opening tomorrow at 9:00", by the clinic's own clock */
export function OpenStatus({ className }: { className?: string }) {
  const t = useTranslations("OpenStatus");
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const status = raw ? (JSON.parse(raw) as Status | null) : null;

  return (
    // Same height before and after hydration, so nothing jumps
    <p className={cn("flex min-h-6 items-center gap-2 text-[15px] text-navy/80", className)} aria-live="polite">
      {status && (
        <>
          <span
            aria-hidden
            className={cn(
              "size-2 rounded-full",
              status.kind === "open" ? "bg-primary ring-4 ring-primary/20" : "bg-navy/30",
            )}
          />
          {status.kind === "open" && t("open", { time: status.until })}
          {status.kind === "opensToday" && t("opensToday", { time: status.at })}
          {status.kind === "opensTomorrow" && t("opensTomorrow", { time: status.at })}
        </>
      )}
    </p>
  );
}
