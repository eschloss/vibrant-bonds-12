import Footer from "@/components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";

const Signup = () => {
  const location = useLocation();

  // Preserve all existing query params to pass through to the embedded form
  const iframeSrc = useMemo(() => {
    return `https://form.pulsenow.app${location.search || ""}`;
  }, [location.search]);

  // Ensure the page scrolls to top on mount in our scroll container layout
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1 w-full">
        <div className="w-full">
          <iframe
            src={iframeSrc}
            className="w-full min-h-screen"
            style={{ border: "none" }}
            loading="eager"
            // Allow top-level navigation when triggered by a user (e.g., submit/cta)
            sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            title="Pulse Signup"
          />
        </div>
        {/* Accessible fallback link in case embedding is blocked by headers */}
        <div className="sr-only">
          <a href={iframeSrc}>Open the signup form directly</a>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;


