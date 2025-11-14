import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommunityMatchmakingTemplate from "@/components/CommunityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";
import { useApiJson } from "@/hooks/useApiJson";
import PageLoadingOverlay from "@/components/ui/PageLoadingOverlay";

type CommunityParam = {
  community_url: string;
};

interface CommunityData {
  id: string;
  url: string;
  title1: string;
  title2: string;
  subtitle?: string;
  title2_part2?: string;
  powered_by: string;
  business_name: string;
  business_image: string;
  business_url: string;
  background_image: string;
  city: string;
}

const CommunityPage = () => {
  const { community_url } = useParams<CommunityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const fallbackTitle = useMemo(() => {
    if (!community_url) return "";
    return community_url.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }, [community_url]);
  const [communityData, setCommunityData] = useState<CommunityData>({
    id: "",
    url: community_url || "",
    title1: "",
    title2: fallbackTitle,
    subtitle: "",
    title2_part2: "",
    powered_by: "",
    business_name: "",
    business_image: "",
    business_url: "",
    background_image: "",
    city: ""
  });

  const endpoint = useMemo(() => {
    if (!community_url) return null;
    return `/match/get_community?slag=${encodeURIComponent(community_url)}`;
  }, [community_url]);
  const { data, loading, error } = useApiJson<CommunityData>(endpoint || "", {
    initialData: undefined,
    enabled: !!endpoint
  });

  const seoProps = {
    title: {
      en: communityData
        ? `${communityData.title1} ${communityData.title2} | Pulse App`
        : 'Find Your Community | Pulse App',
      es: communityData
        ? `${communityData.title1} ${communityData.title2} | Pulse App`
        : 'Encuentra Tu Comunidad | Pulse App'
    },
    description: {
      en: communityData
        ? `${communityData.title1} ${communityData.title2} with Pulse`
        : 'Join communities and connect with like-minded people',
      es: communityData
        ? `${communityData.title1} ${communityData.title2} con Pulse`
        : 'Únete a comunidades y conecta con personas afines'
    },
    image: communityData?.background_image ? `https://${communityData.background_image}` : undefined,
  };

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch community:", error);
      navigate("/communities");
    }
  }, [error, navigate]);

  useEffect(() => {
    if (!data) return;
    setCommunityData(data);
    window.scrollTo(0, 0);
    document.documentElement.classList.add('dark');
  }, [data]);

  // Use title2 directly without encoding - it will be encoded in the template
  const urlizedTitle2 = communityData.title2;

  return (
    <>
      <PageLoadingOverlay show={loading} />
      <Seo {...seoProps} />
      <CommunityMatchmakingTemplate 
        cityName={communityData.title2}
        code={communityData.city}
        country=""
        state=""
        image={communityData.background_image}
        isLoading={loading}
        communityData={{
          title1: communityData.title1,
          title2: communityData.title2,
          subtitle: communityData.subtitle,
          title2_part2: communityData.title2_part2,
          powered_by: communityData.powered_by,
          business_name: communityData.business_name,
          business_image: communityData.business_image,
          business_url: communityData.business_url,
          submatchId: communityData.id,
          cityLabel: urlizedTitle2
        }}
      />
    </>
  );
};

export default CommunityPage;