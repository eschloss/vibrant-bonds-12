
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
  section?: string;
  geoData?: {
    name: string;
    lat?: number;
    lng?: number;
  };
}

export const Seo = ({
  title,
  description,
  image,
  canonicalUrl,
  pathname = window.location.pathname,
  keywords = [],
  publishedTime,
  modifiedTime,
  type = "website",
  section,
  geoData
}: SeoProps) => {
  const { currentLanguage } = useLanguage();

  const finalTitle = title?.[currentLanguage] || (
    currentLanguage === 'es'
      ? 'Pulse: Nuevos Amigos y Planes en la Vida Real'
      : 'Pulse: New Friends and IRL Plans'
  );

  const finalDescription = description?.[currentLanguage] || (
    currentLanguage === 'es'
      ? 'Conoce personas afines y planifica encuentros en la vida real con Pulse'
      : 'Meet like-minded people and plan real-life meetups with Pulse'
  );

  const getBaseUrl = () => {
    const url = new URL(window.location.href);
    const hostParts = url.hostname.split('.');
    const knownSubdomains = ['www', 'es', 'en', 'fr', 'de', 'pt'];

    const cleanDomain =
      hostParts.length > 2 && knownSubdomains.includes(hostParts[0].toLowerCase())
        ? hostParts.slice(1).join('.')
        : hostParts.join('.');

    return `${url.protocol}//${cleanDomain}`;
  };

  const baseUrl = getBaseUrl();
  const alternateUrls = {
    en: `${baseUrl}${pathname}`,
    es: `${baseUrl.replace('://', '://es.')}${pathname}`
  };
  // Self-canonical per language (with hreflang alternates)
  const currentUrl = canonicalUrl || alternateUrls[(currentLanguage as 'en' | 'es') || 'en'];

  // Use provided image prop for structured data (og:image and twitter:image are set statically in index.html)
  const finalImage = image || 'https://s.kikiapp.eu/desktop/socialimage.png';

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pulse",
    "url": baseUrl,
    "description": finalDescription,
    "logo": `https://s.kikiapp.eu/img/pulse_logo.png`
  };

  const pageStructuredData = {
    "@context": "https://schema.org",
    "@type": type === "article" ? "Article" : "WebPage",
    "headline": finalTitle,
    "description": finalDescription,
    "image": finalImage,
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


  const hasValidGeo =
      geoData &&
      typeof geoData.name === "string" &&
      geoData.lat != null &&
      geoData.lng != null;


  const geoLocationData = hasValidGeo
  ? {
      "@context": "https://schema.org",
      "@type": "Place",
      "name": geoData.name,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": geoData.lat,
        "longitude": geoData.lng
      }
    }
  : null;

  return (
    <Helmet>
      <html lang={currentLanguage} />
      <title>{finalTitle}</title>
      {/* Provide an explicit meta title tag for crawlers/tools that look for it */}
      <meta name="title" content={finalTitle} />
      <meta name="description" content={finalDescription} />

      <meta property="og:locale" content={currentLanguage === "es" ? "es_ES" : "en_US"} />

      {Array.isArray(keywords) && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" href={alternateUrls.en} hrefLang="en" />
      <link rel="alternate" href={alternateUrls.es} hrefLang="es" />
      <link rel="alternate" href={alternateUrls.en} hrefLang="x-default" />

      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      {/* og:image is set statically in index.html - do not override */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {/* twitter:image is set statically in index.html - do not override */}

      {/* Stringify JSON for structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(pageStructuredData)}
      </script>
      {geoLocationData && (
        <script type="application/ld+json">
          {JSON.stringify(geoLocationData)}
        </script>
      )}

      <meta name="ai:description" content={finalDescription} />
      {Array.isArray(keywords) && keywords.length > 0 && (
        <meta name="ai:keywords" content={keywords.join(", ")} />
      )}
      <meta name="ai:last-modified" content={(modifiedTime || new Date().toISOString()).toString()} />
      
    </Helmet>
  );
};
