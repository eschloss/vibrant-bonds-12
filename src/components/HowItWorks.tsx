
import { useState, useEffect, useRef } from "react";
import { Search, MessageCircle, MapPin, RefreshCw } from "lucide-react";

const steps = [
  {
    id: "match",
    title: "Match",
    description: "Get matched with people who share your interests and vibe.",
    icon: Search,
    color: "bg-pulse-purple text-white",
  },
  {
    id: "chat",
    title: "Chat",
    description: "Break the ice with conversation starters that actually work.",
    icon: MessageCircle,
    color: "bg-pulse-blue text-white",
  },
  {
    id: "meetup",
    title: "Meetup",
    description: "Plan spontaneous hangouts at places you both love.",
    icon: MapPin,
    color: "bg-pulse-coral text-white",
  },
  {
    id: "reconnect",
    title: "Reconnect",
    description: "Build lasting friendships with reminders to keep in touch.",
    icon: RefreshCw,
    color: "bg-pulse-teal text-white",
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Track view visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
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

  // Mouse movement tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!stepsRef.current) return;
      
      const rect = stepsRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      setMousePosition({ x, y });
    };
    
    if (isInView) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isInView]);

  // Auto-cycle through steps
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isInView]);

  return (
    <section 
      id="how-it-works" 
      ref={sectionRef} 
      className="section-padding relative overflow-hidden perspective-1000"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full opacity-50 -z-5">
        <div 
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pulse-purple/20 via-pulse-teal/10 to-pulse-coral/20"
          style={{
            transform: `rotate(${mousePosition.x * 10}deg) scale(${1 + mousePosition.y * 0.1})`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            <span className="pulse-gradient-text inline-block animate-float">How Pulse Works</span>
          </h2>
          <p className="paragraph text-white/80">
            Building friendships shouldn't be complicated. Pulse makes it easy to find your people and create memories together.
          </p>
        </div>

        <div 
          ref={stepsRef}
          className="grid md:grid-cols-2 gap-12 items-center transform-style-3d"
          style={{
            transform: `rotateY(${(mousePosition.x - 0.5) * 10}deg) rotateX(${(mousePosition.y - 0.5) * -5}deg)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          {/* Steps */}
          <div>
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const Icon = step.icon;
                
                return (
                  <div
                    key={step.id}
                    className={`flex items-start gap-4 p-6 rounded-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                      isActive
                        ? "bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                        : "bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveStep(index)}
                    style={{
                      transform: isActive 
                        ? `translateZ(20px) scale(1.05) rotate(${(mousePosition.x - 0.5) * -5}deg)`
                        : `translateZ(0px)`,
                      transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                  >
                    <div className={`rounded-full p-3 ${step.color}`}>
                      <Icon size={24} className={isActive ? "animate-pulse-slow" : ""} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-xl mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-white/70">
                        {step.description}
                      </p>
                    </div>
                    
                    {/* Animated connection lines when active */}
                    {isActive && (
                      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute h-px bg-gradient-to-r from-pulse-purple/0 via-pulse-purple/80 to-pulse-purple/0"
                            style={{
                              top: `${20 + i * 15}%`,
                              left: 0,
                              right: 0,
                              transform: `translateX(${(Math.sin(Date.now() / 1000 + i) * 50)}%)`,
                              opacity: 0.6 - i * 0.1
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animated visualization */}
          <div className="relative">
            <div className="aspect-square max-w-md mx-auto bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/20 overflow-hidden">
              {/* Animated background gradient */}
              <div 
                className="absolute inset-0 bg-gradient-radial from-pulse-purple/40 to-transparent"
                style={{
                  transform: `scale(${1 + Math.sin(Date.now() / 2000) * 0.1})`,
                  opacity: 0.6 + Math.sin(Date.now() / 1500) * 0.2
                }}
              ></div>
              
              {/* Connection lines simulation */}
              <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-white/30 rounded-full"
                    style={{
                      width: '1px',
                      height: `${30 + Math.random() * 40}%`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      transform: `rotate(${Math.random() * 360}deg)`,
                      transformOrigin: 'bottom',
                      animation: `pulse-slow ${2 + Math.random() * 3}s infinite ${Math.random() * 2}s`
                    }}
                  ></div>
                ))}
              </div>
              
              {steps.map((step, index) => {
                const isActive = activeStep === index;
                const Icon = step.icon;
                
                return (
                  <div
                    key={step.id}
                    className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
                      isActive 
                        ? "opacity-100 transform-none" 
                        : "opacity-0 scale-90 rotate-3 blur-sm"
                    }`}
                    style={{
                      transform: isActive 
                        ? `translateZ(40px) rotateY(${Math.sin(Date.now() / 2000) * 10}deg)`
                        : 'translateZ(0) rotateY(0deg)',
                    }}
                  >
                    <div className="text-center">
                      <div 
                        className={`rounded-full p-6 ${step.color} mx-auto w-fit mb-6`}
                        style={{
                          boxShadow: `0 0 40px ${step.color === 'bg-pulse-purple' 
                            ? 'rgba(139, 92, 246, 0.4)' 
                            : step.color === 'bg-pulse-blue' 
                              ? 'rgba(147, 197, 253, 0.4)' 
                              : step.color === 'bg-pulse-coral' 
                                ? 'rgba(249, 115, 22, 0.4)' 
                                : 'rgba(94, 234, 212, 0.4)'
                          }`
                        }}
                      >
                        <Icon size={48} />
                      </div>
                      <h3 className="font-display font-bold text-2xl mb-3 text-white">
                        {step.title}
                      </h3>
                      <p className="text-white/80 max-w-xs mx-auto">
                        {step.description}
                      </p>
                      
                      {/* Animated connection dots */}
                      <div className="mt-8 flex justify-center gap-4">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="w-3 h-3 rounded-full bg-white/50"
                            style={{
                              animation: `pulse-slow ${1 + i * 0.2}s infinite ${i * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
