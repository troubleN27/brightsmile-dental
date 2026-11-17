"use client";

import { forwardRef, useId, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export type SelectMenuOption = {
  value: string;
  label: string;
  /** Second line under the label, e.g. a doctor's specialty */
  description?: string;
};

export type SelectMenuGroup = {
  /** Group heading; omit for a flat list */
  label?: string;
  options: SelectMenuOption[];
};

type SelectMenuProps = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  groups: SelectMenuGroup[];
  /** Shown on the trigger when nothing is chosen; also the first "no preference" option */
  placeholder: string;
  /** Adds a search field above the list */
  searchPlaceholder?: string;
  emptyText?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

/**
 * Dropdown in the site's style (used instead of native <select>): optional
 * search, grouped options with a second line, keyboard support
 * (arrows, Home/End, Enter, Esc) and listbox semantics.
 * The first option always clears the choice (value "").
 */
export const SelectMenu = forwardRef<HTMLButtonElement, SelectMenuProps>(function SelectMenu(
  {
    id,
    value,
    onChange,
    onBlur,
    groups,
    placeholder,
    searchPlaceholder,
    emptyText,
    "aria-invalid": ariaInvalid,
    "aria-describedby": ariaDescribedBy,
  },
  ref,
) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const searchable = Boolean(searchPlaceholder);

  const noneOption = useMemo<SelectMenuOption>(() => ({ value: "", label: placeholder }), [placeholder]);

  // Groups after search; the "no preference" option is only offered without a query
  const visibleGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matching = groups
      .map((group) => ({
        ...group,
        options: q
          ? group.options.filter(
              (o) => o.label.toLowerCase().includes(q) || o.description?.toLowerCase().includes(q),
            )
          : group.options,
      }))
      .filter((group) => group.options.length > 0);
    return q ? matching : [{ options: [noneOption] }, ...matching];
  }, [groups, query, noneOption]);

  const flat = useMemo(() => visibleGroups.flatMap((g) => g.options), [visibleGroups]);
  const selected = groups.flatMap((g) => g.options).find((o) => o.value === value);

  function optionId(option: SelectMenuOption) {
    return `${listId}-${option.value || "none"}`;
  }

  function openChange(next: boolean) {
    setOpen(next);
    if (next) {
      setQuery("");
      const all = [noneOption, ...groups.flatMap((g) => g.options)];
      setActiveIndex(Math.max(0, all.findIndex((o) => o.value === value)));
      requestAnimationFrame(() =>
        listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" }),
      );
    } else {
      onBlur?.();
    }
  }

  function choose(option: SelectMenuOption) {
    onChange(option.value);
    setOpen(false);
  }

  function moveActive(next: number) {
    if (flat.length === 0) return;
    const index = (next + flat.length) % flat.length;
    setActiveIndex(index);
    document.getElementById(optionId(flat[index]))?.scrollIntoView({ block: "nearest" });
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const keys: Record<string, () => void> = {
      ArrowDown: () => moveActive(activeIndex + 1),
      ArrowUp: () => moveActive(activeIndex - 1),
      Home: () => moveActive(0),
      End: () => moveActive(flat.length - 1),
      Enter: () => flat[activeIndex] && choose(flat[activeIndex]),
      // Space selects only when there is no search field to type into
      " ": () => !searchable && flat[activeIndex] && choose(flat[activeIndex]),
    };
    const action = keys[event.key];
    if (!action || (event.key === " " && searchable)) return;
    event.preventDefault();
    action();
  }

  const activeOption = flat[activeIndex];
  let runningIndex = -1;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={openChange}>
      <PopoverPrimitive.Trigger
        ref={ref}
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={cn(
          "flex h-12 w-full cursor-pointer items-center gap-2 rounded-button border bg-white pr-3 pl-4 text-left text-base transition-colors outline-none",
          "hover:border-slate-400 focus-visible:border-primary-dark focus-visible:ring-3 focus-visible:ring-primary/25",
          "data-[state=open]:border-primary-dark data-[state=open]:ring-3 data-[state=open]:ring-primary/25",
          ariaInvalid ? "border-destructive" : "border-input",
        )}
      >
        <span className={cn("min-w-0 flex-1 truncate", selected ? "text-navy" : "text-slate-400")}>
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          aria-hidden
          className={cn("size-5 shrink-0 text-navy/50 transition-transform", open && "rotate-180")}
        />
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={8}
          collisionPadding={16}
          onOpenAutoFocus={(event) => {
            // Focus the search field, or the list itself when there is no search
            event.preventDefault();
            (searchable
              ? (event.currentTarget as HTMLElement).querySelector("input")
              : listRef.current
            )?.focus();
          }}
          className="z-50 w-(--radix-popover-trigger-width) min-w-[min(280px,calc(100vw-32px))] overflow-hidden rounded-card bg-white shadow-[0_24px_60px_-20px_rgba(15,23,42,0.35)] ring-1 ring-navy/10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          {searchable && (
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search aria-hidden className="size-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                role="combobox"
                aria-expanded
                aria-controls={listId}
                aria-activedescendant={activeOption ? optionId(activeOption) : undefined}
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
          )}

          {flat.length === 0 ? (
            <p className="px-4 py-6 text-center text-sm text-muted-foreground">{emptyText}</p>
          ) : (
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              tabIndex={searchable ? -1 : 0}
              aria-activedescendant={!searchable && activeOption ? optionId(activeOption) : undefined}
              onKeyDown={searchable ? undefined : handleKeyDown}
              className="max-h-80 overflow-y-auto overscroll-contain p-1.5 outline-none"
            >
              {visibleGroups.map((group, groupIndex) => (
                <div
                  key={group.label ?? `group-${groupIndex}`}
                  role="group"
                  aria-labelledby={group.label ? `${listId}-g${groupIndex}` : undefined}
                  className={cn(groupIndex > 0 && group.label && "mt-1 border-t border-border pt-1")}
                >
                  {group.label && (
                    <div
                      id={`${listId}-g${groupIndex}`}
                      className="px-2.5 pt-2 pb-1 text-xs font-bold tracking-wider text-primary-dark uppercase"
                    >
                      {group.label}
                    </div>
                  )}
                  {group.options.map((option) => {
                    runningIndex += 1;
                    const index = runningIndex;
                    const isSelected = option.value === value;
                    return (
                      <div
                        key={option.value || "none"}
                        id={optionId(option)}
                        role="option"
                        aria-selected={isSelected}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(option)}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-[10px] px-2.5 py-2 text-sm text-navy",
                          index === activeIndex && "bg-surface",
                          isSelected && "font-semibold text-primary-dark",
                          !option.value && "text-muted-foreground",
                        )}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block">{option.label}</span>
                          {option.description && (
                            <span className="block text-xs font-normal text-muted-foreground">
                              {option.description}
                            </span>
                          )}
                        </span>
                        <Check
                          aria-hidden
                          className={cn("size-4 shrink-0 text-primary-dark", !isSelected && "invisible")}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
});
