import Footer from "@/components/Footer";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Seo } from "@/hooks/useSeo";

const SupportUs = () => {
  const { city_code } = useParams<{ city_code: string }>();
  const location = useLocation();
  const [iframeHeight, setIframeHeight] = useState('100vh');
  const [iframeSrc, setIframeSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout>();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const checkTimeoutRef = useRef<NodeJS.Timeout>();

  // Fetch the embed URL from the API
  useEffect(() => {
    const fetchEmbedUrl = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Build API URL with city code and preserve query params
        const apiUrl = `https://api.kikiapp.eu/auth/support-us?city=${city_code || ''}`;
        const queryParams = location.search;
        const fullApiUrl = queryParams && queryParams.length > 1
          ? `${apiUrl}&${queryParams.substring(1)}`
          : apiUrl;
        
        const response = await fetch(fullApiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch support URL: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.url && typeof data.url === 'string') {
          setIframeSrc(data.url);
        } else {
          throw new Error('Invalid response format: missing url field');
        }
      } catch (err) {
        console.error('Error fetching support URL:', err);
        setError(err instanceof Error ? err.message : 'Failed to load support form');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmbedUrl();
  }, [city_code, location.search]);

  // Check if iframe is blocked and redirect if needed
  useEffect(() => {
    if (!iframeSrc || shouldRedirect) return;

    const checkIframeBlocked = () => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        // Try to access iframe content - this will throw if blocked by X-Frame-Options
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        
        // If we can't access the document, it's likely blocked
        if (!iframeDoc) {
          // Check if iframe has loaded but content is inaccessible
          // This is a common sign of X-Frame-Options blocking
          setShouldRedirect(true);
          return;
        }

        // Additional check: see if we can read the document
        // Some browsers allow access but the content is blocked
        try {
          const body = iframeDoc.body;
          // If body exists but is empty/null after a delay, might be blocked
        } catch (e) {
          // Can't access body - likely blocked
          setShouldRedirect(true);
        }
      } catch (e) {
        // Cross-origin or blocked - redirect
        setShouldRedirect(true);
      }
    };

    // Set a timeout to check after iframe should have loaded
    // Give it 2 seconds to load
    checkTimeoutRef.current = setTimeout(() => {
      checkIframeBlocked();
    }, 2000);

    return () => {
      if (checkTimeoutRef.current) {
        clearTimeout(checkTimeoutRef.current);
      }
    };
  }, [iframeSrc, shouldRedirect]);

  // Handle redirect when iframe is blocked
  useEffect(() => {
    if (shouldRedirect && iframeSrc) {
      // Redirect the whole page to the URL
      window.location.href = iframeSrc;
    }
  }, [shouldRedirect, iframeSrc]);

  // Handle iframe load events
  const handleIframeLoad = () => {
    // Clear the timeout since iframe loaded
    if (checkTimeoutRef.current) {
      clearTimeout(checkTimeoutRef.current);
    }

    // Check if blocked after a short delay to allow content to render
    setTimeout(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        if (!iframeDoc) {
          setShouldRedirect(true);
          return;
        }
        // Try to access body to confirm it's not blocked
        const body = iframeDoc.body;
        if (!body || body.children.length === 0) {
          // Might be blocked or empty - check if it's a cross-origin issue
          // If we got here without error, it's probably just empty, not blocked
        }
      } catch (e) {
        // Cross-origin or blocked - redirect
        setShouldRedirect(true);
      }
    }, 500);
  };

  const handleIframeError = () => {
    // Iframe failed to load - likely blocked
    if (iframeSrc) {
      setShouldRedirect(true);
    }
  };

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

  // Don't render iframe if we're redirecting
  if (shouldRedirect) {
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
            <div className="flex items-center justify-center" style={{ height: iframeHeight }}>
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </>
    );
  }

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
        {isLoading ? (
          <div className="flex items-center justify-center" style={{ height: iframeHeight }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Loading support form...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center" style={{ height: iframeHeight }}>
            <div className="text-center px-6">
              <p className="text-red-600 mb-4">{error}</p>
              <p className="text-gray-600">Please try again later.</p>
            </div>
          </div>
        ) : iframeSrc ? (
          <>
            <div className="w-full">
              <iframe
                ref={iframeRef}
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
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                // Allow top-level navigation when triggered by a user (e.g., submit/cta)
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
                title="Pulse Support Us"
              />
            </div>
            {/* Accessible fallback link in case embedding is blocked by headers */}
            <div className="sr-only">
              <a href={iframeSrc}>Open the support form directly</a>
            </div>
          </>
        ) : null}
      </main>
      <Footer />
    </div>
    </>
  );
};

export default SupportUs;

