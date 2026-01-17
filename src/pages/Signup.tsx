import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Seo } from "@/hooks/useSeo";

const Signup = () => {
  // const [iframeHeight, setIframeHeight] = useState('100vh');
  // const updateTimeoutRef = useRef<NodeJS.Timeout>();

  // Preserve all existing query params to pass through to the embedded form
  // const iframeSrc = useMemo(() => {
  //   return `https://form.pulsenow.app${location.search || ""}`;
  // }, [location.search]);

  // Calculate actual visible viewport height (excludes browser chrome on mobile)
  // useEffect(() => {
  //   const updateHeight = () => {
  //     // Clear any pending updates
  //     if (updateTimeoutRef.current) {
  //       clearTimeout(updateTimeoutRef.current);
  //     }

  //     // Use Visual Viewport API if available (more accurate for mobile browser chrome)
  //     // Otherwise fall back to window.innerHeight
  //     const height = (window as any).visualViewport 
  //       ? (window as any).visualViewport.height 
  //       : window.innerHeight;
      
  //     updateTimeoutRef.current = setTimeout(() => {
  //       setIframeHeight(`${height}px`);
  //     }, 100); // Small delay to debounce rapid changes
  //   };
    
  //   // Set initial height immediately
  //   const initialHeight = (window as any).visualViewport 
  //     ? (window as any).visualViewport.height 
  //     : window.innerHeight;
  //   setIframeHeight(`${initialHeight}px`);
    
  //   // Use Visual Viewport API if available (better for mobile browser chrome)
  //   if ((window as any).visualViewport) {
  //     (window as any).visualViewport.addEventListener('resize', updateHeight);
  //     (window as any).visualViewport.addEventListener('scroll', updateHeight);
  //   }
    
  //   // Fallback to window events
  //   window.addEventListener('resize', updateHeight);
  //   window.addEventListener('orientationchange', updateHeight);
    
  //   // Also listen for scroll events which can trigger browser chrome changes
  //   window.addEventListener('scroll', updateHeight, { passive: true });
    
  //   return () => {
  //     if (updateTimeoutRef.current) {
  //       clearTimeout(updateTimeoutRef.current);
  //     }
  //     if ((window as any).visualViewport) {
  //       (window as any).visualViewport.removeEventListener('resize', updateHeight);
  //       (window as any).visualViewport.removeEventListener('scroll', updateHeight);
  //     }
  //     window.removeEventListener('resize', updateHeight);
  //     window.removeEventListener('orientationchange', updateHeight);
  //     window.removeEventListener('scroll', updateHeight);
  //   };
  // }, []);

  // Load Typeform embed script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector('script[src="//embed.typeform.com/next/embed.js"]');
      if (existingScript) {
        existingScript.remove();
      }
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
          en: "Sign Up | Pulse",
          es: "Regístrate | Pulse"
        }}
        description={{
          en: "Join Pulse to meet like-minded people and plan real-life meetups",
          es: "Únete a Pulse para conocer personas afines y planificar encuentros reales"
        }}
        pathname="/signup"
      />
      <div className="flex flex-col bg-white">
        <main className="w-full">
        <div className="w-full">
          {/* Typeform embed */}
          <div data-tf-live="01KF6GH6SFRY4N13DWFPB373NA"></div>

          {/* Commented out webframe code - in case we want to put it back in */}
          {/* <iframe
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
            title="Pulse Signup"
          /> */}
        </div>
        {/* Accessible fallback link in case embedding is blocked by headers */}
        {/* <div className="sr-only">
          <a href={iframeSrc}>Open the signup form directly</a>
        </div> */}
      </main>
      <Footer />
    </div>
    </>
  );
};

export default Signup;


