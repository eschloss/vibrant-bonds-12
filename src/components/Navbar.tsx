
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMatchmakingPage = location.pathname === "/matchmaking";
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

  // Sets the correct color for background/text—no scroll logic anymore
  return (
    <>
      <header
        className={cn(
          // Always dark blurred glass, "Gunmetal Black" with opacity, white text
          "fixed top-0 left-0 right-0 z-[9999] w-full bg-[#15191C]/90 text-white shadow-md backdrop-blur-md backdrop-saturate-150 backdrop-contrast-125 transition-colors py-4"
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
                className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all"
              >
                {label}
              </Link>
            ))}

            {isHomePage ? (
              <a
                href="#how-it-works"
                className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all cursor-pointer"
              >
                How It Works
              </a>
            ) : (
              <Link
                to="/#how-it-works"
                className="transition-colors duration-300 ease-in-out hover:text-[#FF2688] font-medium relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 hover:after:w-full after:bg-[#FF2688] after:transition-all"
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
                className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] hover:from-[#38D1BF] hover:via-[#741ADD] hover:to-[#FF2688] px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
              >
                <UserPlus size={18} />
                <span>Meet Your Crew</span>
              </a>
            ) : (
              <Link
                to="/matchmaking"
                className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] hover:from-[#38D1BF] hover:via-[#741ADD] hover:to-[#FF2688] px-6 py-3 rounded-full flex items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
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
          "lg:hidden fixed inset-0 z-40 bg-[#15191C] pt-20 w-full max-w-[100vw] transform transition-all duration-300 ease-in-out text-white",
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
              className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
              onClick={() => setIsMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/#how-it-works"
            className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
            onClick={() => setIsMenuOpen(false)}
          >
            How it works
          </Link>
          {isMatchmakingPage ? (
            <a
              href="https://482tykjn26x.typeform.com/pulse#city="
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              <UserPlus size={18} />
              <span>Meet Your Crew</span>
            </a>
          ) : (
            <Link
              to="/matchmaking"
              className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
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
