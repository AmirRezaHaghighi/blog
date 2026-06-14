import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-6xl font-bold text-teal-primary">۴۰۴</h1>
      <h2 className="text-xl font-semibold text-gray-800">صفحه یافت نشد</h2>
      <p className="max-w-md text-sm text-gray-600">
        صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-secondary px-6 py-2.5 text-sm text-white transition-colors hover:bg-secondary-dark"
      >
        بازگشت به مجله
      </Link>
    </div>
  );
}
