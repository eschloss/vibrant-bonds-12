
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-3 bg-black/40 backdrop-blur-xl border-b border-white/10" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display font-bold text-2xl text-white relative group"
        >
          <span 
            className="absolute -inset-1 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 bg-gradient-to-r from-pulse-purple to-pulse-coral"
          ></span>
          <Zap className="w-6 h-6 text-pulse-purple animate-pulse-slow" />
          <span className="pulse-gradient-text relative">Pulse</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, index) => (
            <Link 
              key={link.name}
              to={link.path} 
              className="relative py-2 text-white group"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <span className="relative z-10">{link.name}</span>
              <span 
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pulse-purple to-pulse-coral transform origin-left transition-all duration-300 ${
                  hoverIndex === index ? 'scale-x-100' : 'scale-x-0'
                }`}
              ></span>
              {hoverIndex === index && (
                <span className="absolute inset-0 -z-10 bg-white/10 rounded-lg blur-sm"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            to="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="relative group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pulse-coral to-pulse-pink rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse-slow"></span>
            <div className="relative flex items-center gap-2 px-6 py-3 bg-black/20 backdrop-blur-md rounded-full text-white font-medium border border-white/20 group-hover:bg-black/40 transition-all duration-300">
              <Download size={18} />
              <span>Download App</span>
            </div>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-white" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-xl pt-20">
          <nav className="flex flex-col items-center gap-8 p-8 h-full stagger-animation">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className="text-2xl font-medium text-white hover:text-pulse-purple transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pulse-coral to-pulse-pink rounded-full blur opacity-75 animate-pulse-slow"></span>
              <div className="relative flex items-center gap-2 px-6 py-3 bg-black/20 backdrop-blur-md rounded-full text-white font-medium border border-white/20">
                <Download size={18} />
                <span>Download App</span>
              </div>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
