
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/about/HeroSection";
import FounderStory from "@/components/about/FounderStory";
import TeamSection from "@/components/about/TeamSection";
import FriendshipFormula from "@/components/about/FriendshipFormula";
import MissionSection from "@/components/about/MissionSection";
import CTASection from "@/components/about/CTASection";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <FounderStory />
      <TeamSection />
      <FriendshipFormula />
      <MissionSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default About;
