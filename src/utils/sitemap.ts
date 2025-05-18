
import { City } from "@/types/city";

// Base URL for the site - ensure this matches robots.txt
const BASE_URL = "https://pulsenow.app";

// Static routes that should be included in the sitemap
const STATIC_ROUTES = [
  "/",
  "/matchmaking",
  "/cities",
  "/cities-expanded",
  "/communities",
  "/about",
  "/contact",
  "/blog"
];

/**
 * Generates XML content for the sitemap - for server-side use
 * Note: This function is not used in the client-side app currently
 * @returns XML string for the sitemap
 */
export async function generateSitemap(): Promise<string> {
  try {
    // Start XML content
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // Add static routes
    STATIC_ROUTES.forEach(route => {
      xml += `  <url>\n`;
      xml += `    <loc>${BASE_URL}${route}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });
    
    try {
      // Attempt to fetch cities data with a short timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities_expanded", {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const cities: City[] = await response.json();
        
        // Add dynamic city routes if cities were successfully fetched
        if (cities && Array.isArray(cities)) {
          cities.forEach(city => {
            if (city && city.url2) {
              xml += `  <url>\n`;
              xml += `    <loc>${BASE_URL}/cities${city.url2}</loc>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.7</priority>\n`;
              xml += `  </url>\n`;
              
              // Also add queer city route
              xml += `  <url>\n`;
              xml += `    <loc>${BASE_URL}/cities${city.url2}/queer</loc>\n`;
              xml += `    <changefreq>weekly</changefreq>\n`;
              xml += `    <priority>0.7</priority>\n`;
              xml += `  </url>\n`;
            }
          });
        }
      } else {
        console.warn(`Failed to fetch cities: ${response.status}`);
      }
    } catch (fetchError) {
      console.warn("Error fetching cities data:", fetchError);
      // Continue with static routes only
    }
    
    // Close XML content
    xml += '</urlset>';
    
    return xml;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return a minimal valid sitemap in case of error
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://pulsenow.app/</loc>\n    <priority>1.0</priority>\n  </url>\n</urlset>';
  }
}
