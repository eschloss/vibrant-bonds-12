
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
          ? "py-3 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm dark:shadow-purple-500/5" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 font-display font-bold text-2xl text-foreground"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-blue-400">Pulse</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-200 hover:text-purple-400 transition-colors">Home</Link>
          <Link to="/about" className="text-gray-200 hover:text-purple-400 transition-colors">About Us</Link>
          <Link to="/blog" className="text-gray-200 hover:text-purple-400 transition-colors">Blog</Link>
          <Link to="/contact" className="text-gray-200 hover:text-purple-400 transition-colors">Contact</Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link 
            to="https://apps.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30"
          >
            <Download size={18} />
            <span>Download App</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden flex items-center text-gray-200" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-gray-900 pt-20">
          <nav className="flex flex-col items-center gap-8 p-8 h-full stagger-animation">
            <Link 
              to="/" 
              className="text-2xl text-gray-200 font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
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
            <Link 
              to="https://apps.apple.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-purple-500/20"
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
