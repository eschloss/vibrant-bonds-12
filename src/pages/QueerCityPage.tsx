
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

type CityParam = {
  cityName: string;
};

const QueerCityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
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

        setCityData({
          name: matchedCity.en_name,
          country: matchedCity.en_country,
          state: matchedCity.en_state,
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
  }, [cityName, navigate]);

  if (!cityData) return null;

  return (
    <CityMatchmakingTemplate 
      cityName={cityData.name}
      code={cityData.code}
      country={cityData.country}
      state={cityData.state}
      image={cityData.image}
    />
  );
};

export default QueerCityPage;
