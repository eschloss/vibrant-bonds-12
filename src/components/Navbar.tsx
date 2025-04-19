
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMatchmakingPage = location.pathname === "/matchmaking";

  // Simple scroll handler similar to Communities page
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMenuOpen(false);
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      return false;
    }
    return true;
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "py-3 bg-gray-900/80 backdrop-blur-lg shadow-sm" 
        : "py-5 bg-transparent"
    )}>
      <div className="container mx-auto px-4 xl:max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl text-foreground">
          <img alt="Pulse Logo" className="h-5 md:h-6 object-fill" src="https://s.kikiapp.eu/img/pulse-logo-horizontal.png" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-white hover:text-purple-400 transition-colors font-medium"
          >
            Home
          </Link>
          
          <a 
            href="#how-it-works" 
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                scrollToSection('how-it-works');
              }
            }} 
            className="text-white hover:text-purple-400 transition-colors font-medium cursor-pointer"
          >
            How It Works
          </a>
          
          <Link 
            to="/communities" 
            className="text-white hover:text-purple-400 transition-colors font-medium"
          >
            For Communities
          </Link>
          
          <Link 
            to="/about" 
            className="text-white hover:text-purple-400 transition-colors font-medium"
          >
            About Us
          </Link>
          
          <Link 
            to="/contact" 
            className="text-white hover:text-purple-400 transition-colors font-medium"
          >
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
          className="lg:hidden text-white flex items-center" 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 pt-20 overflow-y-auto w-full">
          <nav className="flex flex-col items-center gap-8 p-8">
            <Link 
              to="/" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <a 
              href="#how-it-works" 
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  scrollToSection('how-it-works');
                }
                setIsMenuOpen(false);
              }} 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors cursor-pointer"
            >
              How it works
            </a>
            
            <Link 
              to="/communities" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              Communities
            </Link>
            
            <Link 
              to="/about" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" 
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
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
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" 
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </a>
            ) : (
              <Link 
                to="/matchmaking" 
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" 
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
