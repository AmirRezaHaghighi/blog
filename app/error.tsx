"use client";

import { useEffect } from "react";

import { ErrorMessage } from "@/components/ui/ErrorMessage";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ErrorMessage
          title="خطای برنامه"
          message="متأسفانه مشکلی در بارگذاری صفحه پیش آمد."
          onRetry={reset}
        />
      </div>
    </div>
  );
}
