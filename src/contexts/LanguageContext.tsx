
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchTranslations } from "../services/translations";
import { Helmet } from "react-helmet";

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
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const translate = (key: string, fallback: string): string => {
    return translations[key] || fallback;
  };

  // Get SEO metadata for the current language
  const metadata = seoMetadata[currentLanguage as keyof typeof seoMetadata] || seoMetadata.en;
  
  // Get base URL without language subdomain
  const getBaseUrl = () => {
    const url = new URL(window.location.href);
    const hostParts = url.hostname.split('.');
    
    // Remove language subdomain if it exists
    if (hostParts.length > 2 && hostParts[0].length === 2) {
      url.hostname = hostParts.slice(1).join('.');
    }
    
    return url.origin;
  };
  
  // Construct URLs for different languages
  const baseUrl = getBaseUrl();
  const currentPath = window.location.pathname;
  const alternateUrls = {
    en: `${baseUrl}${currentPath}`,
    es: `${baseUrl.replace('://', '://es.')}${currentPath}`
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
