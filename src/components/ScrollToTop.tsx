
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      // Scroll to top immediately when pathname changes
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
    
    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
