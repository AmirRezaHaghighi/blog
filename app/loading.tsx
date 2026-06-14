export function MagazineLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col-reverse gap-8 lg:flex-row">
        <main className="flex-1 space-y-8 lg:w-3/4">
          <div className="h-72 animate-pulse rounded-xl bg-gray-200" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[4/3] animate-pulse rounded-xl bg-gray-200" />
                <div className="h-4 animate-pulse rounded bg-gray-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </main>
        <aside className="space-y-6 lg:w-1/4">
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
          <div className="h-10 animate-pulse rounded-lg bg-gray-200" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 animate-pulse rounded bg-gray-200" />
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Loading() {
  return <MagazineLoading />;
}
