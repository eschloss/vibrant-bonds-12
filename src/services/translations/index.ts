type Locale = "en" | "es";

const ALL_NAMESPACE_KEYS = [
  "shared",
  "about",
  "mission",
  "activities",
  "realLifeMagic",
  "city",
  "citylist",
  "eventsCities",
  "communities",
  "contact",
  "forms",
  "hero",
  "howItWorks",
  "icebreakers",
  "team",
  "lonelinessEpidemic",
  "legal",
  "faq",
  "download",
  "almostThere",
  "eventConfirmation",
  "eventDetail",
  "eventCheckout",
] as const;

export type TranslationNamespace = (typeof ALL_NAMESPACE_KEYS)[number];

/** First paint: shell + home sections that hydrate immediately */
export const CRITICAL_NAMESPACES = [
  "shared",
  "hero",
  "forms",
  "mission",
  "activities",
  "howItWorks",
] as const;

const CRITICAL_SET = new Set<string>(CRITICAL_NAMESPACES);

export const DEFERRED_NAMESPACES = ALL_NAMESPACE_KEYS.filter((n) => !CRITICAL_SET.has(n));

type NamespaceLoader = (locale: Locale) => Promise<Record<string, unknown>>;

/** Coalesces concurrent loads of the same namespace (e.g. idle + route prefetch). */
const namespaceInflight = new Map<string, Promise<Record<string, unknown>>>();

const namespaceLoaders: Record<TranslationNamespace, NamespaceLoader> = {
  shared: async (locale) => (await import("./shared")).shared[locale],
  about: async (locale) => (await import("./about")).about[locale],
  mission: async (locale) => (await import("./mission")).mission[locale],
  activities: async (locale) => (await import("./activities")).activities[locale],
  realLifeMagic: async (locale) => (await import("./realLifeMagic")).realLifeMagic[locale],
  city: async (locale) => (await import("./city")).city[locale],
  citylist: async (locale) => (await import("./citylist")).citylist[locale],
  eventsCities: async (locale) => (await import("./eventsCities")).eventsCities[locale],
  communities: async (locale) => (await import("./communities")).communities[locale],
  contact: async (locale) => (await import("./contact")).contact[locale],
  forms: async (locale) => (await import("./forms")).forms[locale],
  hero: async (locale) => (await import("./hero")).hero[locale],
  howItWorks: async (locale) => (await import("./howItWorks")).howItWorks[locale],
  icebreakers: async (locale) => (await import("./icebreakers")).icebreakers[locale],
  team: async (locale) => (await import("./team")).team[locale],
  lonelinessEpidemic: async (locale) => (await import("./lonelinessEpidemic")).lonelinessEpidemic[locale],
  legal: async (locale) => (await import("./legal")).legal[locale],
  faq: async (locale) => (await import("./faq")).faq[locale],
  download: async (locale) => (await import("./download")).download[locale],
  almostThere: async (locale) => (await import("./almostThere")).almostThere[locale],
  eventConfirmation: async (locale) => (await import("./eventConfirmation")).eventConfirmation[locale],
  eventDetail: async (locale) => (await import("./eventDetail")).eventDetail[locale],
  eventCheckout: async (locale) => (await import("./eventCheckout")).eventCheckout[locale],
};

function normalizeLocale(lang: string): Locale {
  return ["en", "es"].includes(lang) ? (lang as Locale) : "en";
}

/**
 * Load a subset of namespaces in parallel and merge into one flat map.
 */
async function loadOneNamespace(locale: Locale, n: TranslationNamespace): Promise<Record<string, unknown>> {
  const key = `${locale}:${n}`;
  const existing = namespaceInflight.get(key);
  if (existing) return existing;
  const p = namespaceLoaders[n](locale).finally(() => {
    namespaceInflight.delete(key);
  });
  namespaceInflight.set(key, p);
  return p;
}

export async function loadTranslationNamespaces(
  lang: string,
  namespaces: readonly string[]
): Promise<Record<string, unknown>> {
  const locale = normalizeLocale(lang);
  const unique = [...new Set(namespaces)] as TranslationNamespace[];
  const parts = await Promise.all(unique.map((n) => loadOneNamespace(locale, n)));
  return Object.assign({}, ...parts);
}

