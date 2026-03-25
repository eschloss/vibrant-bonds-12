import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  ALL_NAMESPACE_KEYS,
  IDLE_PREFETCH_BATCH_SIZE,
  getNamespacesForPath,
  loadTranslationNamespaces,
} from "../services/translations";
import { waitForInitialPrefetchWork } from "../lib/apiPrefetchBridge";

function idleYield(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      window.requestIdleCallback(() => resolve(), { timeout: 4000 });
    } else {
      setTimeout(resolve, 1);
    }
  });
}

interface LanguageContextType {
  currentLanguage: string;
  translate: (key: string, fallback: string) => string;
  translations: Record<string, any>;
  /** Kept for API compatibility; translations are non-blocking — always false. */
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

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const location = useLocation();
  const loadedNamespacesRef = useRef(new Set<string>());
  const languageLoadGenerationRef = useRef(0);
  const prevLanguageRef = useRef<string | null>(null);

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

  const changeLanguage = useCallback((lang: string) => {
    const normalized = lang?.toLowerCase().slice(0, 2) || "en";
    if (["en", "es"].includes(normalized) && normalized !== currentLanguage) {
      setCurrentLanguage(normalized);
    }
  }, [currentLanguage]);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  useEffect(() => {
    const waveId = ++languageLoadGenerationRef.current;
    let cancelled = false;

    const langChanged = prevLanguageRef.current !== null && prevLanguageRef.current !== currentLanguage;
    prevLanguageRef.current = currentLanguage;

    if (langChanged) {
      loadedNamespacesRef.current.clear();
      setTranslations({});
    }

    const routeNamespaces = getNamespacesForPath(location.pathname).filter(
      (n) => !loadedNamespacesRef.current.has(n)
    );

    if (routeNamespaces.length > 0) {
      void (async () => {
        try {
          const extra = await loadTranslationNamespaces(currentLanguage, routeNamespaces);
          if (cancelled || languageLoadGenerationRef.current !== waveId) return;
          routeNamespaces.forEach((n) => loadedNamespacesRef.current.add(n));
          setTranslations((prev) => ({ ...prev, ...extra }));
        } catch (error) {
          console.error("Failed to load route translations:", error);
        }
      })();
    }

    void (async () => {
      await waitForInitialPrefetchWork();
      if (cancelled || languageLoadGenerationRef.current !== waveId) return;

      while (true) {
        if (cancelled || languageLoadGenerationRef.current !== waveId) return;
        await idleYield();
        if (cancelled || languageLoadGenerationRef.current !== waveId) return;

        const nextBatch = ALL_NAMESPACE_KEYS.filter((n) => !loadedNamespacesRef.current.has(n)).slice(
          0,
          IDLE_PREFETCH_BATCH_SIZE
        );
        if (nextBatch.length === 0) break;

        try {
          const extra = await loadTranslationNamespaces(currentLanguage, nextBatch);
          if (cancelled || languageLoadGenerationRef.current !== waveId) return;
          nextBatch.forEach((n) => loadedNamespacesRef.current.add(n));
          setTranslations((prev) => ({ ...prev, ...extra }));
        } catch (error) {
          console.error("Failed to load translation prefetch batch:", error);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, currentLanguage]);

  const translate = (key: string, fallback: string): string => {
    return translations[key] || fallback;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        translate,
        translations,
        isLoading: false,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
