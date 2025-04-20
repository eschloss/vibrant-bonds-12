
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

interface MobileNavLinksProps {
  closeMenu: () => void;
  scrollToSection: (sectionId: string) => boolean;
  isMatchmakingPage: boolean;
}

const labels = [
  "Home",
  "Communities",
  "Cities",
  "About Us",
  "Blog",
  "Contact"
];

const MobileNavLinks = ({
  closeMenu,
  scrollToSection,
  isMatchmakingPage
}: MobileNavLinksProps) => (
  <nav className="flex flex-col items-center gap-8 p-8 h-full overflow-y-auto overflow-x-hidden">
    {labels.map((label) => (
      <Link
        key={label}
        to={`/${label.toLowerCase().replace(/\s+/g, "")}`}
        className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
        onClick={closeMenu}
      >
        {label}
      </Link>
    ))}
    <Link
      to="/#how-it-works"
      className="text-2xl font-medium transition-colors duration-300 ease-in-out hover:text-[#FF2688]"
      onClick={() => {
        scrollToSection("how-it-works");
        closeMenu();
      }}
    >
      How it works
    </Link>
    {isMatchmakingPage ? (
      <a
        href="https://482tykjn26x.typeform.com/pulse#city="
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
        onClick={closeMenu}
      >
        <UserPlus size={18} />
        <span>Meet Your Crew</span>
      </a>
    ) : (
      <Link
        to="/matchmaking"
        className="bg-gradient-to-r from-[#FF2688] via-[#741ADD] to-[#38D1BF] text-white px-6 py-3 rounded-full flex items-center gap-2 mt-4 shadow-lg shadow-[#FF2688]/20 font-medium"
        onClick={closeMenu}
      >
        <UserPlus size={18} />
        <span>Meet Your Crew</span>
      </Link>
    )}
  </nav>
);

export default MobileNavLinks;
