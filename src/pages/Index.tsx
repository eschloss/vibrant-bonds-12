
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NeuralNetwork from "@/components/NeuralNetwork";
import MeetPipPromo from "@/components/MeetPipPromo";
import MissionCountdown from "@/components/MissionCountdown";
import Footer from "@/components/Footer";
import ShareCallout from "@/components/ShareCallout";
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
          {/* Removed extra headline module; incorporated into HowItWorks */}
          <div id="how-it-works" ref={howItWorksRef}>
            <HowItWorks />
          </div>
          <MeetPipPromo imageSrc="https://mckbdmxblzjdsvjxgsnn.supabase.co/storage/v1/object/public/pulse/PIP%20hello.png" />
          <NeuralNetwork />
          <MissionCountdown />
          <ShareCallout />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Index;
