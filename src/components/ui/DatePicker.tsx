"use client";

import { forwardRef, useMemo, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

// Dates are kept as "YYYY-MM-DD" strings (same as the form schema) and handled
// in local time, so there are no time-zone shifts.

type Ymd = { year: number; month: number; day: number }; // month: 0–11

function parse(value: string): Ymd | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  return match ? { year: +match[1], month: +match[2] - 1, day: +match[3] } : null;
}

function format({ year, month, day }: Ymd) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${year}-${pad(month + 1)}-${pad(day)}`;
}

function toDate({ year, month, day }: Ymd) {
  return new Date(year, month, day);
}

function fromDate(date: Date): Ymd {
  return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}

function addDays(ymd: Ymd, days: number) {
  const date = toDate(ymd);
  date.setDate(date.getDate() + days);
  return fromDate(date);
}

function addMonths(ymd: Ymd, months: number) {
  // Clamp the day so that e.g. 31 Jan + 1 month = 28/29 Feb
  const target = new Date(ymd.year, ymd.month + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return { year: target.getFullYear(), month: target.getMonth(), day: Math.min(ymd.day, lastDay) };
}

const monthIndex = (ymd: Ymd) => ymd.year * 12 + ymd.month;

/** Monday-first weeks covering the month */
function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const offset = (first.getDay() + 6) % 7; // Monday = 0
  const start = new Date(year, month, 1 - offset);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weeks = Math.ceil((offset + daysInMonth) / 7);
  return Array.from({ length: weeks }, (_, w) =>
    Array.from({ length: 7 }, (_, d) =>
      fromDate(new Date(start.getFullYear(), start.getMonth(), start.getDate() + w * 7 + d)),
    ),
  );
}

type DatePickerProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  locale: string;
  /** Earliest selectable date, "YYYY-MM-DD" */
  min: string;
  /** How many months ahead can be browsed */
  monthsAhead?: number;
  labels: { placeholder: string; prevMonth: string; nextMonth: string; clear: string };
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

/** Date field with a month calendar in the site's style (instead of the native date input). */
export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(function DatePicker(
  {
    id,
    value,
    onChange,
    onBlur,
    locale,
    min,
    monthsAhead = 12,
    labels,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  },
  ref,
) {
  const minDate = parse(min) ?? fromDate(new Date());
  const selected = parse(value);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState<Ymd>(selected ?? minDate);
  const gridRef = useRef<HTMLDivElement>(null);

  const maxMonth = monthIndex(minDate) + monthsAhead;
  const isBeforeMin = (d: Ymd) => format(d) < format(minDate);
  const isAfterMax = (d: Ymd) => monthIndex(d) > maxMonth;

  const formatters = useMemo(
    () => ({
      trigger: new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", weekday: "short" }),
      title: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }),
      weekday: new Intl.DateTimeFormat(locale, { weekday: "short" }),
      full: new Intl.DateTimeFormat(locale, { dateStyle: "full" }),
    }),
    [locale],
  );
  // 1 Jan 2024 was a Monday
  const weekdays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => formatters.weekday.format(new Date(2024, 0, 1 + i))),
    [formatters],
  );

  const weeks = monthGrid(focused.year, focused.month);
  const title = formatters.title.format(toDate({ ...focused, day: 1 }));
  const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

  function focusDay(next: Ymd) {
    if (isBeforeMin(next)) next = minDate;
    if (isAfterMax(next)) return;
    setFocused(next);
    // Move DOM focus once the new day is rendered
    requestAnimationFrame(() =>
      gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${format(next)}"]`)?.focus(),
    );
  }

  function openChange(next: boolean) {
    setOpen(next);
    if (next) setFocused(selected ?? minDate);
    else onBlur?.();
  }

  function choose(day: Ymd) {
    onChange(format(day));
    setOpen(false);
  }

  function handleGridKeyDown(event: React.KeyboardEvent) {
    const moves: Record<string, () => Ymd> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => addMonths(focused, -1),
      PageDown: () => addMonths(focused, 1),
      Home: () => addDays(focused, -((toDate(focused).getDay() + 6) % 7)),
      End: () => addDays(focused, 6 - ((toDate(focused).getDay() + 6) % 7)),
    };
    const move = moves[event.key];
    if (!move) return;
    event.preventDefault();
    focusDay(move());
  }

  const canPrev = monthIndex(focused) > monthIndex(minDate);
  const canNext = monthIndex(focused) < maxMonth;
  const today = format(fromDate(new Date()));

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={openChange}>
      <PopoverPrimitive.Trigger
        ref={ref}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center gap-3 rounded-button border bg-field px-4 text-left text-base transition-colors outline-none",
          "hover:border-sky/60 focus-visible:border-sky-light focus-visible:ring-3 focus-visible:ring-sky/30",
          "data-[state=open]:border-sky-light data-[state=open]:ring-3 data-[state=open]:ring-sky/30",
          ariaInvalid ? "border-red-400" : "border-field-border",
        )}
      >
        <CalendarDays aria-hidden className="size-5 shrink-0 text-sky-light" />
        <span className={cn("min-w-0 flex-1 truncate", selected ? "text-white" : "text-sky-light/55")}>
          {selected ? formatters.trigger.format(toDate(selected)) : labels.placeholder}
        </span>
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          collisionPadding={16}
          aria-label={labels.placeholder}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            const target = format(selected ?? minDate);
            requestAnimationFrame(() =>
              gridRef.current?.querySelector<HTMLButtonElement>(`[data-date="${target}"]`)?.focus(),
            );
          }}
          className="z-50 w-[min(320px,calc(100vw-32px))] rounded-card bg-white p-3 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-navy/10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (!canPrev) return;
                // Never land on a disabled day, so the grid always has a focusable date
                const prev = addMonths(focused, -1);
                setFocused(isBeforeMin(prev) ? minDate : prev);
              }}
              disabled={!canPrev}
              aria-label={labels.prevMonth}
              className="flex size-9 cursor-pointer items-center justify-center rounded-[10px] text-navy hover:bg-surface disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <p aria-live="polite" className="font-bold text-navy">
              {capitalizedTitle}
            </p>
            <button
              type="button"
              onClick={() => canNext && setFocused(addMonths(focused, 1))}
              disabled={!canNext}
              aria-label={labels.nextMonth}
              className="flex size-9 cursor-pointer items-center justify-center rounded-[10px] text-navy hover:bg-surface disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </div>

          <div ref={gridRef} role="grid" aria-label={capitalizedTitle} onKeyDown={handleGridKeyDown}>
            <div role="row" className="grid grid-cols-7">
              {weekdays.map((weekday) => (
                <div
                  key={weekday}
                  role="columnheader"
                  className="pb-1 text-center text-xs font-semibold text-muted-foreground capitalize"
                >
                  {weekday}
                </div>
              ))}
            </div>
            {weeks.map((week) => (
              <div key={format(week[0])} role="row" className="grid grid-cols-7">
                {week.map((day) => {
                  const key = format(day);
                  const outside = day.month !== focused.month;
                  const disabled = isBeforeMin(day) || isAfterMax(day);
                  const isSelected = value === key;
                  const isFocused = format(focused) === key;
                  return (
                    <div key={key} role="gridcell" aria-selected={isSelected} className="p-0.5">
                      <button
                        type="button"
                        data-date={key}
                        tabIndex={isFocused ? 0 : -1}
                        disabled={disabled}
                        aria-label={formatters.full.format(toDate(day))}
                        aria-current={key === today ? "date" : undefined}
                        onClick={() => choose(day)}
                        onFocus={() => setFocused(day)}
                        className={cn(
                          "relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-[10px] text-sm font-semibold tabular-nums transition-colors outline-none",
                          "hover:bg-surface focus-visible:ring-2 focus-visible:ring-primary",
                          outside ? "text-navy/35" : "text-navy",
                          disabled && "cursor-default text-slate-300 hover:bg-transparent",
                          isSelected && "bg-primary text-white hover:bg-primary",
                        )}
                      >
                        {day.day}
                        {key === today && !isSelected && (
                          <span aria-hidden className="absolute bottom-1.5 size-1 rounded-full bg-primary-dark" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {selected && (
            <button
              type="button"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
              className="mt-2 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[10px] py-2 text-sm font-semibold text-muted-foreground hover:bg-surface hover:text-navy"
            >
              <X aria-hidden className="size-4" />
              {labels.clear}
            </button>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
