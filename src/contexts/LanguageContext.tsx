
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { translations } from "../services/languageService";

interface LanguageContextType {
  currentLanguage: string;
  translate: (key: string, fallback: string) => string;
  translations: Record<string, Record<string, string>>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  translate: (_, fallback) => fallback,
  translations,
  isLoading: false,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const detectLanguage = () => {
      const hostname = window.location.hostname;
      const subdomainParts = hostname.split(".");
      
      // Check if subdomain is a 2-letter language code
      if (subdomainParts.length > 1 && subdomainParts[0].length === 2) {
        const lang = subdomainParts[0].toLowerCase();
        // Only set if it's a supported language
        if (translations[lang as keyof typeof translations]) {
          setCurrentLanguage(lang);
          return;
        }
      }
      
      // Default to English if no valid lang subdomain found
      setCurrentLanguage("en");
    };
    
    detectLanguage();
  }, []);

  const translate = (key: string, fallback: string): string => {
    const langTranslations = translations[currentLanguage as keyof typeof translations] || translations.en;
    
    return langTranslations[key] || fallback;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        translate,
        translations,
        isLoading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
