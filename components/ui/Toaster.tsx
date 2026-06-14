"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      dir="rtl"
      duration={4000}
      toastOptions={{
        classNames: {
          toast:
            "rounded-xl border border-gray bg-white text-txt shadow-lg",
          title: "text-sm",
          closeButton:
            "border-gray bg-white text-txt-secondary hover:bg-bg hover:text-txt",
        },
      }}
    />
  );
}
