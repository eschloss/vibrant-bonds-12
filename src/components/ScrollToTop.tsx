
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");
  const scrollingRef = useRef<boolean>(false);

  useEffect(() => {
    if (prevPathRef.current !== pathname && !scrollingRef.current) {
      scrollingRef.current = true;
      
      // Use requestAnimationFrame for smoother scrolling
      requestAnimationFrame(() => {
        // Reset scroll position with instant behavior to avoid smooth scroll conflicts
        window.scrollTo({
          top: 0,
          behavior: "auto" // Using 'auto' instead of 'instant' for better browser compatibility
        });
        
        // Reset scrolling flag after a very short delay
        setTimeout(() => {
          scrollingRef.current = false;
        }, 50);
      });
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
