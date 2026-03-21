
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { useRefParam } from "@/hooks/useRefParam";
import type { EventHeaderContextValue } from "@/contexts/EventHeaderContext";

interface MobileNavLinksProps {
  closeMenu: () => void;
  scrollToSection: (id: string) => boolean;
  showSeeMoreCitiesCta: boolean;
  /** When true, hide Meet Your Crew / See More Cities gradient CTA (e.g. on /events routes). */
  hidePrimaryCta?: boolean;
  eventHeader?: EventHeaderContextValue | null;
  /** Defaults to /how-it-works; Navbar passes /events/how-it-works on event routes. */
  howItWorksHref?: string;
}

const MobileNavLinks = ({
  closeMenu,
  scrollToSection,
  showSeeMoreCitiesCta,
  hidePrimaryCta,
  eventHeader,
  howItWorksHref: howItWorksHrefProp,
}: MobileNavLinksProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { t } = useTranslation();
  const { addRefToUrl } = useRefParam();
  const howItWorksHref = howItWorksHrefProp ?? addRefToUrl("/how-it-works");

  // Translated nav links
  const navLinks = [
    { label: t("navbar.home", "Home"), href: addRefToUrl("/") },
    { label: t("navbar.how_it_works", "How it works"), href: howItWorksHref },
    { label: t("navbar.activities", "Adventures"), href: addRefToUrl("/activities") },
    { label: t("navbar.meet_pip", "Meet Pip"), href: addRefToUrl("/meet-pip") },
    { label: t("navbar.about", "About Us"), href: addRefToUrl("/about") },
    { label: t("navbar.contact", "Contact"), href: addRefToUrl("/contact") },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {eventHeader?.backToCityEvents ? (
          <Link
            to={addRefToUrl(eventHeader.backToCityEvents.href)}
            onClick={closeMenu}
            className="inline-flex items-center gap-2 text-lg font-semibold text-white/90 hover:text-pulse-pink"
          >
            <ChevronLeft className="h-5 w-5 shrink-0" aria-hidden />
            {t("navbar.see_all_city_events", "See all {city} events").replace(
              "{city}",
              eventHeader.backToCityEvents.label
            )}
          </Link>
        ) : null}
        {navLinks.map(({ label, href }, idx) => (
          <Link
            key={idx}
            to={href}
            onClick={() => closeMenu()}
            className="text-xl font-semibold hover:text-pulse-pink"
          >
            {label}
          </Link>
        ))}

        <div className="pt-6">
          {showSeeMoreCitiesCta ? (
            <Link
              to={addRefToUrl("/cities")}
              onClick={hidePrimaryCta ? undefined : closeMenu}
              className={cn(
                "inline-flex bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white",
                hidePrimaryCta && "invisible pointer-events-none"
              )}
              tabIndex={hidePrimaryCta ? -1 : undefined}
              aria-hidden={hidePrimaryCta ? true : undefined}
            >
              <span>{t("navbar.see_more_cities", "See More Cities")}</span>
            </Link>
          ) : (
            <Link
              to={addRefToUrl("/cities")}
              onClick={hidePrimaryCta ? undefined : closeMenu}
              className={cn(
                "inline-flex bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] px-6 py-3 rounded-full items-center gap-2 shadow-lg shadow-[#FF2688]/20 transition-all duration-300 hover:shadow-[#FF2688]/30 font-medium text-white",
                hidePrimaryCta && "invisible pointer-events-none"
              )}
              tabIndex={hidePrimaryCta ? -1 : undefined}
              aria-hidden={hidePrimaryCta ? true : undefined}
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
