"use client";

import { Maximize2, XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

type CaseLightboxProps = {
  /** Accessible name of the dialog, e.g. the service */
  title: string;
  openLabel: string;
  closeLabel: string;
  /** Large before/after slider rendered on the server */
  children: React.ReactNode;
};

/** "View larger" link under a small before/after case that opens it in a dialog. */
export function CaseLightbox({ title, openLabel, closeLabel, children }: CaseLightboxProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger className="mt-2 inline-flex cursor-pointer items-center gap-1.5 rounded-button text-sm font-semibold text-primary-dark hover:underline focus-visible:ring-2 focus-visible:ring-sky focus-visible:outline-none">
        <Maximize2 aria-hidden className="size-3.5" />
        {openLabel}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ink/80 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-[min(960px,calc(100vw-32px),calc((90vh-110px)*4/3))] -translate-x-1/2 -translate-y-1/2 rounded-[28px] bg-white p-4 shadow-2xl outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:p-6">
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close
            aria-label={closeLabel}
            className="absolute -top-3 -right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white text-navy shadow-lg ring-1 ring-navy/10 hover:bg-surface focus-visible:ring-3 focus-visible:ring-sky/40 focus-visible:outline-none"
          >
            <XIcon className="size-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
