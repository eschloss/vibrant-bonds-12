import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";

type CityParam = {
  cityName: string;
};

const CityPage = () => {
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
        setCityData({
          name: "Your City2",
          country: "Worldwide",
          state: "",
          code: "",
          image: ""
        });

        window.scrollTo(0, 0);
        document.documentElement.classList.add('dark');
      } catch (err) {
        console.error("Failed to fetch cities:", err);
        navigate("/cities");
      }
    };

    fetchCities();
  }, [cityName, navigate]);

  return <CityMatchmakingTemplate 
           cityName={cityData.name} 
           code={cityData.code} 
           country={cityData.country} 
           state={cityData.state}
           image={cityData.image}
          />;
};

export default CityPage;
