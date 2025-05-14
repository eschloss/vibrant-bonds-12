
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import Text from "@/components/Text";

interface MobileNavLinksProps {
  closeMenu: () => void;
  scrollToSection: (id: string) => boolean;
  isMatchmakingPage: boolean;
}

const MobileNavLinks = ({ closeMenu, scrollToSection, isMatchmakingPage }: MobileNavLinksProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useTranslation();

  // Translated nav links
  const navLinks = [
    { label: t("navbar.home", "Home"), href: "/" },
    { label: t("navbar.how_it_works", "How it works"), href: "/#how-it-works" },
    { label: t("navbar.communities", "For Communities"), href: "/communities" },
    { label: t("navbar.about", "About Us"), href: "/about" },
    { label: t("navbar.contact", "Contact"), href: "/contact" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {navLinks.map(({ label, href }, idx) => {
          const isHashLink = href.includes("#");

          if (isHashLink && isHomePage) {
            return (
              <a
                key={idx}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  const sectionId = href.replace(/^.*#/, "");
                  scrollToSection(sectionId);
                }}
                className="text-xl font-semibold hover:text-pulse-pink"
              >
                {label}
              </a>
            );
          }

          return (
            <Link
              key={idx}
              to={href}
              onClick={() => {
                closeMenu();
                if (isHashLink) {
                  const sectionId = href.replace(/^.*#/, "");
                  scrollToSection(sectionId);
                }
              }}
              className="text-xl font-semibold hover:text-pulse-pink"
            >
              {label}
            </Link>
          );
        })}

        <div className="pt-6">
          {isMatchmakingPage ? (
            <Link
              to="/cities"
              onClick={closeMenu}
              className="inline-flex bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
            >
              <span>{t("navbar.see_more_cities", "See More Cities")}</span>
            </Link>
          ) : (
            <Link
              to="/cities"
              onClick={closeMenu}
              className="inline-flex bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white"
            >
              <span>{t("navbar.meet_your_crew", "Meet Your Crew")}</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileNavLinks;
