import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

type CityParam = {
  cityName: string;
};

const CityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState<{ name: string; country: string; state?: string } | null>(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities");
        const data = await response.json();

        const matchedCity = data.find((city: any) => city.url2.replace(/^\//, '') === cityName);

        if (!matchedCity) {
          navigate("/cities");
          return;
        }

        setCityData({
          name: matchedCity.en_name,
          country: matchedCity.en_country,
          state: matchedCity.en_state,
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

  return <CityMatchmakingTemplate cityName={cityData.name} />;
};

export default CityPage;
