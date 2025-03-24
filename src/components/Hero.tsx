
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Download, Smartphone } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      // Calculate mouse position relative to the center of the hero section
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Normalize values between -1 and 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      setMousePosition({ x: normalizedX, y: normalizedY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Apply 3D effect based on mouse position
  useEffect(() => {
    if (textRef.current && phoneRef.current) {
      // Parallax effect for text - subtle movement in opposite direction
      textRef.current.style.transform = `
        translate3d(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px, 0)
        rotate3d(${-mousePosition.y * 0.1}, ${mousePosition.x * 0.1}, 0, ${Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2) * 5}deg)
      `;
      
      // More pronounced effect for the phone
      phoneRef.current.style.transform = `
        translate3d(${mousePosition.x * 25}px, ${mousePosition.y * 25}px, 50px)
        rotate3d(${-mousePosition.y * 0.2}, ${mousePosition.x * 0.2}, 0, ${Math.sqrt(mousePosition.x ** 2 + mousePosition.y ** 2) * 10}deg)
      `;
    }
  }, [mousePosition]);

  // Randomized animated gradient words
  const [gradientPosition, setGradientPosition] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setGradientPosition(prev => (prev + 1) % 100);
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden section-padding perspective-1000"
    >
      {/* Content Container - using perspective for 3D effects */}
      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'} md:order-1 order-2 transform-style-3d`}>
            <div className="flex flex-col gap-6 max-w-xl glass p-8 rounded-3xl">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/30 w-fit">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulse-coral opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pulse-coral"></span>
                </span>
                <span className="text-white">Now in San Francisco, LA, and NYC</span>
              </div>
              
              <h1 
                ref={textRef}
                className="heading-xl transition-transform duration-200 ease-out"
                style={{
                  background: `linear-gradient(${gradientPosition}deg, #8B5CF6, #FDA4AF, #F97316, #5EEAD4)`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${gradientPosition}% ${100 - gradientPosition}%`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                }}
              >
                <span className="block">Effortless</span>
                <span className="block">Real-World</span>
                <span className="block">Friendships</span>
              </h1>
              
              <p className="paragraph text-lg md:text-xl text-white max-w-md">
                Connect with like-minded people in your city. From coffee meetups to weekend adventures — make friends that get you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <a 
                  href="#download" 
                  className="relative group overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pulse-coral to-pulse-pink rounded-full animate-pulse-slow"></span>
                  <span className="relative flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full font-medium border border-white/30 text-white hover:bg-white/20 transition-all duration-300 z-10">
                    <Download size={18} />
                    <span>Download the App</span>
                  </span>
                </a>
                
                <a 
                  href="#how-it-works" 
                  className="relative group flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full font-medium border border-white/30 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <span>See How It Works</span>
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white/50 bg-gray-200 hover:scale-110 transition-transform duration-300 cursor-pointer"
                      style={{
                        backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 10})`,
                        backgroundSize: 'cover',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-sm text-white/90">
                  <span className="font-semibold">1,000+</span> new connections made today
                </p>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div 
            ref={phoneRef}
            className={`${isVisible ? 'animate-float' : 'opacity-0'} md:order-2 order-1 flex justify-center md:justify-end transition-transform duration-200 ease-out`}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-50 rounded-3xl blur-3xl transform scale-95"></div>
              <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/30 max-w-xs mx-auto md:mx-0">
                <div className="aspect-[9/16] w-full bg-gradient-blue rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Smartphone size={120} className="text-white/20" />
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 text-center w-full px-6">
                      <h3 className="text-white font-bold text-xl mb-2">Find Your People</h3>
                      <p className="text-white/80 text-sm">Pulse connects you with friends who share your interests</p>
                    </div>
                  </div>
                  
                  {/* Animated circles to simulate app activity */}
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="w-12 h-12 rounded-full bg-white/10 border border-white/30 flex items-center justify-center"
                        style={{
                          animation: `bounce-gentle ${1 + i * 0.2}s ease-in-out infinite ${i * 0.3}s`
                        }}
                      >
                        <div className="w-8 h-8 rounded-full"
                          style={{
                            backgroundImage: `url(https://i.pravatar.cc/100?img=${i + 20})`,
                            backgroundSize: 'cover'
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated blob decorations */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-pulse-purple/20 blur-3xl mix-blend-screen animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-pulse-coral/20 blur-3xl mix-blend-screen animate-float"></div>
    </section>
  );
};

export default Hero;
