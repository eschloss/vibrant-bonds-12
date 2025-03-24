
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-sm" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display font-bold text-2xl text-foreground"
        >
          <span className="text-pulse-purple">Pulse</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="link">Home</Link>
          <Link to="/about" className="link">About Us</Link>
          <Link to="/blog" className="link">Blog</Link>
          <Link to="/contact" className="link">Contact</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            to="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="button-secondary flex items-center gap-2"
          >
            <Download size={18} />
            <span>Download App</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-foreground" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background pt-20">
          <nav className="flex flex-col items-center gap-8 p-8 h-full stagger-animation">
            <Link 
              to="/" 
              className="text-2xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-2xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/blog" 
              className="text-2xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className="text-2xl font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="button-secondary flex items-center gap-2 mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <Download size={18} />
              <span>Download App</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
