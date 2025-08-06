import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useTheme } from "@/contexts/ThemeContext";
import LanguageSelector from "./LanguageSelector";
import Text from "@/components/Text";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigationItems = [
    { id: "nav.home", to: "/", label: t("nav.home", "Home") },
    { id: "nav.cities", to: "/cities", label: t("nav.cities", "Cities") },
    { id: "nav.communities", to: "/communities", label: t("nav.communities", "Communities") },
    { id: "nav.meet_pip", to: "/meet-pip", label: t("nav.meet_pip", "Meet Pip") },
    { id: "nav.about", to: "/about", label: t("nav.about", "About") },
  ];

  return (
    <motion.nav
      className="bg-gray-900 dark:bg-gray-950 text-white fixed top-0 left-0 right-0 z-50 border-b border-white/5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold">
          <img
            alt="Pulse Logo"
            className="h-10 md:h-12 object-contain mr-2"
            src="https://s.kikiapp.eu/img/pulse_logo.png"
          />
        </Link>

        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            <Text id="nav.home">Home</Text>
          </Link>
          <Link to="/cities" className="text-white/80 hover:text-white transition-colors">
            <Text id="nav.cities">Cities</Text>
          </Link>
          <Link to="/communities" className="text-white/80 hover:text-white transition-colors">
            <Text id="nav.communities">Communities</Text>
          </Link>
          <Link to="/meet-pip" className="text-white/80 hover:text-white transition-colors">
            <Text id="nav.meet_pip">Meet Pip</Text>
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            <Text id="nav.about">About</Text>
          </Link>
          
          <button
            onClick={toggleTheme}
            className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-800/50"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <LanguageSelector variant="dark" />
        </div>

        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className={`lg:hidden fixed top-0 right-0 w-64 h-full bg-gray-900 dark:bg-gray-950 text-white shadow-xl transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-end">
            <button onClick={toggleMenu} className="text-white hover:text-gray-300 focus:outline-none">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 py-2 flex flex-col space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                className="block py-2 text-white/80 hover:text-white transition-colors border-b border-white/10"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="flex items-center space-x-2 py-2 text-white/80 hover:text-white transition-colors border-b border-white/10"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
            </button>
            <div className="pt-2">
              <LanguageSelector variant="dark" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
