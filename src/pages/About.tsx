
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/about/HeroSection";
import FounderStory from "@/components/about/FounderStory";
import TeamSection from "@/components/about/TeamSection";
import FriendshipFormula from "@/components/about/FriendshipFormula";
import MissionSection from "@/components/about/MissionSection";
import CTASection from "@/components/about/CTASection";
import { useSeo } from "@/hooks/useSeo";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { currentLanguage } = useLanguage();
  
  // Enhanced SEO metadata for About page
  useSeo({
    title: {
      en: "About Pulse | Making Friendship Simple",
      es: "Sobre Pulse | Haciendo la Amistad Simple"
    },
    description: {
      en: "Learn about Pulse's mission to connect people and build meaningful friendships through our group matching technology",
      es: "Conoce la misión de Pulse para conectar personas y construir amistades significativas a través de nuestra tecnología de emparejamiento de grupos"
    },
    pathname: "/about",
    keywords: [
      "friendship platform", "social connections", "group matching", "friend finder",
      "real-life meetups", "community building", "social networking", "pulse app"
    ],
    modifiedTime: "2025-05-15T12:00:00Z",
    type: "article",
    section: "About",
    image: "/lovable-uploads/41aeb601-a150-497b-bf78-4174c5e9ed71.jpg"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <FounderStory />
      <FriendshipFormula />
      <TeamSection />
      <MissionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
