
import { useEffect, useState } from "react";
import { generateSitemap } from "@/utils/sitemap";

/**
 * Sitemap component that generates an XML sitemap
 * This component doesn't render any UI but sets the document content to XML
 */
const Sitemap = () => {
  useEffect(() => {
    // Set content type meta tag immediately
    const meta = document.createElement("meta");
    meta.httpEquiv = "Content-Type";
    meta.content = "application/xml; charset=utf-8";
    document.head.appendChild(meta);
    
    // Remove all existing body content
    document.body.innerHTML = '';
    
    // Generate and set sitemap content
    const fetchSitemap = async () => {
      try {
        const xml = await generateSitemap();
        
        // Create a pre element to display the XML
        const pre = document.createElement('pre');
        pre.textContent = xml;
        document.body.appendChild(pre);
        
        // Also set response headers via meta tags
        document.title = "Sitemap"; // Clear the title
      } catch (error) {
        console.error("Error setting sitemap:", error);
        document.body.textContent = 'Error generating sitemap';
      }
    };

    fetchSitemap();
    
    // Cleanup
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  return null;
};

export default Sitemap;
