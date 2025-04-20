
import { Menu, X } from "lucide-react";

interface MenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => (
  <button
    className="lg:hidden flex items-center transition-colors duration-300 ease-in-out"
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}
  >
    {isOpen ? <X size={24} /> : <Menu size={24} />}
  </button>
);

export default MenuButton;
