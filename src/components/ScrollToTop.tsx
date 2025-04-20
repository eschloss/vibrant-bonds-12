
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Immediately scroll to top when location changes
    window.scrollTo(0, 0);
  }, [location.pathname]); // Change from location.key to location.pathname for more reliability

  return null;
};

export default ScrollToTop;
