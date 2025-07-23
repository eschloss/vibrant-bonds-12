import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CityMatchmakingTemplate from "@/components/CityMatchmakingTemplate";
import { useLanguage } from "@/contexts/LanguageContext";
import { Seo } from "@/hooks/useSeo";

type CommunityParam = {
  community_url: string;
};

interface CommunityData {
  id: string;
  url: string;
  title1: string;
  title2: string;
  powered_by: string;
  business_name: string;
  business_image: string;
  background_image: string;
  city: string;
}

const CommunityPage = () => {
  const { community_url } = useParams<CommunityParam>();
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [communityData, setCommunityData] = useState<CommunityData | null>(null);

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
    const fetchCommunity = async () => {
      try {
        const response = await fetch(`https://api.kikiapp.eu/match/get_community?slag=${community_url}`);
        
        if (!response.ok) {
          navigate("/communities");
          return;
        }

        const data = await response.json();
        setCommunityData(data);

        window.scrollTo(0, 0);
        document.documentElement.classList.add('dark');
      } catch (err) {
        console.error("Failed to fetch community:", err);
        navigate("/communities");
      }
    };

    if (community_url) {
      fetchCommunity();
    }
  }, [community_url, navigate]);

  if (!communityData) return null;

  // Create urlized version of title2 for cityLabel
  const urlizedTitle2 = communityData.title2.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  return (
    <>
      <Seo {...seoProps} />
      <CityMatchmakingTemplate 
        cityName={communityData.title2}
        code={communityData.city}
        country=""
        state=""
        image={communityData.background_image}
        isQueer={false}
        isCommunity={true}
        communityData={{
          title1: communityData.title1,
          title2: communityData.title2,
          powered_by: communityData.powered_by,
          business_name: communityData.business_name,
          business_image: communityData.business_image,
          submatchId: communityData.id,
          cityLabel: urlizedTitle2
        }}
      />
    </>
  );
};

export default CommunityPage;