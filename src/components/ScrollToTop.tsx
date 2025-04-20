import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const scrollArea = document.getElementById("scroll-content");
    if (scrollArea) {
      scrollArea.scrollTo({ top: 0, behavior: "auto" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.key]);

  return null;
};

export default ScrollToTop;
