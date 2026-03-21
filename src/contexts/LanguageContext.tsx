import { createContext, useContext, useState, useEffect, useRef, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  CRITICAL_NAMESPACES,
  DEFERRED_NAMESPACES,
  fetchCriticalTranslations,
  fetchDeferredTranslations,
  getNamespacesForPath,
  loadTranslationNamespaces,
} from "../services/translations";
import { Helmet } from "react-helmet";

function scheduleIdleTask(fn: () => void) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    window.requestIdleCallback(() => fn(), { timeout: 4000 });
  } else {
    setTimeout(fn, 1);
  }
}

interface LanguageContextType {
  currentLanguage: string;
  translate: (key: string, fallback: string) => string;
  translations: Record<string, any>;
  isLoading: boolean;
  changeLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  translate: (_, fallback) => fallback,
  translations: {},
  isLoading: false,
  changeLanguage: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

// SEO metadata translations
const seoMetadata = {
  en: {
    title: "Pulse: New Friends and IRL Plans",
    description: "Meet like-minded people and plan real-life meetups with Pulse",
    ogTitle: "Pulse: New Friends and IRL Plans",
    ogDescription: "Connect with like-minded people and plan real-life meetups with Pulse"
  },
  es: {
    title: "Pulse: Nuevos Amigos y Planes en la Vida Real",
    description: "Conoce personas afines y planifica encuentros en la vida real con Pulse",
    ogTitle: "Pulse: Nuevos Amigos y Planes en la Vida Real",
    ogDescription: "Conecta con personas afines y planifica encuentros en la vida real con Pulse"
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const location = useLocation();
  const loadedNamespacesRef = useRef(new Set<string>());
  /** True from sync start of language effect until critical load finishes (success or failure). Avoids route prefetch in the same commit where `isLoading` is still stale. */
  const deferRoutePrefetchRef = useRef(false);
  /** Only the latest language-load wave may clear `deferRoutePrefetchRef` (older async finally blocks must not run after a newer wave started). */
  const languageLoadGenerationRef = useRef(0);

  const detectInitialLanguage = (): string => {
    const hostname = window.location.hostname;
    const subdomainParts = hostname.split(".");
    const firstLabel = (subdomainParts[0] || "").toLowerCase();

    if (subdomainParts.length > 1 && firstLabel.length === 2 && ["en", "es"].includes(firstLabel)) {
      return firstLabel;
    }

    if (firstLabel === "friends") {
      const rawLangs = (navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || ""]) as string[];
      const langs = rawLangs.map(l => l.toLowerCase());

      if (langs.some(l => l.startsWith("es"))) return "es";
      if (langs.some(l => l.startsWith("en"))) return "en";
    }

    return "en";
  };

  const [currentLanguage, setCurrentLanguage] = useState<string>(detectInitialLanguage());
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    const waveId = ++languageLoadGenerationRef.current;
    let cancelled = false;
    loadedNamespacesRef.current = new Set();
    deferRoutePrefetchRef.current = true;

    void (async () => {
      setIsLoading(true);
      try {
        const critical = await fetchCriticalTranslations(currentLanguage);
        if (cancelled || languageLoadGenerationRef.current !== waveId) return;
        CRITICAL_NAMESPACES.forEach((n) => loadedNamespacesRef.current.add(n));
        setTranslations(critical);
      } catch (error) {
        console.error("Failed to load critical translations:", error);
      } finally {
        if (languageLoadGenerationRef.current === waveId) {
          deferRoutePrefetchRef.current = false;
          if (!cancelled) setIsLoading(false);
        }
      }

      scheduleIdleTask(() => {
        if (cancelled || languageLoadGenerationRef.current !== waveId) return;
        void (async () => {
          try {
            const deferred = await fetchDeferredTranslations(currentLanguage);
            if (cancelled || languageLoadGenerationRef.current !== waveId) return;
            DEFERRED_NAMESPACES.forEach((n) => loadedNamespacesRef.current.add(n));
            setTranslations((prev) => ({ ...prev, ...deferred }));
          } catch (error) {
            console.error("Failed to load deferred translations:", error);
          }
        })();
      });
    })();

    document.documentElement.lang = currentLanguage;

    return () => {
      cancelled = true;
    };
  }, [currentLanguage]);

  // Wait until the critical wave finishes before merging route-specific namespaces.
  // Otherwise a prefetch can run against stale translations from the previous language,
  // or `setTranslations(critical)` can overwrite a merge that completed first.
  // `deferRoutePrefetchRef` is required because route effects can run in the same commit as the
  // language effect while `isLoading` from the previous render is still false.
  useEffect(() => {
    if (isLoading || deferRoutePrefetchRef.current) return;

    let cancelled = false;
    const routeNamespaces = getNamespacesForPath(location.pathname).filter(
      (n) => !loadedNamespacesRef.current.has(n)
    );
    if (routeNamespaces.length === 0) return;

    void (async () => {
      try {
        const extra = await loadTranslationNamespaces(currentLanguage, routeNamespaces);
        if (cancelled) return;
        routeNamespaces.forEach((n) => loadedNamespacesRef.current.add(n));
        setTranslations((prev) => ({ ...prev, ...extra }));
      } catch (error) {
        console.error("Failed to load route translations:", error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, currentLanguage, isLoading]);
  
  useEffect(() => {
    if (!hasLoadedOnce && !isLoading && Object.keys(translations).length > 0) {
      setHasLoadedOnce(true);
    }
  }, [hasLoadedOnce, isLoading, translations]);

  const translate = (key: string, fallback: string): string => {
    return translations[key] || fallback;
  };

  // Get SEO metadata for the current language
  const metadata = seoMetadata[currentLanguage as keyof typeof seoMetadata] || seoMetadata.en;
  
  // Get base URL without language subdomain
  const getBaseUrl = () => {
    const url = new URL(window.location.href);
    let hostParts = url.hostname.split('.');

    // Remove language subdomain (2-letter) and/or www if present at the start
    while (hostParts.length > 2 && (hostParts[0].length === 2 || hostParts[0].toLowerCase() === 'www')) {
      hostParts = hostParts.slice(1);
    }
    url.hostname = hostParts.join('.');

    return url.origin;
  };
  
  // Construct URLs for different languages
  const baseUrl = getBaseUrl();
  const currentPath = window.location.pathname;
  const alternateUrls = {
    en: `${baseUrl}${currentPath}`,
    es: `${baseUrl.replace('://', '://es.')}${currentPath}`
  };

  if (!hasLoadedOnce) {
    return null;
  }

  const changeLanguage = (lang: string) => {
    const normalized = lang?.toLowerCase().slice(0, 2) || "en";
    if (["en", "es"].includes(normalized) && normalized !== currentLanguage) {
      setCurrentLanguage(normalized);
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        translate,
        translations,
        isLoading,
        changeLanguage,
      }}
    >
      <Helmet>
        <html lang={currentLanguage} />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
        {/* Base SEO tags set at context level */}
        <meta property="og:title" content={metadata.ogTitle} />
        <meta property="og:description" content={metadata.ogDescription} />
        <meta property="og:type" content="website" />
        
        {/* Alternate language links */}
        <link rel="alternate" href={alternateUrls.en} hrefLang="en" />
        <link rel="alternate" href={alternateUrls.es} hrefLang="es" />
        <link rel="alternate" href={alternateUrls.en} hrefLang="x-default" />
      </Helmet>
      {children}
    </LanguageContext.Provider>
  );
};
