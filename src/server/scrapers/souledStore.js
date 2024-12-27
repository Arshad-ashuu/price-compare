import { launchBrowser } from '../utils/browser.js';

export async function scrapeSouledStore(searchQuery) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    // Set user agent and headers
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

    // Navigate to The Souled Store search page
    await page.goto(`https://www.thesouledstore.com/search?q=${encodeURIComponent(searchQuery)}`, {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });

    // Wait for product containers to load
    await page.waitForSelector('.animate-card', { timeout: 30000 });

    // Scrape product details
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.animate-card');
      
      return Array.from(items, item => {
        const titleElement = item.querySelector('h5 .text-left');
        const priceElement = item.querySelector('.offer');
        const imageElement = item.querySelector('div.listhoverimg') || item.querySelector('img');
        const linkElement = item.querySelector('a');

        // Extract image URL
        const imageUrl = imageElement?.getAttribute('data-url') || imageElement?.getAttribute('src') || '';

        return {
          title: titleElement?.textContent?.trim() || '',
          price: priceElement ? parseInt(priceElement.textContent.replace(/[₹,.]/g, '')) : 0,
          image: imageUrl,
          rating: 4.0, // Default rating as placeholder
          reviews: 0,  // Default reviews as placeholder
          link: linkElement ? linkElement.href : '',
          store: 'souled-store',
        };
      }).filter(item => item.title && item.price > 0);
    });

    return products;
  } catch (error) {
    console.error('Error scraping Souled Store:', error);
    return [];
  } finally {
    await browser.close();
  }
}
