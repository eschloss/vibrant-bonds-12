
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";

type CityParam = {
  cityName: string;
};

const CityPage = () => {
  const { cityName } = useParams<CityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const fallbackCityName = useMemo(() => {
    if (!cityName) return "";
    return cityName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [cityName]);
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
    bq?: boolean;
  }>({
    name: fallbackCityName,
    country: "",
    state: "",
    code: "",
    image: undefined,
    language: currentLanguage,
    lat: 0,
    lng: 0,
    active: false,
    frequency_days: undefined,
    bq: undefined
  });

  const { data: cities, loading } = useApiJson<any[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });

  // Also fetch compact cities to obtain `bq` flag
  const { data: citiesCompact } = useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });


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
    if (!cityName || !cities || cities.length === 0) return;
    try {
      const matchedCity = cities.find((city: any) =>
        city.url2.replace(/^\//, '').toLowerCase() === cityName.toLowerCase()
      );
      if (!matchedCity) {
        navigate("/cities");
        return;
      }
      // find bq flag from compact endpoint (if available)
      const matchedCompact = Array.isArray(citiesCompact)
        ? citiesCompact.find((c: any) => c.code === matchedCity.code)
        : undefined;
      const bq: boolean | undefined = typeof matchedCompact?.bq === 'boolean' ? matchedCompact.bq : undefined;
      const nameField = currentLanguage === 'es' ? 'es_name' : 'en_name';
      const countryField = currentLanguage === 'es' ? 'es_country' : 'en_country';
      const stateField = currentLanguage === 'es' ? 'es_state' : 'en_state';
      setCityData({
        name: matchedCity[nameField] || matchedCity.en_name,
        country: matchedCity[countryField] || matchedCity.en_country,
        state: matchedCity[stateField] || matchedCity.en_state,
        code: matchedCity.code,
        image: matchedCity.image,
        language: matchedCity.language,
        lat: matchedCity.lat,
        lng: matchedCity.lng,
        active: matchedCity.active,
        frequency_days: matchedCity.frequency_days,
        bq
      });
      window.scrollTo(0, 0);
      document.documentElement.classList.add('dark');
    } catch (err) {
      console.error("Failed to process cities:", err);
      navigate("/cities");
    }
  }, [cityName, cities, citiesCompact, navigate, currentLanguage]);

  return (
    <>
      <PageLoadingOverlay show={loading} />
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={cityData.name}
        code={cityData.code}
        country={cityData.country}
        state={cityData.state}
        image={cityData.image}
        citySlug={cityName}
        showNeighborhoodsSection={true}
        neighborhoodsSectionCityName={cityData.name}
        isQueer={false}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
        bq={cityData.bq}
        isLoading={loading}
      />
    </>
  );
};

export default CityPage;
