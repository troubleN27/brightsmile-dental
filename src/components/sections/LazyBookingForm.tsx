"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// The form pulls in react-hook-form, zod and phone-number metadata. Loading it
// only when the booking section gets close keeps the first screen fast.
const BookingForm = dynamic(() => import("./BookingForm").then((m) => m.BookingForm), {
  ssr: false,
  loading: () => <FormPlaceholder />,
});

function FormPlaceholder() {
  return (
    <div aria-hidden className="flex min-h-[560px] items-center justify-center sm:min-h-[460px]">
      <Loader2 className="size-6 animate-spin text-primary/60" />
    </div>
  );
}

export function LazyBookingForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref}>{visible ? <BookingForm /> : <FormPlaceholder />}</div>;
}
