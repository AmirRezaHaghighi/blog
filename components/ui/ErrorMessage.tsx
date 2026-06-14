import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  title = "خطا",
  message,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      className="flex flex-col items-center gap-4 rounded-xl border border-red-200 bg-red-50 p-8 text-center"
      role="alert"
    >
      <AlertCircle className="size-10 text-red-500" aria-hidden="true" />
      <div>
        <h3 className="text-lg font-semibold text-red-800">{title}</h3>
        <p className="mt-1 text-sm text-red-600">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
        >
          تلاش مجدد
        </button>
      )}
    </div>
  );
}
