
import fs from 'fs';
import path from 'path';
import { generateSitemap } from './sitemap';

/**
 * Generates and saves the sitemap.xml file
 * This can be used in build scripts or server-side rendering
 */
async function generateStaticSitemap() {
  try {
    console.log('Generating sitemap...');
    const xml = await generateSitemap();
    
    // Ensure the public directory exists
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write the sitemap to the public directory
    const filePath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(filePath, xml);
    
    console.log(`✅ Sitemap generated successfully at ${filePath}`);
  } catch (error) {
    console.error('Error generating static sitemap:', error);
    // Create a minimal fallback sitemap
    try {
      const fallbackXml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>https://pulsenow.app/</loc>\n    <priority>1.0</priority>\n  </url>\n</urlset>';
      
      const publicDir = path.resolve(process.cwd(), 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), fallbackXml);
      console.log('✅ Fallback sitemap generated successfully');
    } catch (fallbackError) {
      console.error('Failed to generate fallback sitemap:', fallbackError);
    }
  }
}

// Enable direct execution
if (require.main === module) {
  generateStaticSitemap();
}

export default generateStaticSitemap;
