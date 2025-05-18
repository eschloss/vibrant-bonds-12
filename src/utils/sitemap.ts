
import { City } from "@/types/city";

// Base URL for the site
const BASE_URL = "https://pulse.kikiapp.eu";

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
 * Generates XML content for the sitemap
 * @param cities - Array of cities from the API
 * @returns XML string for the sitemap
 */
export async function generateSitemap(): Promise<string> {
  try {
    // Fetch cities data
    const response = await fetch("https://api.kikiapp.eu/auth/get_all_cities_expanded");
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cities: ${response.status}`);
    }
    
    const cities: City[] = await response.json();
    
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
    
    // Add dynamic city routes
    cities.forEach(city => {
      if (city.url2) {
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
    
    // Close XML content
    xml += '</urlset>';
    
    return xml;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>';
  }
}
