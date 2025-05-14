
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";

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
  } | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities");
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
          image: matchedCity.image
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
      isQueer={false}
    />
  );
};

export default CityPage;
