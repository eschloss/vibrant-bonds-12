import React, { useEffect, useRef, useState } from "react";

type ViewportProps = {
  children: React.ReactNode;
  /**
   * Root margin for IntersectionObserver, e.g. "200px 0px"
   */
  rootMargin?: string;
  /**
   * Threshold for IntersectionObserver, 0..1
   */
  threshold?: number;
  /**
   * If true, renders immediately without observing (SSR/prerender safety)
   */
  fallbackRender?: boolean;
};

/**
 * Viewport renders children only after the wrapper has entered the viewport.
 * Useful to defer mounting heavy, below-the-fold components.
 */
const Viewport: React.FC<ViewportProps> = ({
  children,
  rootMargin = "200px 0px",
  threshold = 0,
  fallbackRender = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(fallbackRender);

  useEffect(() => {
    if (isVisible) return;
    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      // No IO support (or during prerender) - render immediately
      setIsVisible(true);
      return;
    }
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isVisible, rootMargin, threshold]);

  return <div ref={containerRef}>{isVisible ? children : null}</div>;
};

export default Viewport;


