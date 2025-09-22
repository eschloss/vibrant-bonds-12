
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import MenuButton from "./MenuButton";
import MobileNavLinks from "./MobileNavLinks";
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";
import { useRefParam } from "@/hooks/useRefParam";

// --- Navigation Link List (for desktop and mobile reuse) ---
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMatchmakingPage = location.pathname.includes("cities/") || location.pathname.includes("matchmaking");
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();

  // Translated nav links
  const navLinks = [
    { label: t("navbar.how_it_works", "How it works"), href: addRefToUrl("/#how-it-works") },
    { label: t("navbar.activities", "Adventures"), href: addRefToUrl("/activities") },
    { label: t("navbar.partnerships", "Partnerships"), href: addRefToUrl("/partners") },
    { label: t("navbar.meet_pip", "Meet Pip"), href: addRefToUrl("/meet-pip") },
    { label: t("navbar.contact", "Contact"), href: addRefToUrl("/contact") },
  ];

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
            ? "bg-[#15191C]/70 shadow-md opacity-100 translate-y-0 py-3 text-white"
            : "bg-transparent opacity-90 translate-y-1 py-5",
          (isHomePage || isMatchmakingPage) && !scrolled ? "text-[#15191C]" : "text-white"
        )}
      >
        <div className="container mx-auto px-4 xl:max-w-7xl flex items-left justify-between">
          <Link
            to={addRefToUrl("/")}
            className="flex items-center gap-2 font-display font-bold text-2xl transition-colors duration-300 ease-in-out"
          >
            <div className="relative h-6 w-32">
              <img
                alt="Pulse Logo"
                src="https://s.kikiapp.eu/img/pulse-text.png"
                className={`absolute top-0 left-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
                  scrolled ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <img
                alt="Pulse Logo"
                src="https://s.kikiapp.eu/img/logo_pulse2.png"
                className={`absolute top-0 left-0 h-full w-full object-contain object-left transition-opacity duration-300 ${
                  scrolled ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

          </Link>
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map(({ label, href }) => {
              const isHashLink = href.includes("#");

              if (isHashLink) {
                if (isHomePage) {
                  return (
                    <a
                      key={label}
                      href={href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(href.replace(/^.*#/, ""));
                      }}
                      className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all cursor-pointer"
                    >
                      {label}
                    </a>
                  ); 
                }

                return (
                <Link
                  key={label}
                  to={href}
                  onClick={(e) => {
                        //e.preventDefault();
                        scrollToSection(href.replace(/^.*#/, ""));
                  }}
                  className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all"
                >
                  {label}
                </Link>
              );
                
              }

              return (
                <Link
                  key={label}
                  to={href}
                  className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all"
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            {isMatchmakingPage ? (
              <Link
                to={addRefToUrl("/cities")}
                className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
              >
                <span>{t("navbar.see_more_cities", "See More Cities")}</span>
              </Link>
            ) : (
              <Link
                to={addRefToUrl("/cities")}
                className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
              >
                <span>{t("navbar.meet_your_crew", "Meet Your Crew")}</span>
              </Link>
            )}
          </div>
          <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
        </div>
      </header>
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-[#15191C] pt-20 w-full max-w-[100vw] transform transition-all duration-300 ease-in-out text-white",
          isMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <MobileNavLinks
          closeMenu={() => setIsMenuOpen(false)}
          scrollToSection={scrollToSection}
          isMatchmakingPage={isMatchmakingPage}
        />
      </div>
    </>
  );
};

export default Navbar;
