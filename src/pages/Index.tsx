
import { Suspense, lazy, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Viewport from "@/components/Viewport";
const NeuralNetworkLazy = lazy(() => import("@/components/NeuralNetwork"));
const HowItWorksLazy = lazy(() => import("@/components/HowItWorks"));
const MeetPipPromoLazy = lazy(() => import("@/components/MeetPipPromo"));
const MissionCountdownLazy = lazy(() => import("@/components/MissionCountdown"));
const ActivitiesTeaserLazy = lazy(() => import("@/components/ActivitiesTeaser"));
const FooterLazy = lazy(() => import("@/components/Footer"));
const ShareCalloutLazy = lazy(() => import("@/components/ShareCallout"));
import { Seo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const { currentLanguage } = useLanguage();

  const seoProps = {
    title: {
      en: "Pulse: New Friends & Real-Life Plans",
      es: "Pulse: Nuevos Amigos y Planes Reales"
    },
    description: {
      en: "Meet like-minded people in your city and plan real-life meetups with Pulse. AI-powered group matching for meaningful friendships.",
      es: "Conoce personas afines en tu ciudad y planifica encuentros reales con Pulse. Emparejamiento grupal con IA para amistades significativas."
    },
    keywords: ["make friends", "group matching", "real-life meetups", "friendship app", "city social", "meet people", "social connections"],
    type: "website",
    image: "/lovable-uploads/41aeb601-a150-497b-bf78-4174c5e9ed71.jpg"
  };

  return (
    <>
      <Seo {...seoProps} />
      <div className="flex flex-col min-h-screen dark">
        <Navbar />
        
        <main className="flex-grow">
          <Hero />
          <div id="how-it-works" ref={howItWorksRef}>
            <Suspense fallback={null}>
              <HowItWorksLazy ctaHref="/how-it-works" ctaLabel="How It Works" />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <ActivitiesTeaserLazy />
          </Suspense>
          <Suspense fallback={null}>
            <MeetPipPromoLazy imageSrc="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png" />
          </Suspense>
          <Viewport rootMargin="300px 0px" threshold={0}>
            <Suspense fallback={null}>
              <NeuralNetworkLazy />
            </Suspense>
          </Viewport>
          <Suspense fallback={null}>
            <MissionCountdownLazy />
          </Suspense>
          <Suspense fallback={null}>
            <ShareCalloutLazy />
          </Suspense>
        </main>
        
        <Suspense fallback={null}>
          <FooterLazy />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
