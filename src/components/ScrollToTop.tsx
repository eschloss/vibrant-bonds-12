
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      // Scroll to top immediately when pathname changes
      window.scrollTo(0, 0);
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
