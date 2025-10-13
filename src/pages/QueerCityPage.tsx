import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

type CityParam = {
  cityName: string;
};

const QueerCityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [cityData, setCityData] = useState<{ 
    name: string; 
    country: string; 
    state?: string; 
    code: string;
    image?: string;
    language?: string;
    lat?: number;
    lng?: number;
    active?: boolean;
    frequency_days?: number;
  } | null>(null);

  const seoProps = {
    title: {
      en: cityData
        ? `Meet Gay, Lesbian, & Queer Friends in ${cityData.name} | Pulse App`
        : 'Find LGBTQ+, Gay, Lesbian, & Queer Friends Near You | Pulse App',
      es: cityData
        ? `Conoce Amigues Gay, Lesbianas y Queer en ${cityData.name} | Pulse App`
        : 'Encuentra Amigues LGBTQ+, Gay, Lesbianas y Queer Cerca de Ti | Pulse App'
    },
    description: {
      en: cityData
        ? `Meet LGBTQ+ friends in ${cityData.name}. Join queer friend groups, plan IRL meetups, and make real connections in ${cityData.name} with Pulse.`
        : `Meet LGBTQ+ friends near you. Join queer friend groups, plan IRL meetups, and build real connections with Pulse.`,
      es: cityData
        ? `Conoce amigues LGBTQ+ en ${cityData.name}. Únete a grupos queer, planifica quedadas en persona y crea conexiones reales en ${cityData.name} con Pulse.`
        : `Conoce amigues LGBTQ+ cerca de ti. Únete a grupos queer, planifica quedadas en persona y crea conexiones reales con Pulse.`
    },
    keywords: cityData ? [
      `${cityData.name} LGBTQ+ friends`,
      `meet queer friends in ${cityData.name}`,
      `${cityData.name} queer community`,
      `gay friends ${cityData.name}`
    ] : ['LGBTQ+ friends', 'queer community'],
    image: typeof cityData?.image === "string" ? cityData.image : undefined,
    geoData: {
      name: cityData
        ? `${String(cityData.name)}${cityData.state ? `, ${String(cityData.state)}` : ''}, ${String(cityData.country)}`
        : 'Unspecified City',
      lat: cityData ? cityData.lat : 0,
      lng: cityData ? cityData.lng : 0,
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities_expanded");
        const data = await response.json();

        const matchedCity = data.find((city: any) => {
          const citySlug = city.url2.replace(/^\//, '').toLowerCase(); // strip leading slash
          return citySlug === cityName?.toLowerCase();
        });

        if (!matchedCity) {
          navigate("/cities");
          return;
        }

        const nameField = currentLanguage === 'es' ? 'es_name' : 'en_name';
        const countryField = currentLanguage === 'es' ? 'es_country' : 'en_country';
        const stateField = currentLanguage === 'es' ? 'es_state' : 'en_state';

        setCityData({
          name: matchedCity[nameField] || matchedCity.en_name, // Fallback to English if Spanish not available
          country: matchedCity[countryField] || matchedCity.en_country,
          state: matchedCity[stateField] || matchedCity.en_state,
          code: matchedCity.code,
          image: matchedCity.image,
          language: matchedCity.language, // Get language from API
          lat: matchedCity.lat, // Get latitude from API  
          lng: matchedCity.lng,  // Get longitude from API
          active: matchedCity.active, // Get active status from API
          frequency_days: matchedCity.frequency_days // Get frequency days from API
        });

        window.scrollTo(0, 0);
        document.documentElement.classList.add('dark');
      } catch (err) {
        console.error("Failed to fetch cities:", err);
        navigate("/cities");
      }
    };

    if (cityName) {
      fetchCities();
    }
  }, [cityName, navigate, currentLanguage]);

  if (!cityData) return null;

  return (
    <>
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={cityData.name}
        code={cityData.code}
        country={cityData.country}
        state={cityData.state}
        image={cityData.image}
        isQueer={true}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
      />
    </>
  );
};

export default QueerCityPage;
