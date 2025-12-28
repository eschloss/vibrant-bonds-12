
import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";

type CityAffinityParam = {
  cityName: string;
  affinityName: string;
};

interface AffinityData {
  name_en: string;
  name_es: string;
  url: string;
  all_cities: boolean;
  cities: string[];
}

const AffinityCityPage = () => {
  const { cityName, affinityName } = useParams<CityAffinityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const fallbackCityName = useMemo(() => {
    if (!cityName) return "";
    return cityName.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [cityName]);
  const fallbackAffinityUrl = useMemo(() => affinityName || "", [affinityName]);
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
  const [affinityData, setAffinityData] = useState<AffinityData>({
    name_en: fallbackAffinityUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    name_es: fallbackAffinityUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    url: fallbackAffinityUrl,
    all_cities: true,
    cities: []
  });

  const { data: cities, loading: loadingCities } = useApiJson<any[]>("/auth/get_all_cities_expanded", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });
  // Also fetch compact cities to get `bq`
  const { data: citiesCompact } = useApiJson<any[]>("/auth/get_all_cities", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });
  const { data: affinities, loading: loadingAffinities } = useApiJson<AffinityData[]>("/auth/get_all_affinities", {
    initialData: [],
    staleTime: 5 * 60 * 1000
  });

  const displayAffinityName = affinityData ? 
    (currentLanguage === 'es' ? affinityData.name_es : affinityData.name_en) : 
    '';
  const faqAffinity = affinityData
    ? (currentLanguage === "es" ? affinityData.name_es : affinityData.name_en).toLowerCase()
    : null;

  const seoProps = {
    title: {
      en: cityData && affinityData
        ? `Meet ${affinityData.name_en} Friends in ${cityData.name} | Pulse App`
        : 'Find Your Community | Pulse App',
      es: cityData && affinityData
        ? `Conoce Amigues ${affinityData.name_es} en ${cityData.name} | Pulse App`
        : 'Encuentra Tu Comunidad | Pulse App'
    },
    description: {
      en: cityData && affinityData
        ? `Join the ${affinityData.name_en.toLowerCase()} community in ${cityData.name}. Use Pulse to spark real friendships and plan fun in-person meetups.`
        : `Pulse helps you meet people who share your interests. Make real friends and plan IRL hangouts that actually happen.`,
      es: cityData && affinityData
        ? `Únete a la comunidad de ${affinityData.name_es.toLowerCase()} en ${cityData.name}. Con Pulse puedes hacer amistades reales y organizar quedadas en persona.`
        : `Pulse te ayuda a conocer personas que comparten tus intereses. Haz amistades reales y queda en la vida real.`
    },
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
    // Wait for data to finish loading before checking
    if (loadingCities || loadingAffinities) return;
    if (!cityName || !affinityName || !cities || !affinities) return;
    // Also check if arrays are empty (data hasn't loaded yet)
    if (cities.length === 0 || affinities.length === 0) return;
    
    try {
      const matchedCity = cities.find((city: any) => {
        const citySlug = city.url2.replace(/^\//, '').toLowerCase();
        return citySlug === cityName.toLowerCase();
      });
      const matchedAffinity = affinities.find((affinity: AffinityData) =>
        affinity.url.toLowerCase() === affinityName.toLowerCase()
      );
      if (!matchedCity || !matchedAffinity) {
        navigate("/cities");
        return;
      }
      const isAffinityAvailable = matchedAffinity.all_cities || matchedAffinity.cities.includes(matchedCity.code);
      if (!isAffinityAvailable) {
        navigate("/cities");
        return;
      }
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
      setAffinityData(matchedAffinity);
      window.scrollTo(0, 0);
      document.documentElement.classList.add('dark');
    } catch (err) {
      console.error("Failed to process data:", err);
      navigate("/cities");
    }
  }, [cityName, affinityName, cities, citiesCompact, affinities, navigate, currentLanguage, loadingCities, loadingAffinities]);

  return (
    <>
      <PageLoadingOverlay show={loadingCities || loadingAffinities} />
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
        identity={null}
        affinity={faqAffinity}
        isQueer={false}
        isAffinity={true}
        affinityName={displayAffinityName}
        affinityUrl={affinityData.url}
        language={cityData.language}
        active={cityData.active}
        frequency_days={cityData.frequency_days}
        bq={cityData.bq}
        isLoading={loadingCities || loadingAffinities}
      />
    </>
  );
};

export default AffinityCityPage;
