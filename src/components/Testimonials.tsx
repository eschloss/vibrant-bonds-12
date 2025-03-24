
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Pulse has completely changed my social life. I've made three close friends in just a month!",
    name: "Alex K.",
    location: "San Francisco",
    avatar: "https://i.pravatar.cc/100?img=11",
    rating: 5,
  },
  {
    id: 2,
    quote: "Moving to a new city was intimidating, but Pulse made it so easy to find my kind of people.",
    name: "Jamie T.",
    location: "New York City",
    avatar: "https://i.pravatar.cc/100?img=5",
    rating: 5,
  },
  {
    id: 3,
    quote: "I love how natural the connections feel. These aren't just app friends—we hang out all the time!",
    name: "Morgan L.",
    location: "Los Angeles",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
  },
  {
    id: 4,
    quote: "The app suggested someone who's now my best friend. We even started a book club together!",
    name: "Taylor R.",
    location: "Portland",
    avatar: "https://i.pravatar.cc/100?img=28",
    rating: 5,
  },
  {
    id: 5,
    quote: "As an introvert, making friends has always been hard. Pulse somehow made it feel effortless.",
    name: "Jordan P.",
    location: "Austin",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        goToNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isInView, activeIndex]);

  const goToPrev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToNext = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-blue/20 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">
            What <span className="pulse-gradient-text">People Say</span>
          </h2>
          <p className="paragraph">
            Real stories from Pulse users who've found meaningful friendships through our app.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div 
            ref={containerRef} 
            className="overflow-hidden"
          >
            <div className="relative h-[400px] md:h-[300px]">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ${
                    index === activeIndex
                      ? "opacity-100 translate-x-0"
                      : index < activeIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                  }`}
                >
                  <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={20}
                              className="fill-pulse-coral text-pulse-coral"
                            />
                          ))}
                        </div>
                        <blockquote className="text-xl md:text-2xl font-medium mb-6 text-balance">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${testimonial.avatar})` }}
                        ></div>
                        <div>
                          <h4 className="font-bold">{testimonial.name}</h4>
                          <p className="text-sm text-foreground/70">{testimonial.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={goToPrev}
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-foreground" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAnimating && setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-pulse-purple scale-125"
                      : "bg-pulse-purple/30 hover:bg-pulse-purple/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button
              onClick={goToNext}
              disabled={isAnimating}
              className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-foreground" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
