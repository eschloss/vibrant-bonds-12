import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  scrollRef: React.RefObject<HTMLDivElement>;
}

const ScrollToTop = ({ scrollRef }: ScrollToTopProps) => {
  const location = useLocation();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
