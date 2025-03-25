
import { useRef, useEffect, useState } from "react";
import { Download, Rocket, ChevronRight, ArrowRight, Smartphone } from "lucide-react";
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
      className="section-padding relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-pulse-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-pulse-coral/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* App Download Section */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-pulse-purple/5 to-transparent opacity-80"></div>
            
            <div className="relative z-10">
              <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <h2 className="heading-lg mb-6">
                  Get Matched With <span className="pulse-gradient-text">Friends</span> in Your City
                </h2>
                
                <p className="paragraph mb-8 max-w-md">
                  Download Pulse now and start spontaneous hangs with people who share your interests, values, and vibe.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://apps.apple.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button-secondary flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    <span>App Store</span>
                  </a>
                  
                  <a 
                    href="https://play.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="button-primary flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    <span>Google Play</span>
                  </a>
                </div>
                
                <div className="mt-8 flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg 
                        key={star}
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="#F97316" 
                        stroke="#F97316" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-foreground/70">
                    <span className="font-semibold">4.9/5</span> from 2,000+ reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Start Mission Section */}
          <div className="bg-gradient-to-br from-gray-900 via-indigo-900/90 to-gray-900 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-800 relative overflow-hidden text-white">
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
                
                <h2 className="heading-lg mb-6">
                  Start Your First <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-pink via-pulse-purple to-pulse-blue">Mission</span> Today
                </h2>
                
                <p className="paragraph text-white/80 mb-8 max-w-md">
                  Create or join a crew and meet awesome people in your city who share your interests and passions.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="bg-pulse-purple/20 p-3 rounded-lg shrink-0">
                      <span className="text-xl font-bold text-pulse-purple">1</span>
                    </div>
                    <p className="text-white/90">Join a crew of 3-5 people in your city</p>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="bg-pulse-purple/20 p-3 rounded-lg shrink-0">
                      <span className="text-xl font-bold text-pulse-purple">2</span>
                    </div>
                    <p className="text-white/90">Plan an activity together within 7 days</p>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <div className="bg-pulse-purple/20 p-3 rounded-lg shrink-0">
                      <span className="text-xl font-bold text-pulse-purple">3</span>
                    </div>
                    <p className="text-white/90">Meet in real life and have fun!</p>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    className="pulse-gradient-cta text-white font-medium px-8 py-6 rounded-full shadow-lg hover:shadow-xl text-lg flex items-center gap-2"
                  >
                    <span>Find Your Crew</span>
                    <ArrowRight className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadCTA;
