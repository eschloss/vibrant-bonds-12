import Footer from "@/components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { Seo } from "@/hooks/useSeo";

const SupportUs = () => {
  const { city_code } = useParams<{ city_code: string }>();
  const location = useLocation();
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const updateTimeoutRef = useRef<NodeJS.Timeout>();

  // Build the iframe source URL with city code and preserve query params
  const iframeSrc = useMemo(() => {
    const baseUrl = `https://api.kikiapp.eu/support-us?city=${city_code || ''}`;
    const queryParams = location.search;
    // If there are additional query params, append them with &
    if (queryParams && queryParams.length > 1) {
      // Remove the leading ? from location.search and append with &
      return `${baseUrl}&${queryParams.substring(1)}`;
    }
    return baseUrl;
  }, [city_code, location.search]);

  // Calculate actual visible viewport height (excludes browser chrome on mobile)
  useEffect(() => {
    const updateHeight = () => {
      // Clear any pending updates
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }

      // Use Visual Viewport API if available (more accurate for mobile browser chrome)
      // Otherwise fall back to window.innerHeight
      const height = (window as any).visualViewport 
        ? (window as any).visualViewport.height 
        : window.innerHeight;
      
      updateTimeoutRef.current = setTimeout(() => {
        setIframeHeight(`${height}px`);
      }, 100); // Small delay to debounce rapid changes
    };
    
    // Set initial height immediately
    const initialHeight = (window as any).visualViewport 
      ? (window as any).visualViewport.height 
      : window.innerHeight;
    setIframeHeight(`${initialHeight}px`);
    
    // Use Visual Viewport API if available (better for mobile browser chrome)
    if ((window as any).visualViewport) {
      (window as any).visualViewport.addEventListener('resize', updateHeight);
      (window as any).visualViewport.addEventListener('scroll', updateHeight);
    }
    
    // Fallback to window events
    window.addEventListener('resize', updateHeight);
    window.addEventListener('orientationchange', updateHeight);
    
    // Also listen for scroll events which can trigger browser chrome changes
    window.addEventListener('scroll', updateHeight, { passive: true });
    
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
      if ((window as any).visualViewport) {
        (window as any).visualViewport.removeEventListener('resize', updateHeight);
        (window as any).visualViewport.removeEventListener('scroll', updateHeight);
      }
      window.removeEventListener('resize', updateHeight);
      window.removeEventListener('orientationchange', updateHeight);
      window.removeEventListener('scroll', updateHeight);
    };
  }, []);

  // Ensure the page scrolls to top on mount in our scroll container layout
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Seo
        title={{
          en: "Support Us | Pulse",
          es: "Apóyanos | Pulse"
        }}
        description={{
          en: "Support Pulse to help keep the service running and make it better for the community",
          es: "Apoya a Pulse para ayudar a mantener el servicio funcionando y mejorarlo para la comunidad"
        }}
        pathname={`/support-us/${city_code || ''}`}
      />
      <div className="flex flex-col bg-white">
        <main className="w-full">
        <div className="w-full">
          <iframe
            src={iframeSrc}
            className="w-full"
            style={{ 
              border: "none",
              height: iframeHeight,
              minHeight: iframeHeight,
              // Use CSS dvh as fallback for initial render
              maxHeight: '100dvh'
            }}
            loading="eager"
            // Allow top-level navigation when triggered by a user (e.g., submit/cta)
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            title="Pulse Support Us"
          />
        </div>
        {/* Accessible fallback link in case embedding is blocked by headers */}
        <div className="sr-only">
          <a href={iframeSrc}>Open the support form directly</a>
        </div>
      </main>
      <Footer />
    </div>
    </>
  );
};

export default SupportUs;

