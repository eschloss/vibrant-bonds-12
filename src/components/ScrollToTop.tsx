
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Force scroll to top with a slight delay to ensure DOM is ready
    setTimeout(() => {
      // Reset main window scroll
      window.scrollTo(0, 0);
      
      // Also reset any scroll areas if they exist
      const scrollAreas = document.querySelectorAll('[data-radix-scroll-area-viewport]');
      scrollAreas.forEach(area => {
        if (area instanceof HTMLElement) {
          area.scrollTop = 0;
        }
      });
    }, 0);
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
