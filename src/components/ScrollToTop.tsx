import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const prevPathRef = useRef<string>("");

  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      // Temporarily disable smooth scrolling
      const html = document.documentElement;
      const originalScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.style.scrollBehavior = originalScrollBehavior;
    }

    prevPathRef.current = pathname;
  }, [pathname]);

  return null;
};

export default ScrollToTop;
