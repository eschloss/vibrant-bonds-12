
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLanguage } from '@/contexts/LanguageContext';

interface SeoProps {
  title?: {
    en: string;
    es: string;
  };
  description?: {
    en: string;
    es: string;
  };
  image?: string;
  canonicalUrl?: string;
  pathname?: string; // Added to construct alternate URLs
}

export const useSeo = ({
  title,
  description,
  image,
  canonicalUrl,
  pathname = window.location.pathname
}: SeoProps) => {
  const { currentLanguage } = useLanguage();
  
  const finalTitle = title?.[currentLanguage as keyof typeof title] || (
    currentLanguage === 'es' 
      ? 'Pulse: Nuevos Amigos y Planes en la Vida Real'
      : 'Pulse: New Friends and IRL Plans'
  );
  
  const finalDescription = description?.[currentLanguage as keyof typeof description] || (
    currentLanguage === 'es'
      ? 'Conoce personas afines y planifica encuentros en la vida real con Pulse'
      : 'Meet like-minded people and plan real-life meetups with Pulse'
  );

  // Construct base URL handling www and language subdomains correctly
  const getBaseUrl = () => {
    const url = new URL(window.location.href);
    const hostParts = url.hostname.split('.');
  
    // Remove leading www or known language subdomains like 'es', 'en', etc.
    const knownSubdomains = ['www', 'es', 'en', 'fr', 'de', 'pt'];
    while (knownSubdomains.includes(hostParts[0])) {
      hostParts.shift();
    }
  
    const baseDomain = hostParts.join('.');
    return `${url.protocol}//${baseDomain}`;
  };


  // Construct URLs for different languages
  const baseUrl = getBaseUrl();
  const currentUrl = canonicalUrl || `${baseUrl}${pathname}`;
  
  // For English: use the base domain (or with www if that's how it was accessed)
  // For Spanish: use es subdomain on the base domain
  const alternateUrls = {
    en: currentUrl,
    es: `${baseUrl.replace('://', '://es.')}${pathname}`
  };

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate language links */}
      <link rel="alternate" href={alternateUrls.en} hrefLang="en" />
      <link rel="alternate" href={alternateUrls.es} hrefLang="es" />
      <link rel="alternate" href={alternateUrls.en} hrefLang="x-default" />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
