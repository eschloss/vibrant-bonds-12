import { useState, useEffect, useRef } from "react";
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
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionId = localStorage.getItem("scrollToSection");
    if (sectionId) {
      localStorage.removeItem("scrollToSection");
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location]);

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      localStorage.setItem("scrollToSection", sectionId);
      return true;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      return false;
    }
    return true;
  };

  return (
    <>
      <div ref={sentinelRef} className="h-1 w-full" />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[9999] w-full transform transition-all duration-500 ease-out backdrop-blur-md backdrop-saturate-150 backdrop-contrast-125 transition-colors",
          scrolled
            ? "bg-black/70 shadow-md opacity-100 translate-y-0 py-3 text-white"
            : "bg-transparent opacity-90 translate-y-1 py-5",
          isHomePage && !scrolled ? "text-black" : "text-white"
        )}
      >
        <div className="container mx-auto px-4 xl:max-w-7xl flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-2xl transition-colors duration-300 ease-in-out"
          >
            <img
              alt="Pulse Logo"
              className="h-5 md:h-6 object-fill"
              src="https://s.kikiapp.eu/img/pulse-logo-horizontal.png"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {[
              { label: "Home", href: "/" },
              { label: "For Communities", href: "/communities" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" }
            ].map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                className="transition-colors duration-300 ease-in-out hover:text-purple-400 font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all"
              >
                {label}
              </Link>
            ))}

            {isHomePage ? (
              <a
                href="#how-it-works"
                onClick={(e) => !scrollToSection("how-it-works") && e.preventDefault()}
                className="transition-colors duration-300 ease-in-out hover:text-purple-400 font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all cursor-pointer"
              >
                How It Works
              </a>
            ) : (
              <Link
                to="/#how-it-works"
                onClick={() => scrollToSection("how-it-works")}
                className="transition-colors duration-300 ease-in-out hover:text-purple-400 font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-purple-400 after:transition-all"
              >
                How it works
              </Link>
            )}
          </nav>

          <div className="hidden lg:block">
            {isMatchmakingPage ? (
              <a
                href="https://482tykjn26x.typeform.com/pulse#city="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-white"
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </a>
            ) : (
              <Link
                to="/matchmaking"
                className="bg-gradient-to-r from-pulse-coral via-pulse-purple to-pulse-blue hover:from-pulse-blue hover:via-pulse-purple hover:to-pulse-coral px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/30 font-medium text-white"
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </Link>
            )}
          </div>

          <button
            className="lg:hidden flex items-center transition-colors duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-gray-900 pt-20 w-full max-w-[100vw] transform transition-all duration-300 ease-in-out text-white",
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8 p-8 h-full overflow-y-auto overflow-x-hidden">
          {["Home", "Communities", "Cities", "About Us", "Blog", "Contact"].map((label) => (
            <Link
              key={label}
              to={`/${label.toLowerCase().replace(/\s+/g, "")}`}
              className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-purple-400"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/#how-it-works"
            className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-purple-400"
            onClick={() => {
              scrollToSection("how-it-works");
              setIsMenuOpen(false);
            }}
          >
            How it works
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
    </>
  );
};

export default Navbar;
