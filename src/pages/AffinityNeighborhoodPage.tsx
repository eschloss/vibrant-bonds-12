import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";

type NeighborhoodAffinityParam = {
  cityName: string;
  neighborhoodName: string;
  affinityName: string;
};

type NeighborhoodData = {
  name: string;
  name_urlized: string;
  description?: string;
  lat?: number;
  lng?: number;
  image?: string;
};

interface AffinityData {
  name_en: string;
  name_es: string;
  url: string;
  all_cities: boolean;
  cities: string[];
}

function normalizeImage(image?: string): string | undefined {
  if (!image) return undefined;
  return image.replace(/^https?:\/\//i, "");
}

const AffinityNeighborhoodPage = () => {
  const { cityName, neighborhoodName, affinityName } = useParams<NeighborhoodAffinityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  const fallbackNeighborhoodDisplayName = useMemo(() => {
    if (!neighborhoodName) return "";
    return neighborhoodName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [neighborhoodName]);

  const fallbackAffinityUrl = useMemo(() => affinityName || "", [affinityName]);

  const { data: cities, loading: loadingCities } = useApiJson<any[]>(
    "/auth/get_all_cities_expanded",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );
  const { data: citiesCompact, loading: loadingCitiesCompact } = useApiJson<any[]>(
    "/auth/get_all_cities",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );
  const { data: affinities, loading: loadingAffinities } = useApiJson<AffinityData[]>(
    "/auth/get_all_affinities",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const [matchedCity, setMatchedCity] = useState<any | null>(null);
  const [bq, setBq] = useState<boolean | undefined>(undefined);

  const [affinityData, setAffinityData] = useState<AffinityData>({
    name_en: fallbackAffinityUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    name_es: fallbackAffinityUrl.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    url: fallbackAffinityUrl,
    all_cities: true,
    cities: []
  });

  const displayAffinityName = affinityData
    ? currentLanguage === "es"
      ? affinityData.name_es
      : affinityData.name_en
    : "";

  const cityCode: string = matchedCity?.code || "";

  const { data: neighborhoods, loading: loadingNeighborhoods } = useApiJson<NeighborhoodData[]>(
    cityCode ? `/auth/get_neighborhoods/${cityCode}` : "/auth/get_neighborhoods/_",
    {
      initialData: [],
      staleTime: 5 * 60 * 1000,
      enabled: Boolean(cityCode)
    }
  );

  const [neighborhoodData, setNeighborhoodData] = useState<NeighborhoodData>({
    name: fallbackNeighborhoodDisplayName,
    name_urlized: neighborhoodName || "",
    description: "",
    lat: 0,
    lng: 0,
    image: undefined
  });

  const [cityMeta, setCityMeta] = useState<{
    cityDisplayName: string;
    country: string;
    state?: string;
    language?: string;
    active?: boolean;
    frequency_days?: number;
  }>({
    cityDisplayName: "",
    country: "",
    state: "",
    language: currentLanguage,
    active: false,
    frequency_days: undefined
  });

  // Step 1: match city and affinity, validate availability
  useEffect(() => {
    if (!cityName || !affinityName || !cities || !affinities) return;
    const foundCity = cities.find(
      (city: any) => city.url2?.replace(/^\//, "").toLowerCase() === cityName.toLowerCase()
    );
    const foundAffinity = affinities.find(
      (a: AffinityData) => a.url.toLowerCase() === affinityName.toLowerCase()
    );
    if (!foundCity || !foundAffinity) return;
    const isAffinityAvailable = foundAffinity.all_cities || foundAffinity.cities.includes(foundCity.code);
    if (!isAffinityAvailable) return;

    setMatchedCity(foundCity);
    setAffinityData(foundAffinity);

    const matchedCompact = Array.isArray(citiesCompact)
      ? citiesCompact.find((c: any) => c.code === foundCity.code)
      : undefined;
    const nextBq: boolean | undefined =
      typeof matchedCompact?.bq === "boolean" ? matchedCompact.bq : undefined;
    setBq(nextBq);

    const nameField = currentLanguage === "es" ? "es_name" : "en_name";
    const countryField = currentLanguage === "es" ? "es_country" : "en_country";
    const stateField = currentLanguage === "es" ? "es_state" : "en_state";
    setCityMeta({
      cityDisplayName: foundCity[nameField] || foundCity.en_name,
      country: foundCity[countryField] || foundCity.en_country,
      state: foundCity[stateField] || foundCity.en_state,
      language: foundCity.language,
      active: foundCity.active,
      frequency_days: foundCity.frequency_days
    });

    window.scrollTo(0, 0);
    document.documentElement.classList.add("dark");
  }, [cityName, affinityName, cities, citiesCompact, affinities, navigate, currentLanguage]);

  // Step 2: match neighborhood by name_urlized
  useEffect(() => {
    if (!cityName || !neighborhoodName || !affinityName) return;
    if (!matchedCity) return;
    if (!Array.isArray(neighborhoods)) return;
    if (loadingNeighborhoods) return;

    const foundNeighborhood = neighborhoods.find(
      (n) => String(n.name_urlized || "").toLowerCase() === neighborhoodName.toLowerCase()
    );
    if (!foundNeighborhood) {
      navigate(`/cities/${cityName}/${affinityName}`);
      return;
    }

    setNeighborhoodData({
      name: foundNeighborhood.name,
      name_urlized: foundNeighborhood.name_urlized,
      description: foundNeighborhood.description,
      lat: foundNeighborhood.lat,
      lng: foundNeighborhood.lng,
      image: normalizeImage(foundNeighborhood.image)
    });
  }, [cityName, neighborhoodName, affinityName, matchedCity, neighborhoods, loadingNeighborhoods, navigate]);

  const seoProps = {
    title: {
      en: matchedCity && affinityData
        ? `Meet ${affinityData.name_en} Friends in ${String(neighborhoodData.name)} | Pulse App`
        : "Find Your Community | Pulse App",
      es: matchedCity && affinityData
        ? `Conoce Amigues ${affinityData.name_es} en ${String(neighborhoodData.name)} | Pulse App`
        : "Encuentra Tu Comunidad | Pulse App"
    },
    description: {
      en: matchedCity && affinityData
        ? `Join the ${affinityData.name_en.toLowerCase()} community in ${String(neighborhoodData.name)}. Use Pulse to spark real friendships and plan fun in-person meetups.`
        : "Pulse helps you meet people who share your interests. Make real friends and plan IRL hangouts that actually happen.",
      es: matchedCity && affinityData
        ? `Únete a la comunidad de ${affinityData.name_es.toLowerCase()} en ${String(neighborhoodData.name)}. Con Pulse puedes hacer amistades reales y organizar quedadas en persona.`
        : "Pulse te ayuda a conocer personas que comparten tus intereses. Haz amistades reales y queda en la vida real."
    },
    image: typeof neighborhoodData?.image === "string" ? neighborhoodData.image : undefined,
    geoData: {
      name: `${String(neighborhoodData.name)}${cityMeta.cityDisplayName ? `, ${String(cityMeta.cityDisplayName)}` : ""}${
        cityMeta.state ? `, ${String(cityMeta.state)}` : ""
      }${cityMeta.country ? `, ${String(cityMeta.country)}` : ""}`,
      lat: neighborhoodData?.lat,
      lng: neighborhoodData?.lng
    }
  };

  const isLoading = loadingCities || loadingCitiesCompact || loadingAffinities || loadingNeighborhoods;

  return (
    <>
      <PageLoadingOverlay show={isLoading} />
      <Seo {...seoProps} />
      <CityMatchmakingTemplate
        cityName={neighborhoodData.name}
        neighborhoodName={neighborhoodData.name}
        placeDescription={neighborhoodData.description}
        code={cityCode}
        country={cityMeta.country}
        state={cityMeta.state}
        image={neighborhoodData.image}
        citySlug={cityName}
        showNeighborhoodsSection={true}
        neighborhoodsSectionCityName={cityMeta.cityDisplayName}
        headlinePlaceLinkTo={cityName ? `/cities/${cityName}` : "/cities"}
        isQueer={false}
        isAffinity={true}
        affinityName={displayAffinityName}
        affinityUrl={affinityData.url}
        language={cityMeta.language}
        active={cityMeta.active}
        frequency_days={cityMeta.frequency_days}
        bq={bq}
        isLoading={isLoading}
      />
    </>
  );
};

export default AffinityNeighborhoodPage;


