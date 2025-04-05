
import { useRef, useEffect, useState } from "react";
import { Rocket, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="download" 
      ref={sectionRef} 
      className="section-padding relative overflow-hidden py-12"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pulse-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pulse-coral/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        {/* Start Mission Section */}
        <div className="bg-gradient-to-br from-gray-900 via-indigo-900/90 to-gray-900 rounded-3xl p-8 md:p-10 shadow-xl border border-gray-800 relative overflow-hidden text-white max-w-4xl mx-auto">
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] animate-float"></div>
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] animate-float" style={{
              animationDelay: "2s"
            }}></div>
          </div>
          
          <div className="relative z-10">
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="inline-block p-2 px-4 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                <div className="flex items-center gap-2 text-white/90">
                  <Rocket size={18} className="text-pulse-pink" />
                  <span className="text-sm font-medium">Begin Your Journey</span>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                Start Your First <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-pulse-purple to-pulse-blue">Mission</span> Today
              </h2>
              
              <p className="text-lg text-white/80 mb-6 max-w-2xl">
                Create or join a crew and meet awesome people in your city who share your interests and passions.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="bg-pulse-purple/20 p-3 rounded-lg mb-3">
                    <span className="text-xl font-bold text-pulse-purple">1</span>
                  </div>
                  <p className="text-white/90">Join a crew of 3-5 people in your city</p>
                </div>
                
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="bg-pulse-purple/20 p-3 rounded-lg mb-3">
                    <span className="text-xl font-bold text-pulse-purple">2</span>
                  </div>
                  <p className="text-white/90">Plan an activity together within 7 days</p>
                </div>
                
                <div className="flex flex-col items-center text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                  <div className="bg-pulse-purple/20 p-3 rounded-lg mb-3">
                    <span className="text-xl font-bold text-pulse-purple">3</span>
                  </div>
                  <p className="text-white/90">Meet in real life and have fun!</p>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  className="pulse-gradient-cta text-white font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl text-lg flex items-center gap-2 mx-auto"
                >
                  <span>Find Your Crew</span>
                  <ArrowRight className="ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
