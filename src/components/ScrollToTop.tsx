
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      // Using requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant" // Using instant instead of smooth to prevent performance issues
        });
      });
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
