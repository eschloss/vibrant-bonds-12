import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollArea = document.getElementById("pulse-scroll-area");

    if (scrollArea) {
      scrollArea.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key]);

  return null;
};

export default ScrollToTop;
