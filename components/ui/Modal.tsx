"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = "hidden";
    } else if (dialog.open) {
      dialog.close();
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "fixed inset-0 z-50 m-auto w-[calc(100%-2rem)] min-w-[328px] max-w-[720px] rounded-2xl border-0 bg-bg p-0 backdrop:bg-black/50 backdrop:backdrop-blur-sm",
        className,
      )}
      onClose={onClose}
      aria-labelledby="modal-title"
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute left-4 top-4 rounded-2xl p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          aria-label="بستن"
        >
          <X className="size-5" />
        </button>

        <h2
          id="modal-title"
          className="mb-4 text-center text-lg text-primary-dark"
        >
          {title}
        </h2>

        {children}
      </div>
    </dialog>
  );
}
