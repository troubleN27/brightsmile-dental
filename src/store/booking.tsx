"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Selection = {
  serviceId?: string;
  doctorId?: string;
  /** Increments on every pick, so picking the same item again still applies */
  version: number;
};

type BookingContextValue = Selection & {
  selectService: (serviceId: string) => void;
  selectDoctor: (doctorId: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

/** Remembers the service or doctor chosen on a card so the booking form can prefill it. */
export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<Selection>({ version: 0 });

  const selectService = useCallback(
    (serviceId: string) => setSelection((s) => ({ ...s, serviceId, version: s.version + 1 })),
    [],
  );
  const selectDoctor = useCallback(
    (doctorId: string) => setSelection((s) => ({ ...s, doctorId, version: s.version + 1 })),
    [],
  );

  const value = useMemo(
    () => ({ ...selection, selectService, selectDoctor }),
    [selection, selectService, selectDoctor],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