/** Blocking first paint — keep this list small (see CRITICAL_NAMESPACES). */
export async function fetchCriticalTranslations(lang: string): Promise<Record<string, unknown>> {
  return loadTranslationNamespaces(lang, CRITICAL_NAMESPACES);
}

/** Everything except critical; intended for idle scheduling. */
export async function fetchDeferredTranslations(lang: string): Promise<Record<string, unknown>> {
  return loadTranslationNamespaces(lang, DEFERRED_NAMESPACES);
}

/**
 * Full catalog (e.g. tests or callers that need everything at once).
 * Loads critical and deferred in parallel (same total work as a single Promise.all over all namespaces).
 */
export async function fetchTranslations(lang: string): Promise<Record<string, unknown>> {
  const [critical, deferred] = await Promise.all([
    fetchCriticalTranslations(lang),
    fetchDeferredTranslations(lang),
  ]);
  return { ...critical, ...deferred };
}

/**
 * Namespaces worth loading promptly on this path (subset of deferred or any).
 * Merges with idle loading; duplicate imports are avoided by the caller via a loaded set.
 */
export function getNamespacesForPath(pathname: string): TranslationNamespace[] {
  const p = pathname.replace(/\/$/, "") || "/";
  const out = new Set<TranslationNamespace>();

  if (
    p.startsWith("/terms") ||
    p.startsWith("/privacy") ||
    p.startsWith("/event-booking-terms") ||
    p.startsWith("/cookie-policy") ||
    p.startsWith("/community-guidelines")
  ) {
    out.add("legal");
  }
  if (p.startsWith("/contact")) {
    out.add("contact");
    out.add("legal");
  }
  if (p.startsWith("/signup") || p.startsWith("/communities")) {
    out.add("legal");
    out.add("communities");
  }
  if (p.startsWith("/about") || p.startsWith("/careers")) {
    out.add("about");
    out.add("team");
  }
  if (p.startsWith("/faq")) out.add("faq");
  if (p.startsWith("/download")) out.add("download");
  if (p.startsWith("/almost-there")) out.add("almostThere");
  if (p.startsWith("/loneliness-epidemic")) out.add("lonelinessEpidemic");
  if (p.startsWith("/real-life-magic")) out.add("realLifeMagic");
  if (p.startsWith("/meet-pip") || p.startsWith("/plan-ideas")) {
    out.add("realLifeMagic");
  }
  if (p.startsWith("/blog") || p.startsWith("/press")) {
    out.add("team");
  }

  if (p.startsWith("/events")) {
    if (p === "/events") {
      out.add("eventsCities");
      out.add("citylist");
    }
    if (p.startsWith("/events/cities")) {
      out.add("eventsCities");
      out.add("citylist");
      const after = p.replace(/^\/events\/cities\/?/, "");
      if (after.length > 0) {
        out.add("city");
      }
    }
    if (p.startsWith("/events/how-it-works")) {
      /* howItWorks is critical */
    }
    const slug = p.replace(/^\/events\//, "").split("/")[0];
    if (slug && slug !== "cities" && slug !== "how-it-works") {
      if (p.includes("/checkout")) {
        out.add("eventCheckout");
        out.add("eventDetail");
        out.add("legal");
      } else if (p.includes("/confirmation")) {
        out.add("eventConfirmation");
        out.add("eventDetail");
      } else if (p.includes("/booking")) {
        out.add("eventDetail");
      } else if (!p.includes("/cities/") && /^\/events\/[^/]+\/?$/.test(p)) {
        out.add("eventDetail");
      }
    }
  }

  if (p.startsWith("/cities")) {
    out.add("citylist");
    out.add("city");
  }
  if (p.startsWith("/neighborhoods")) {
    out.add("city");
  }
  if (p.startsWith("/communities/")) {
    out.add("communities");
  }
  if (p.startsWith("/do-not-share")) {
    out.add("legal");
  }

  return [...out];
}
