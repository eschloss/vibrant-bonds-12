
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");
  const scrollingRef = useRef<boolean>(false);

  useEffect(() => {
    if (prevPathRef.current !== pathname && !scrollingRef.current) {
      scrollingRef.current = true;
      
      // Delay scroll to top slightly to ensure DOM is ready
      setTimeout(() => {
        // Using requestAnimationFrame for smoother performance
        requestAnimationFrame(() => {
          // First reset any ongoing smooth scroll
          window.scrollTo({
            top: 0,
            behavior: "instant"
          });
          
          // Then reset scroll flag
          scrollingRef.current = false;
        });
      }, 10);
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
