"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2, Loader2, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Controller, useForm, useWatch, type FieldError } from "react-hook-form";
import PhoneInput, { type Props as PhoneInputBaseProps } from "react-phone-number-input";
import enLabels from "react-phone-number-input/locale/en";
import ruLabels from "react-phone-number-input/locale/ru";
import { Button } from "@/components/ui/button";
import { CountrySelect } from "@/components/ui/CountrySelect";
import { phoneHref, site } from "@/config/site";
import { doctors } from "@/data/doctors";
import { serviceCategories, services } from "@/data/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { bookingSchema, timesOfDay, toIsoDate, type BookingInput } from "@/lib/booking-schema";
import { cn } from "@/lib/utils";
import { useBooking } from "@/store/booking";

type Status = "idle" | "success" | "error" | "rateLimited";

const fieldClass =
  "h-12 w-full rounded-button border border-input bg-white px-4 text-base text-navy transition-colors placeholder:text-slate-400 hover:border-slate-400 focus:border-primary-dark focus:ring-3 focus:ring-primary/25 focus:outline-none aria-invalid:border-destructive aria-invalid:focus:ring-destructive/20";

const noopSubscribe = () => () => {};

/** Today's date in the visitor's time zone; empty during server rendering. */
function useToday() {
  return useSyncExternalStore(noopSubscribe, () => toIsoDate(new Date()), () => "");
}

function ErrorMessage({ id, text }: { id: string; text: string | null }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-sm text-destructive">
      <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
      {text}
    </p>
  );
}

type PhoneInputProps = PhoneInputBaseProps<React.InputHTMLAttributes<HTMLInputElement>>;

/** Countries listed first in the phone country picker, the rest follow alphabetically. */
const PRIORITY_COUNTRIES: NonNullable<PhoneInputProps["countryOptionsOrder"]> = [
  "RU", "BY", "KZ", "UZ", "AM", "GE", "US", "GB", "DE", "|", "...",
];

