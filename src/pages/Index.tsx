
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import NeuralNetwork from "@/components/NeuralNetwork";
import AiIcebreakers from "@/components/AiIcebreakers";
import MissionCountdown from "@/components/MissionCountdown";
import Footer from "@/components/Footer";

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set dark mode
    document.documentElement.classList.add('dark');
    
    // Reset scroll position when component mounts
    window.scrollTo(0, 0);
    
    // Handle scroll events
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check if we need to scroll to a section based on localStorage
    const scrollToSection = localStorage.getItem('scrollToSection');
    if (scrollToSection) {
      localStorage.removeItem('scrollToSection');
      
      // Give time for the page to fully render before scrolling
      setTimeout(() => {
        const section = document.getElementById(scrollToSection);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // Check if URL has a hash to scroll to
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="flex flex-col min-h-screen dark hardware-accelerated">
      <Navbar scrolled={scrolled} isHomePage={true} />
      
      <main className="flex-grow hardware-accelerated">
        <Hero />
        <div id="how-it-works" ref={howItWorksRef}>
          <HowItWorks />
        </div>
        <NeuralNetwork />
        <AiIcebreakers />
        <MissionCountdown />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
