import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Visible on dark bg; matches brand strip (pink → purple → teal). Overrides default `bg-muted`. */
const routeFallbackSkeleton =
  "bg-transparent bg-gradient-to-r from-pulse-pink/50 via-accent/55 to-pulse-blue/50";

/** Frosted liquid-glass stack: blur + tint + specular + slow drifting color (no hard borders). */
function RouteFallbackGlass() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[100] overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] via-white/[0.02] to-pulse-blue/[0.08] backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_65%_at_50%_0%,rgba(255,255,255,0.14),transparent_52%)]" />
      <div className="absolute -left-[25%] -top-[20%] h-[min(85vw,520px)] w-[min(85vw,520px)] rounded-full bg-gradient-to-br from-pulse-pink/28 via-accent/16 to-transparent opacity-80 blur-3xl animate-spin-slow" />
      <div className="absolute -bottom-[25%] -right-[20%] h-[min(75vw,480px)] w-[min(75vw,480px)] rounded-full bg-gradient-to-tl from-pulse-blue/32 via-accent/12 to-transparent opacity-70 blur-3xl animate-[spin-slow_22s_linear_infinite_reverse]" />
    </div>
  );
}

/**
 * Shown while a lazy route chunk loads. Mirrors a typical page (nav + main) so cold navigations
 * never flash a blank screen behind the root Suspense boundary.
 */
export function AppShellRouteFallback() {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background"
      aria-busy="true"
      aria-label="Loading page"
    >
      <RouteFallbackGlass />
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container flex h-14 items-center justify-between gap-4 px-4 md:h-16">
          <Skeleton className={cn("h-8 w-28 shrink-0 md:w-32", routeFallbackSkeleton)} />
          <div className="hidden items-center gap-6 md:flex">
            <Skeleton className={cn("h-4 w-20", routeFallbackSkeleton)} />
            <Skeleton className={cn("h-4 w-24", routeFallbackSkeleton)} />
            <Skeleton className={cn("h-4 w-16", routeFallbackSkeleton)} />
            <Skeleton className={cn("h-4 w-20", routeFallbackSkeleton)} />
          </div>
          <Skeleton className={cn("h-9 w-9 shrink-0 rounded-md md:hidden", routeFallbackSkeleton)} />
        </div>
      </header>
      <main className="flex flex-1 flex-col px-4 py-8 md:px-6 md:py-10">
        <Skeleton className={cn("mx-auto mb-6 h-9 w-full max-w-lg rounded-lg", routeFallbackSkeleton)} />
        <Skeleton className={cn("mx-auto mb-8 h-40 w-full max-w-4xl rounded-xl md:h-52", routeFallbackSkeleton)} />
        <div className="mx-auto w-full max-w-4xl space-y-3">
          <Skeleton className={cn("h-4 w-full", routeFallbackSkeleton)} />
          <Skeleton className={cn("h-4 w-[92%]", routeFallbackSkeleton)} />
          <Skeleton className={cn("h-4 w-[78%]", routeFallbackSkeleton)} />
          <Skeleton className={cn("mt-6 h-4 w-full", routeFallbackSkeleton)} />
          <Skeleton className={cn("h-4 w-[88%]", routeFallbackSkeleton)} />
        </div>
      </main>
    </div>
  );
}
