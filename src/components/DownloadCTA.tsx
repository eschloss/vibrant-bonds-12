
import { useRef, useEffect, useState } from "react";
import { Download, Smartphone } from "lucide-react";

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
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-pulse-purple/5 to-transparent opacity-80"></div>
          
          <div className="relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
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
              
              <div className={`${isVisible ? 'animate-slide-down' : 'opacity-0'} flex justify-center md:justify-end`}>
                <div className="relative max-w-xs">
                  <div className="absolute inset-0 bg-gradient-cta opacity-20 rounded-3xl blur-3xl transform scale-95"></div>
                  <div className="relative z-10 bg-white p-4 rounded-3xl shadow-xl border border-gray-100">
                    <div className="aspect-[9/16] w-full bg-gradient-blue rounded-2xl overflow-hidden relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Smartphone size={120} className="text-white/20" />
                        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center w-full px-6">
                          <h3 className="text-white font-bold text-xl mb-2">Find Your People</h3>
                          <p className="text-white/80 text-sm">Pulse connects you with friends who share your interests</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
