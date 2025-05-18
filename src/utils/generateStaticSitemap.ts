
import fs from 'fs';
import path from 'path';
import { generateSitemap } from './sitemap';

/**
 * Generates and saves the sitemap.xml file
 * This can be used in build scripts or server-side rendering
 */
async function generateStaticSitemap() {
  try {
    const xml = await generateSitemap();
    
    // Ensure the public directory exists
    const publicDir = path.resolve(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write the sitemap to the public directory
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
    
    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating static sitemap:', error);
  }
}

// Enable direct execution
if (require.main === module) {
  generateStaticSitemap();
}

export default generateStaticSitemap;
