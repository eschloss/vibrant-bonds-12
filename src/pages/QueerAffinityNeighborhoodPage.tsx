import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import { useLanguage } from "@/contexts/LanguageContext";

type QueerNeighborhoodAffinityParam = {
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
  is_gen?: boolean;
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

const QueerAffinityNeighborhoodPage = () => {
  const { cityName, neighborhoodName, affinityName } = useParams<QueerNeighborhoodAffinityParam>();
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

  const { data: affinities, loading: loadingAffinities } = useApiJson<AffinityData[]>(
    "/auth/get_all_affinities",
    { initialData: [], staleTime: 5 * 60 * 1000 }
  );

  const [matchedCity, setMatchedCity] = useState<any | null>(null);

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
  const faqAffinity = affinityData
    ? (currentLanguage === "es" ? affinityData.name_es : affinityData.name_en).toLowerCase()
    : null;

  const cityCode: string = matchedCity?.code || "";

  const {
    data: neighborhoods,
    loading: loadingNeighborhoods,
    hasFetched: neighborhoodsFetched,
    url: neighborhoodsUrl,
    error: neighborhoodsError
  } = useApiJson<NeighborhoodData[]>(
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
    image: undefined,
    is_gen: false
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

  useEffect(() => {
    console.log("[QueerAffinityNeighborhoodPage]", {
      cityName,
      neighborhoodName,
      affinityName,
      cityCode,
      neighborhoodsUrl,
      neighborhoodsFetched,
      loadingNeighborhoods,
      neighborhoodsLen: Array.isArray(neighborhoods) ? neighborhoods.length : undefined,
      neighborhoodsError: neighborhoodsError?.message
    });
  }, [
    cityName,
    neighborhoodName,
    affinityName,
    cityCode,
    neighborhoodsUrl,
    neighborhoodsFetched,
    loadingNeighborhoods,
    neighborhoods,
    neighborhoodsError
  ]);

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
  }, [cityName, affinityName, cities, affinities, navigate, currentLanguage]);

  // Step 2: match neighborhood by name_urlized
  useEffect(() => {
    if (!cityName || !neighborhoodName || !affinityName) return;
    if (!matchedCity) return;
    if (!Array.isArray(neighborhoods)) return;
    if (!neighborhoodsFetched) return;

    const foundNeighborhood = neighborhoods.find(
      (n) => String(n.name_urlized || "").toLowerCase() === neighborhoodName.toLowerCase()
    );
    if (!foundNeighborhood) {
      console.log("[QueerAffinityNeighborhoodPage] redirect:not_found", {
        cityName,
        neighborhoodName,
        affinityName,
        cityCode,
        neighborhoodsLen: neighborhoods.length
      });
      navigate(`/cities/${cityName}/queer/${affinityName}`);
      return;
    }

    console.log("[QueerAffinityNeighborhoodPage] match:found", {
      cityName,
      neighborhoodName,
      affinityName,
      cityCode,
      found: foundNeighborhood.name_urlized
    });
    setNeighborhoodData({
      name: foundNeighborhood.name,
      name_urlized: foundNeighborhood.name_urlized,
      description: foundNeighborhood.description,
      lat: foundNeighborhood.lat,
      lng: foundNeighborhood.lng,
      image: normalizeImage(foundNeighborhood.image),
      is_gen: Boolean((foundNeighborhood as any)?.is_gen)
    });
  }, [cityName, neighborhoodName, affinityName, matchedCity, neighborhoods, neighborhoodsFetched, cityCode, navigate]);

  const seoProps = {
    title: {
      en: matchedCity && affinityData
        ? `Meet Queer ${affinityData.name_en} Friends in ${String(neighborhoodData.name)} | Pulse App`
        : "Find Your Queer Community | Pulse App",
      es: matchedCity && affinityData
        ? `Conoce Amigues Queer ${affinityData.name_es} en ${String(neighborhoodData.name)} | Pulse App`
        : "Encuentra Tu Comunidad Queer | Pulse App"
    },
    description: {
      en: matchedCity && affinityData
        ? `Meet queer ${affinityData.name_en.toLowerCase()} friends in ${String(neighborhoodData.name)}. Join groups, plan IRL meetups, and make real connections in ${String(neighborhoodData.name)} with Pulse.`
        : "Meet queer friends near you. Join groups, plan IRL meetups, and build real connections with Pulse.",
      es: matchedCity && affinityData
        ? `Conoce amigues queer de ${affinityData.name_es.toLowerCase()} en ${String(neighborhoodData.name)}. Únete a grupos, planifica quedadas en persona y crea conexiones reales en ${String(neighborhoodData.name)} con Pulse.`
        : "Conoce amigues queer cerca de ti. Únete a grupos, planifica quedadas en persona y crea conexiones reales con Pulse."
    },
    keywords: matchedCity && affinityData ? [
      `${String(neighborhoodData.name)} ${affinityData.name_en} friends`,
      `meet ${affinityData.name_en.toLowerCase()} friends in ${String(neighborhoodData.name)}`,
      `${String(neighborhoodData.name)} ${affinityData.name_en.toLowerCase()} community`
    ] : ["queer friends", "affinity groups"],
    image:
      (typeof neighborhoodData?.image === "string" && neighborhoodData.image) ||
      (typeof matchedCity?.image === "string" ? normalizeImage(matchedCity.image) : undefined),
    geoData: {
      name: `${String(neighborhoodData.name)}${cityMeta.cityDisplayName ? `, ${String(cityMeta.cityDisplayName)}` : ""}${
        cityMeta.state ? `, ${String(cityMeta.state)}` : ""
      }${cityMeta.country ? `, ${String(cityMeta.country)}` : ""}`,
      lat: neighborhoodData?.lat,
      lng: neighborhoodData?.lng
    }
  };

  const isLoading = loadingCities || loadingAffinities || loadingNeighborhoods;
  const effectiveImage =
    (typeof neighborhoodData?.image === "string" && neighborhoodData.image) ||
    (typeof matchedCity?.image === "string" ? normalizeImage(matchedCity.image) : undefined);

  return (
    <>
      <PageLoadingOverlay show={isLoading} />
      <Seo {...seoProps} />
      <CityMatchmakingTemplate
        cityName={neighborhoodData.name}
        neighborhoodName={neighborhoodData.name}
        isGen={Boolean(neighborhoodData.is_gen)}
        placeDescription={neighborhoodData.description}
        code={cityCode}
        country={cityMeta.country}
        state={cityMeta.state}
        image={effectiveImage}
        citySlug={cityName}
        showNeighborhoodsSection={true}
        neighborhoodsSectionCityName={cityMeta.cityDisplayName}
        headlinePlaceLinkTo={cityName ? `/cities/${cityName}` : "/cities"}
        identity="queer"
        affinity={faqAffinity}
        isQueer={true}
        isAffinity={true}
        affinityName={displayAffinityName}
        affinityUrl={affinityData.url}
        language={cityMeta.language}
        active={cityMeta.active}
        frequency_days={cityMeta.frequency_days}
        isLoading={isLoading}
      />
    </>
  );
};

export default QueerAffinityNeighborhoodPage;


