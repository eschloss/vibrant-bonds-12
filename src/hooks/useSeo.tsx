
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
}

export const useSeo = ({
  title,
  description,
  image,
  canonicalUrl
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

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      
      {/* Open Graph meta tags */}
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      {image && <meta property="og:image" content={image} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Twitter meta tags */}
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};
