import { launchBrowser } from '../utils/browser.js';

export async function scrapeShoppersStore(searchQuery) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    // Set user agent and headers
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

    // Navigate to Shoppers Stop search page
    await page.goto(`https://www.shoppersstop.com/search/result?q=${encodeURIComponent(searchQuery)}`, {
      timeout: 60000,
      waitUntil: 'domcontentloaded',
    });

    // Wait for product containers to load
    await page.waitForSelector('.bg-transparent', { timeout: 30000 });

    // Scrape product details
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.bg-transparent');
      console.log(items.length)
      return Array.from(items, item => {
        const titleElement = item.querySelector('.line-clamp-2');
        const priceElement = item.querySelector('.mt-2 .text-xs.text-black');
        const imageElement = item.querySelector('img[alt="product card"]');
        const linkElement = item.querySelector('.product-name a');

        return {
          title: titleElement?.textContent?.trim() || '',
          price: priceElement ? parseInt(priceElement.textContent.replace(/[₹,.]/g, '')) : 0,
          image: imageElement ? imageElement.src : '',
          rating: 4.0, // Placeholder value, adjust if you find the rating element
          reviews: 0,  // Placeholder value, adjust if you find the reviews element
          link: linkElement ? linkElement.href : '',
          store: 'shoppers-stop',
        };
      }).filter(item => item.title && item.price > 0);
    });

    return products;
  } catch (error) {
    console.error('Error scraping Shoppers Stop:', error);
    return [];
  } finally {
    await browser.close();
  }
}
