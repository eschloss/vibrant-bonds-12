
import { useEffect, useState } from "react";
import { generateSitemap } from "@/utils/sitemap";

const Sitemap = () => {
  const [sitemap, setSitemap] = useState("");

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const xml = await generateSitemap();
        setSitemap(xml);
        
        // Set the correct content type for the document
        const doc = document.implementation.createDocument("", "", null);
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xml, "application/xml");
        document.documentElement.replaceWith(xmlDoc.documentElement);
        
        // Set content type meta tag
        const meta = document.createElement("meta");
        meta.httpEquiv = "Content-Type";
        meta.content = "text/xml; charset=utf-8";
        document.head.appendChild(meta);
      } catch (error) {
        console.error("Error setting sitemap:", error);
      }
    };

    fetchSitemap();
  }, []);

  return null; // This component doesn't render any UI
};

export default Sitemap;