export function BookingForm() {
  const t = useTranslations("Booking");
  const tServices = useTranslations("Services");
  const locale = useLocale() as Locale;
  const today = useToday();
  const ids = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const booking = useBooking();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      phone: "",
      serviceId: "",
      doctorId: "",
      date: "",
      timeOfDay: "",
      comment: "",
      website: "",
      locale,
    } satisfies Partial<BookingInput>,
  });

  // Prefill from the "Book" buttons on service and doctor cards
  useEffect(() => {
    if (booking.version === 0) return;
    if (booking.serviceId) setValue("serviceId", booking.serviceId, { shouldDirty: true });
    if (booking.doctorId) setValue("doctorId", booking.doctorId, { shouldDirty: true });
  }, [booking.version, booking.serviceId, booking.doctorId, setValue]);

  // Move focus to the result message so screen readers announce it
  useEffect(() => {
    if (status !== "idle") statusRef.current?.focus();
  }, [status]);

  const commentLength = useWatch({ control, name: "comment" })?.length ?? 0;

  async function onSubmit(data: BookingInput) {
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (response.ok) setStatus("success");
      else setStatus(response.status === 429 ? "rateLimited" : "error");
    } catch {
      setStatus("error");
    }
  }

  function startOver() {
    reset();
    setStatus("idle");
  }

  const fieldId = (name: string) => `${ids}-${name}`;
  const errorProps = (name: string, error?: FieldError) => ({
    id: `${fieldId(name)}-error`,
    text: error?.message ? t(`errors.${error.message}` as Parameters<typeof t>[0]) : null,
  });

  const describedBy = (name: string, error?: FieldError) =>
    error ? `${fieldId(name)}-error` : undefined;

  if (status === "success") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-center py-10 text-center outline-none"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-primary/15 text-primary-dark">
          <CheckCircle2 aria-hidden className="size-8" />
        </span>
        <h3 className="mt-5 text-xl font-bold text-navy md:text-2xl">{t("successTitle")}</h3>
        <p className="mt-3 max-w-md text-muted-foreground">{t("successText")}</p>
        <Button onClick={startOver} variant="outline" className="mt-8">
          {t("again")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {(status === "error" || status === "rateLimited") && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="rounded-card border border-destructive/30 bg-red-50 p-4 outline-none"
        >
          <p className="flex items-center gap-2 font-bold text-destructive">
            <AlertCircle aria-hidden className="size-5" />
            {t("errorTitle")}
          </p>
          <p className="mt-1 text-sm text-navy/80">
            {status === "rateLimited" ? t("tooManyText") : t("errorText")}
          </p>
          <a href={phoneHref} className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary-dark hover:underline">
            <Phone aria-hidden className="size-4" />
            {t("callUs", { phone: site.phone })}
          </a>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="mb-1.5 block font-semibold text-navy">
            {t("fields.name")} <span aria-hidden className="text-destructive">*</span>
          </label>
          <input
            id={fieldId("name")}
            type="text"
            autoComplete="name"
            placeholder={t("fields.namePlaceholder")}
            aria-required
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name", errors.name)}
            className={fieldClass}
            {...register("name")}
          />
          <ErrorMessage {...errorProps("name", errors.name)} />
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className="mb-1.5 block font-semibold text-navy">
            {t("fields.phone")} <span aria-hidden className="text-destructive">*</span>
          </label>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                // The ref goes to the component itself: it forwards it to the number input.
                // Passing it through numberInputProps would override the library's own ref
                // and break country switching.
                ref={field.ref}
                id={fieldId("phone")}
                international
                defaultCountry="RU"
                countryCallingCodeEditable={false}
                addInternationalOption={false}
                countryOptionsOrder={PRIORITY_COUNTRIES}
                labels={locale === "ru" ? ruLabels : enLabels}
                countrySelectComponent={CountrySelect}
                countrySelectProps={{
                  searchPlaceholder: t("fields.countrySearch"),
                  emptyText: t("fields.countryEmpty"),
                }}
                autoComplete="tel"
                value={field.value || undefined}
                onChange={(value) => field.onChange(value ?? "")}
                onBlur={field.onBlur}
                aria-required
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone", errors.phone)}
                className={cn(
                  "flex h-12 items-stretch rounded-button border bg-white pl-1 transition-colors focus-within:border-primary-dark focus-within:ring-3 focus-within:ring-primary/25",
                  errors.phone ? "border-destructive" : "border-input hover:border-slate-400",
                )}
                numberInputProps={{
                  className: "h-full min-w-0 flex-1 rounded-r-button bg-transparent px-3 text-base text-navy outline-none",
                }}
              />
            )}
          />
          <ErrorMessage {...errorProps("phone", errors.phone)} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("service")} className="mb-1.5 block font-semibold text-navy">
            {t("fields.service")}
          </label>
          <select
            id={fieldId("service")}
            aria-invalid={!!errors.serviceId}
            aria-describedby={describedBy("service", errors.serviceId)}
            className={cn(fieldClass, "cursor-pointer")}
            {...register("serviceId")}
          >
            <option value="">{t("fields.servicePlaceholder")}</option>
            {serviceCategories.map((category) => (
              <optgroup key={category} label={tServices(`categories.${category}`)}>
                {services
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title[locale]}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>
          <ErrorMessage {...errorProps("service", errors.serviceId)} />
        </div>

        <div>
          <label htmlFor={fieldId("doctor")} className="mb-1.5 block font-semibold text-navy">
            {t("fields.doctor")}
          </label>
          <select
            id={fieldId("doctor")}
            aria-invalid={!!errors.doctorId}
            aria-describedby={describedBy("doctor", errors.doctorId)}
            className={cn(fieldClass, "cursor-pointer")}
            {...register("doctorId")}
          >
            <option value="">{t("fields.doctorPlaceholder")}</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name[locale]} — {doctor.specialty[locale]}
              </option>
            ))}
          </select>
          <ErrorMessage {...errorProps("doctor", errors.doctorId)} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("date")} className="mb-1.5 block font-semibold text-navy">
            {t("fields.date")}
          </label>
          <input
            id={fieldId("date")}
            type="date"
            min={today || undefined}
            aria-invalid={!!errors.date}
            aria-describedby={describedBy("date", errors.date)}
            className={cn(fieldClass, "cursor-pointer")}
            {...register("date")}
          />
          <ErrorMessage {...errorProps("date", errors.date)} />
        </div>

        <fieldset>
          <legend className="mb-1.5 font-semibold text-navy">{t("fields.time")}</legend>
          <div className="grid h-12 grid-cols-3 gap-1 rounded-button bg-surface p-1 ring-1 ring-primary/10">
            {timesOfDay.map((time) => (
              <label key={time} className="relative">
                <input type="radio" value={time} className="peer sr-only" {...register("timeOfDay")} />
                <span
                  title={t(`timeHint.${time}`)}
                  className="flex h-full cursor-pointer items-center justify-center rounded-[10px] text-sm font-semibold text-navy/70 transition-colors peer-checked:bg-white peer-checked:text-primary-dark peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-primary hover:text-navy"
                >
                  {t(`time.${time}`)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div>
        <div className="mb-1.5 flex items-baseline justify-between gap-4">
          <label htmlFor={fieldId("comment")} className="font-semibold text-navy">
            {t("fields.comment")}
          </label>
          <span
            className={cn("text-sm", commentLength > 500 ? "text-destructive" : "text-muted-foreground")}
            aria-hidden
          >
            {commentLength}/500
          </span>
        </div>
        <textarea
          id={fieldId("comment")}
          rows={3}
          placeholder={t("fields.commentPlaceholder")}
          aria-invalid={!!errors.comment}
          aria-describedby={describedBy("comment", errors.comment)}
          className={cn(fieldClass, "h-auto min-h-24 resize-y py-3")}
          {...register("comment")}
        />
        <ErrorMessage {...errorProps("comment", errors.comment)} />
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fieldId("website")}>{t("fields.honeypot")}</label>
        <input id={fieldId("website")} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-navy/80">
          <input
            type="checkbox"
            aria-required
            aria-invalid={!!errors.consent}
            aria-describedby={describedBy("consent", errors.consent)}
            className="mt-1 size-5 shrink-0 cursor-pointer rounded accent-primary-dark"
            {...register("consent")}
          />
          <span>
            {t("fields.consentBefore")}
            <Link href="/privacy" target="_blank" className="font-semibold text-primary-dark underline underline-offset-2">
              {t("fields.consentLink")}
            </Link>
            <span aria-hidden className="text-destructive"> *</span>
          </span>
        </label>
        <ErrorMessage {...errorProps("consent", errors.consent)} />
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting && <Loader2 aria-hidden className="size-5 animate-spin" />}
        {isSubmitting ? t("submitting") : t("submit")}
      </Button>
      <p aria-live="polite" className="sr-only">
        {isSubmitting ? t("submitting") : ""}
      </p>
    </form>
  );
}
