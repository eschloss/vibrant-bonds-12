
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
  pathname?: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
  type?: string; // website, article, product, etc.
  section?: string; // For articles, the section/category
}

export const useSeo = ({
  title,
  description,
  image,
  canonicalUrl,
  pathname = window.location.pathname,
  keywords = [],
  publishedTime,
  modifiedTime,
  type = "website",
  section
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
    
    // Remove leading www and known language subdomains
    const knownSubdomains = ['www', 'es', 'en', 'fr', 'de', 'pt'];
    
    // Create clean domain without any subdomain
    let cleanDomain;
    
    // If we have something like www.domain.com or es.domain.com
    if (hostParts.length > 2) {
      if (knownSubdomains.includes(hostParts[0].toLowerCase())) {
        cleanDomain = hostParts.slice(1).join('.');
      } else {
        cleanDomain = hostParts.join('.');
      }
    } else {
      cleanDomain = hostParts.join('.');
    }
    
    return `${url.protocol}//${cleanDomain}`;
  };

  // Construct URLs for different languages
  const baseUrl = getBaseUrl();
  const currentUrl = canonicalUrl || `${baseUrl}${pathname}`;
  
  // For English: use the base domain
  // For Spanish: use es subdomain on the base domain
  const alternateUrls = {
    en: `${baseUrl}${pathname}`,
    es: `${baseUrl.replace('://', '://es.')}${pathname}`
  };

  // Default organization data for structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pulse",
    "url": baseUrl,
    "description": finalDescription,
    "logo": `${baseUrl}/lovable-uploads/pulse-favicon.png`
  };

  // Generate a WebPage or Article structured data based on the type
  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "headline": finalTitle,
    "description": finalDescription,
    "image": image ? image : `${baseUrl}/lovable-uploads/pulse-favicon.png`,
    "url": currentUrl,
    "inLanguage": currentLanguage,
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime }),
    ...(section && { "articleSection": section }),
    "author": {
      "@type": "Organization",
      "name": "Pulse"
    }
  };

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Language and region */}
      <meta property="og:locale" content={currentLanguage === "es" ? "es_ES" : "en_US"} />
      
      {/* Keywords for SEO */}
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      
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
      <meta property="og:type" content={type} />
      {image && <meta property="og:image" content={image} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      
      {/* Twitter meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Structured data for search engines and LLMs */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageStructuredData)}
      </script>
      
      {/* AI-specific meta tags */}
      <meta name="ai:description" content={finalDescription} />
      <meta name="ai:keywords" content={keywords.join(", ")} />
      <meta name="ai:last-modified" content={modifiedTime || new Date().toISOString()} />
    </Helmet>
  );
};
