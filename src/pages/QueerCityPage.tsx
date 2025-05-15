
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSeo } from "@/hooks/useSeo";

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
  } | null>(null);

  // ✅ 1. Construct SEO props *conditionally* but outside JSX/hooks
  const seoProps = cityData
    ? {
        title: {
          en: `Meet New Queer Friends in ${cityData.name} | Pulse App`,
          es: `Conoce Nuevos Amigos LGBTQ+ en ${cityData.name} | Pulse App`
        },
        description: {
          en: `Connect with LGBTQ+ community in ${cityData.name} and plan real-life meetups with Pulse`,
          es: `Conecta con la comunidad LGBTQ+ en ${cityData.name} y planifica encuentros en la vida real con Pulse`
        },
        image: cityData.image,
        geoData: {
          name: `${cityData.name}${cityData.state ? `, ${cityData.state}` : ''}, ${cityData.country}`,
          lat: cityData.lat,
          lng: cityData.lng
        }
      }
    : {
        title: {
          en: 'Find Your Queer Crew | Pulse App',
          es: 'Encuentra Tu Grupo LGBTQ+ | Pulse App'
        },
        description: {
          en: 'Pulse matches you with like-minded LGBTQ+ people to form meaningful friendships',
          es: 'Pulse te conecta con personas LGBTQ+ afines para formar amistades significativas'
        }
      };

  // ✅ 2. Always call the hook with those props (it will rerun when cityData changes)
  useSeo(seoProps);

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
          lng: matchedCity.lng  // Get longitude from API
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
    <CityMatchmakingTemplate 
      cityName={cityData.name}
      code={cityData.code}
      country={cityData.country}
      state={cityData.state}
      image={cityData.image}
      isQueer={true}
      language={cityData.language}
    />
  );
};

export default QueerCityPage;
