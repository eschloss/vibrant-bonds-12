import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMatchmakingPage = location.pathname === "/matchmaking";
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      
      // Add or remove has-scrolled class to body element
      if (isScrolled) {
        document.body.classList.add('has-scrolled');
      } else {
        document.body.classList.remove('has-scrolled');
      }
    };
    
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove('has-scrolled');
    };
  }, []);

  useEffect(() => {
    const sectionId = localStorage.getItem('scrollToSection');
    if (sectionId) {
      localStorage.removeItem('scrollToSection');
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      localStorage.setItem('scrollToSection', sectionId);
      return true;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      return false;
    }
    return true;
  };

  const getTextColor = () => {
    if (!isHomePage) return "text-gray-200";
    return scrolled ? "text-gray-200" : "text-gray-800";
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full max-w-[100vw] overflow-x-visible",
      scrolled 
        ? "py-3 bg-gray-900/80 backdrop-blur-lg shadow-sm dark:shadow-purple-500/5" 
        : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 xl:max-w-7xl flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl text-foreground">
          <img alt="Pulse Logo" className="h-5 md:h-6 object-fill" src="https://s.kikiapp.eu/img/pulse-logo-horizontal.png" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className={cn(
            "hover:text-purple-400 transition-colors font-medium dark-on-scroll",
            getTextColor()
          )}>Home</Link>
          
          {location.pathname === "/" ? (
            <a 
              href="#how-it-works" 
              onClick={e => !scrollToSection('how-it-works') && e.preventDefault()} 
              className={cn(
                "hover:text-purple-400 transition-colors font-medium cursor-pointer",
                getTextColor()
              )}
            >
              How It Works
            </a>
          ) : (
            <Link 
              to="/#how-it-works" 
              onClick={() => scrollToSection('how-it-works')}
              className={cn(
                "hover:text-purple-400 transition-colors font-medium",
                getTextColor()
              )}
            >
              How it works
            </Link>
          )}
          
          <Link to="/communities" className={cn(
            "hover:text-purple-400 transition-colors font-medium",
            getTextColor()
          )}>
            For Communities
          </Link>
          
          <Link to="/about" className={cn(
            "hover:text-purple-400 transition-colors font-medium",
            getTextColor()
          )}>
            About Us
          </Link>
          
          <Link to="/contact" className={cn(
            "hover:text-purple-400 transition-colors font-medium dark-on-scroll",
            getTextColor()
          )}>
            Contact
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:block">
          {isMatchmakingPage ? (
            <a 
              href="https://482tykjn26x.typeform.com/pulse#city=" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium"
            >
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </a>
          ) : (
            <Link 
              to="/matchmaking" 
              className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium"
            >
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={cn(
            "lg:hidden flex items-center mr-0 dark-on-scroll",
            getTextColor()
          )} 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 pt-20 w-full max-w-[100vw]">
          <nav className="flex flex-col items-center gap-8 p-8 h-full stagger-animation overflow-y-auto overflow-x-hidden">
            <Link 
              to="/" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {isHomePage ? (
              <a 
                href="#how-it-works" 
                onClick={e => {
                  const result = !scrollToSection('how-it-works');
                  if (result) e.preventDefault();
                }} 
                className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors cursor-pointer"
              >
                How it works
              </a>
            ) : (
              <Link 
                to="/#how-it-works" 
                className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
                onClick={() => {
                  scrollToSection('how-it-works');
                  setIsMenuOpen(false);
                }}
              >
                How it works
              </Link>
            )}
            
            <Link 
              to="/communities" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Communities
            </Link>
            <Link 
              to="/cities" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Cities
            </Link>
            <Link 
              to="/about" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/blog" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            {isMatchmakingPage ? (
              <a 
                href="https://482tykjn26x.typeform.com/pulse#city=" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </a>
            ) : (
              <Link 
                to="/matchmaking" 
                className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
