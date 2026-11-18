"use client";

import { useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { getCountryCallingCode, type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { cn } from "@/lib/utils";

type CountryOption = { value?: Country; label: string; divider?: boolean };

/** Props passed by react-phone-number-input plus our own texts (via `countrySelectProps`). */
export type CountrySelectProps = {
  value?: Country;
  options: CountryOption[];
  onChange: (value?: Country) => void;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  disabled?: boolean;
  readOnly?: boolean;
  "aria-label"?: string;
  searchPlaceholder: string;
  emptyText: string;
};

export function CountryFlag({ country, className }: { country?: Country; className?: string }) {
  const Flag = country ? flags[country] : undefined;
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-[15px] w-[22px] shrink-0 overflow-hidden rounded-[3px] bg-slate-200 ring-1 ring-navy/10 [&>svg]:size-full",
        className,
      )}
    >
      {Flag && <Flag title="" />}
    </span>
  );
}

function callingCode(country: Country) {
  return `+${getCountryCallingCode(country)}`;
}

/**
 * Country picker for the phone field: flag + ISO code on the trigger, and a
 * searchable dropdown with flags, country names and calling codes.
 */
export function CountrySelect({
  value,
  options,
  onChange,
  onFocus,
  onBlur,
  disabled,
  readOnly,
  "aria-label": ariaLabel,
  searchPlaceholder,
  emptyText,
}: CountrySelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const countries = useMemo(
    () => options.filter((o): o is CountryOption & { value: Country } => !o.divider && !!o.value),
    [options],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, "");
    if (!q) return countries;
    return countries.filter(
      (o) =>
        o.label.toLowerCase().includes(q) ||
        o.value.toLowerCase() === q ||
        getCountryCallingCode(o.value).startsWith(q),
    );
  }, [countries, query]);

  const selectedLabel = countries.find((o) => o.value === value)?.label ?? "";

  function openChange(next: boolean) {
    if (disabled || readOnly) return;
    setOpen(next);
    if (next) {
      setQuery("");
      // Start the highlight on the selected country
      setActiveIndex(Math.max(0, countries.findIndex((o) => o.value === value)));
      // Bring the selected country into view once the list renders
      requestAnimationFrame(() =>
        listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "center" }),
      );
    }
  }

  function choose(country: Country) {
    setOpen(false);
    onChange(country);
  }

  function moveActive(next: number) {
    if (filtered.length === 0) return;
    const index = (next + filtered.length) % filtered.length;
    setActiveIndex(index);
    listRef.current?.children[index]?.scrollIntoView({ block: "nearest" });
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(activeIndex + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveActive(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveActive(filtered.length - 1);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const option = filtered[activeIndex];
      if (option) choose(option.value);
    }
  }

  const activeOption = filtered[activeIndex];

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={openChange}>
      <PopoverPrimitive.Trigger
        type="button"
        disabled={disabled}
        aria-label={`${ariaLabel ?? ""}: ${selectedLabel}`.trim()}
        onFocus={onFocus}
        onBlur={onBlur}
        className="flex h-full shrink-0 cursor-pointer items-center gap-2 rounded-l-button border-r border-white/25 pr-2.5 pl-1 text-sm font-bold text-white outline-none hover:bg-white/10 focus-visible:bg-white/10 disabled:cursor-not-allowed"
      >
        <CountryFlag country={value} />
        <span>{value}</span>
        <ChevronDown
          aria-hidden
          className={cn("size-4 text-white/70 transition-transform", open && "rotate-180")}
        />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          collisionPadding={16}
          // Keep focus in the phone input that the library focuses after a pick
          onCloseAutoFocus={(event) => event.preventDefault()}
          className="z-50 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-card bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-navy/10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <div className="flex items-center gap-2 border-b border-border px-3">
            <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
            <input
              autoFocus
              type="text"
              role="combobox"
              aria-expanded
              aria-controls={listId}
              aria-activedescendant={activeOption ? `${listId}-${activeOption.value}` : undefined}
              aria-label={searchPlaceholder}
              placeholder={searchPlaceholder}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
                listRef.current?.scrollTo({ top: 0 });
              }}
              onKeyDown={handleKeyDown}
              className="h-11 w-full bg-transparent text-sm text-navy outline-none placeholder:text-slate-400"
            />
          </div>

          {filtered.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
          ) : (
            <ul
              ref={listRef}
              id={listId}
              role="listbox"
              aria-label={ariaLabel}
              className="max-h-72 overflow-y-auto overscroll-contain p-1.5"
            >
              {filtered.map((option, index) => {
                const selected = option.value === value;
                return (
                  <li
                    key={option.value}
                    id={`${listId}-${option.value}`}
                    role="option"
                    aria-selected={selected}
                    onMouseEnter={() => setActiveIndex(index)}
                    // mousedown keeps focus in the search field until the pick is done
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => choose(option.value)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-[10px] px-2.5 py-2 text-sm text-navy",
                      index === activeIndex && "bg-surface",
                      selected && "font-semibold text-primary-dark",
                    )}
                  >
                    <CountryFlag country={option.value} />
                    <span className="min-w-0 flex-1 truncate">{option.label}</span>
                    <span className="shrink-0 text-muted-foreground tabular-nums">
                      {callingCode(option.value)}
                    </span>
                    <Check
                      aria-hidden
                      className={cn("size-4 shrink-0 text-primary-dark", !selected && "invisible")}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
