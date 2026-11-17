"use client";

import { sectionHref } from "@/components/layout/nav-items";
import { Link } from "@/i18n/navigation";
import { useBooking } from "@/store/booking";

const BOOKING_ID = "booking";

type BookingLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  serviceId?: string;
  doctorId?: string;
};

/** Link to the booking form that also preselects a service or a doctor. */
export function BookingLink({ serviceId, doctorId, onClick, ...props }: BookingLinkProps) {
  const { selectService, selectDoctor } = useBooking();

  return (
    <Link
      href={sectionHref(BOOKING_ID)}
      onClick={(event) => {
        if (serviceId) selectService(serviceId);
        if (doctorId) selectDoctor(doctorId);
        onClick?.(event);

        // Scroll ourselves: when the URL already ends with #booking the router
        // would not scroll again. CSS scroll-behavior keeps it smooth (or instant
        // for reduced motion).
        const form = document.getElementById(BOOKING_ID);
        if (form && !event.defaultPrevented) {
          event.preventDefault();
          form.scrollIntoView();
          history.replaceState(null, "", `#${BOOKING_ID}`);
        }
      }}
      {...props}
    />
  );
}
