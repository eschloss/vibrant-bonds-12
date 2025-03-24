
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import PsychedelicBackground from "@/components/PsychedelicBackground";
import MouseTrail from "@/components/MouseTrail";
import FloatingElements from "@/components/FloatingElements";
import { useToast } from "@/components/ui/toast";
import { Loader } from "lucide-react";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading experience
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome to Pulse",
        description: "Move your mouse around to interact with the experience",
      });
    }, 2500);

    // Scroll to top when page loads
    window.scrollTo(0, 0);

    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!loading) {
      // Trigger entrance animation
      const entranceTimer = setTimeout(() => {
        setAnimationComplete(true);
      }, 1000);

      return () => clearTimeout(entranceTimer);
    }
  }, [loading]);

  // Handle parallax scrolling
  useEffect(() => {
    if (!loading && mainRef.current) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const sections = mainRef.current?.querySelectorAll('section');
        
        sections?.forEach((section, index) => {
          const speed = index % 2 === 0 ? 0.2 : -0.2;
          const yPos = scrollY * speed;
          section.style.transform = `translateY(${yPos}px)`;
        });
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <Loader size={64} className="mx-auto animate-spin text-pulse-purple" />
          <h1 className="text-4xl font-display font-bold text-white animate-pulse">
            Entering Pulse Universe...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative min-h-screen overflow-hidden transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
      {/* Dynamic background */}
      <PsychedelicBackground />
      
      {/* Mouse interaction */}
      <MouseTrail />
      
      {/* Floating decorative elements */}
      <FloatingElements />
      
      <Navbar />
      
      <main ref={mainRef} className="relative z-10">
        <Hero />
        <HowItWorks />
        <Testimonials />
        <DownloadCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
