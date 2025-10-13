
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

type CityParam = {
  cityName: string;
};

const CityPage = () => {
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
        ? `Meet New Friends in ${String(cityData.name)} | Pulse App`
        : 'Find Your Crew | Pulse App',
      es: cityData
        ? `Conoce Nuevos Amigos en ${String(cityData.name)} | Pulse App`
        : 'Encuentra Tu Grupo | Pulse App'
    },
    description: {
      en: cityData
        ? `Meet new friends in ${String(cityData.name)}. Join local friend groups, plan IRL meetups, and make real connections in ${String(cityData.name)} with Pulse.`
        : 'Meet new friends near you. Join local friend groups, plan IRL meetups, and build real connections with Pulse.',
      es: cityData
        ? `Haz nuevos amigues en ${String(cityData.name)}. Únete a grupos de amistades, planifica quedadas en persona y crea conexiones reales en ${String(cityData.name)} con Pulse.`
        : 'Haz nuevos amigues cerca de ti. Únete a grupos, planifica quedadas en persona y crea conexiones reales con Pulse.'
    },
    keywords: cityData ? [
      `${String(cityData.name)} friends`,
      `meet friends in ${String(cityData.name)}`,
      `${String(cityData.name)} friend groups`,
      `make friends ${String(cityData.name)}`,
      `meet people in ${String(cityData.name)}`
    ] : ['meet friends', 'friend groups', 'make friends'],
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

        const matchedCity = data.find((city: any) =>
          city.url2.replace(/^\//, '').toLowerCase() === cityName.toLowerCase()
        );

        
        if (!matchedCity) {
          navigate("/cities");
          return;
        }

        // Use Spanish city data if language is Spanish, otherwise English
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
        isQueer={false}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
      />
    </>
  );
};

export default CityPage;
