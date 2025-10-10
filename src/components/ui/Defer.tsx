import React, { useEffect, useRef, useState } from "react";

interface DeferProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number | number[];
}

const Defer: React.FC<DeferProps> = ({ children, rootMargin = "200px 0px", threshold = 0.01 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;
    const el = placeholderRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible, rootMargin, threshold]);

  if (isVisible) return <>{children}</>;
  return <div ref={placeholderRef} aria-hidden />;
};

export default Defer;


