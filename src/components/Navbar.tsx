import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMatchmakingPage = location.pathname === "/matchmaking";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = lastScrollY > 10;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const scrollToSection = (sectionId: string) => {
    if (!isHomePage) {
      localStorage.setItem('scrollToSection', sectionId);
      return true;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      setIsMenuOpen(false);
      
      requestAnimationFrame(() => {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
      
      return false;
    }
    return true;
  };

  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible will-change-transform", scrolled ? "py-3 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm dark:shadow-purple-500/5" : "py-5 bg-transparent")}>
      <div className="container mx-auto px-4 xl:max-w-7xl flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-2xl text-foreground">
          <img alt="Pulse Logo" className="h-5 md:h-6 object-fill" src="https://s.kikiapp.eu/img/pulse-logo-horizontal.png" />
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          <Link to="/" className={cn("hover:text-purple-400 transition-colors font-medium", scrolled ? "text-gray-200" : isHomePage ? "text-gray-800" : "text-white")}>Home</Link>
          
          {isHomePage ? <a href="#how-it-works" onClick={e => !scrollToSection('how-it-works') && e.preventDefault()} className={cn("hover:text-purple-400 transition-colors font-medium cursor-pointer", scrolled ? "text-gray-200" : "text-gray-800")}>How It Works</a> : <Link to="/#how-it-works" className={cn("hover:text-purple-400 transition-colors font-medium", scrolled ? "text-gray-200" : "text-white")}>
              How it works
            </Link>}
          
          <Link to="/communities" className={cn("hover:text-purple-400 transition-colors font-medium", scrolled ? "text-gray-200" : isHomePage ? "text-gray-800" : "text-white")}>
            For Communities
          </Link>
          
          <Link to="/about" className={cn("hover:text-purple-400 transition-colors font-medium", scrolled ? "text-gray-200" : isHomePage ? "text-gray-800" : "text-white")}>
            About Us
          </Link>
          
          <Link to="/contact" className={cn("hover:text-purple-400 transition-colors font-medium", scrolled ? "text-gray-200" : isHomePage ? "text-gray-800" : "text-white")}>
            Contact
          </Link>
        </nav>

        <div className="hidden lg:block">
          {isMatchmakingPage ? <a href="https://482tykjn26x.typeform.com/pulse#city=" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium">
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </a> : <Link to="/matchmaking" className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium">
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </Link>}
        </div>

        <button className={cn("lg:hidden flex items-center", scrolled ? "text-gray-200" : isHomePage ? "text-gray-800" : "text-white")} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && <div className="lg:hidden fixed inset-0 z-40 bg-gray-900 pt-20 overflow-y-auto overflow-x-hidden w-full">
          <nav className="flex flex-col items-center gap-8 p-8 stagger-animation">
            <Link to="/" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            
            {isHomePage ? <a href="#how-it-works" onClick={e => {
          const result = !scrollToSection('how-it-works');
          if (result) e.preventDefault();
        }} className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors cursor-pointer">
                How it works
              </a> : <Link to="/#how-it-works" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
                How it works
              </Link>}
            
            <Link to="/communities" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Communities
            </Link>
            <Link to="/cities" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Cities
            </Link>
            <Link to="/about" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/blog" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Blog
            </Link>
            <Link to="/contact" className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            {isMatchmakingPage ? <a href="https://482tykjn26x.typeform.com/pulse#city=" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" onClick={() => setIsMenuOpen(false)}>
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </a> : <Link to="/matchmaking" className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20 font-medium" onClick={() => setIsMenuOpen(false)}>
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </Link>}
          </nav>
        </div>}
    </header>;
};

export default Navbar;
