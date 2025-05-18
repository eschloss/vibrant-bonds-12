
import { useEffect } from "react";

/**
 * Sitemap component that serves a static XML sitemap
 * This component doesn't render any UI but redirects to the static sitemap file
 */
const Sitemap = () => {
  useEffect(() => {
    // Redirect to the static sitemap file
    window.location.href = "/sitemap-static.xml";
  }, []);

  return null;
};

export default Sitemap;
