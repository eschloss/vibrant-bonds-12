import { Link, useLocation } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface MobileNavLinksProps {
  closeMenu: () => void;
  scrollToSection: (sectionId: string) => boolean;
  isMatchmakingPage: boolean;
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "For Communities", href: "/communities" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const MobileNavLinks = ({
  closeMenu,
  scrollToSection,
  isMatchmakingPage,
}: MobileNavLinksProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/" || /^\/cities\/[^/]+$/.test(location.pathname);

  return (
    <nav className="flex flex-col items-center gap-8 p-8 h-full overflow-y-auto overflow-x-hidden">
      {navLinks.map(({ label, href }) => {
        const isHashLink = href.includes("#");
        const scrollTarget = href.replace(/^.*#/, "");

        if (isHashLink) {
          if (isHomePage) {
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(scrollTarget);
                  closeMenu();
                }}
                className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
              >
                {label}
              </a>
            );
          } else {
            return (
              <Link
                key={label}
                to={href}
                onClick={() => {
                  scrollToSection(scrollTarget);
                  closeMenu();
                }}
                className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
              >
                {label}
              </Link>
            );
          }
        }

        return (
          <Link
            key={label}
            to={href}
            className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
            onClick={closeMenu}
          >
            {label}
          </Link>
        );
      })}

      {isMatchmakingPage ? (
        <Link
          to="/cities"
          className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
          onClick={closeMenu}
        >
          <span>See More Cities</span>
        </Link>
      ) : (
        <Link
          to="/cities"
          className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
          onClick={closeMenu}
        >
          <span>Meet Your Crew</span>
        </Link>
      )}
    </nav>
  );
};

export default MobileNavLinks;
