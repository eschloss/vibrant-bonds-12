import { Skeleton } from "@/components/ui/skeleton";

/**
 * Shown while a lazy route chunk loads. Mirrors a typical page (nav + main) so cold navigations
 * never flash a blank screen behind the root Suspense boundary.
 */
export function AppShellRouteFallback() {
  return (
    <div
      className="flex min-h-screen w-full flex-col bg-background"
      aria-busy="true"
      aria-label="Loading page"
    >
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-14 items-center justify-between gap-4 px-4 md:h-16">
          <Skeleton className="h-8 w-28 shrink-0 md:w-32" />
          <div className="hidden items-center gap-6 md:flex">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-9 w-9 shrink-0 rounded-md md:hidden" />
        </div>
      </header>
      <main className="flex flex-1 flex-col px-4 py-8 md:px-6 md:py-10">
        <Skeleton className="mx-auto mb-6 h-9 w-full max-w-lg rounded-lg" />
        <Skeleton className="mx-auto mb-8 h-40 w-full max-w-4xl rounded-xl md:h-52" />
        <div className="mx-auto w-full max-w-4xl space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[92%]" />
          <Skeleton className="h-4 w-[78%]" />
          <Skeleton className="mt-6 h-4 w-full" />
          <Skeleton className="h-4 w-[88%]" />
        </div>
      </main>
    </div>
  );
}
