
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchTranslations } from "../services/translations";

interface LanguageContextType {
  currentLanguage: string;
  translate: (key: string, fallback: string) => string;
  translations: Record<string, string>;
  isLoading: boolean;
  changeLanguage?: (lang: string) => void; // For future use
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: "en",
  translate: (_, fallback) => fallback,
  translations: {},
  isLoading: false,
});

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLanguage = () => {
      const hostname = window.location.hostname;
      const subdomainParts = hostname.split(".");
      
      // Check if subdomain is a 2-letter language code
      if (subdomainParts.length > 1 && subdomainParts[0].length === 2) {
        const lang = subdomainParts[0].toLowerCase();
        // Only set if it's a supported language
        if (["en", "es"].includes(lang)) {
          setCurrentLanguage(lang);
          return;
        }
      }
      
      // Default to English if no valid lang subdomain found
      setCurrentLanguage("en");
    };
    
    detectLanguage();
  }, []);
  
  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const translationData = await fetchTranslations(currentLanguage);
        setTranslations(translationData);
      } catch (error) {
        console.error("Failed to load translations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTranslations();
  }, [currentLanguage]);

  const translate = (key: string, fallback: string): string => {
    return translations[key] || fallback;
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
