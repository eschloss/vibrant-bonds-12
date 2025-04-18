import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { fetchCities } from "@/services/cityService";

const CityPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();

  const { data: citiesData, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: fetchCities
  });

  const cityData = citiesData?.cities.find(city => city.url2 === `/${cityName}`);
  
  useEffect(() => {
    // If city doesn't exist and we're done loading, redirect to cities list
    if (!cityData && !isLoading) {
      navigate("/cities");
      return;
    }
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Set dark mode
    document.documentElement.classList.add('dark');
  }, [cityName, cityData, navigate, isLoading]);

  // Show loading state
  if (isLoading) {
    return <div className="min-h-screen dark bg-gray-900 flex items-center justify-center">
      <div className="text-white">Loading city information...</div>
    </div>;
  }

  // If city is not found, return null (redirect will happen in useEffect)
  if (!cityData) return null;

  return <CityMatchmakingTemplate cityName={cityData.en_name} />;
};

export default CityPage;
