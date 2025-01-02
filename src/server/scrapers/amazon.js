import { launchBrowser } from '../utils/browser.js';

export async function scrapeAmazon(searchQuery) {
  const browser = await launchBrowser();
  const page = await browser.newPage();

  try {
    // Set user agent and headers
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    await page.setExtraHTTPHeaders({ 'accept-language': 'en-US,en;q=0.9' });

    // Navigate to the Amazon search page with extended timeout and 'networkidle2'
    await page.goto(`https://www.amazon.in/s?k=${encodeURIComponent(searchQuery)}`, {
      timeout: 60000,
      waitUntil: 'networkidle2',  // Wait until network activity stops
    });

    // Wait for product containers to load
    await page.waitForSelector('.s-main-slot .s-result-list .s-search-results .sg-row', { timeout: 60000 });  // Increased timeout

    // Scrape product details
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.s-main-slot .s-result-list .s-search-results .sg-row');
      return Array.from(items, item => {
        const titleElement = item.querySelector('h2 span');
        const priceElement = item.querySelector('.a-price-whole');
        const imageElement = item.querySelector('img');
        const ratingElement = item.querySelector('.a-icon-star-small span');
        const reviewsElement = item.querySelector('.a-size-small .a-link-normal');
        const linkElement = item.querySelector('h2 a');

        return {
          title: titleElement?.textContent?.trim() || '',
          price: priceElement ? parseInt(priceElement.textContent.replace(/[,.]/g, '')) : 0,
          image: imageElement?.src || '',
          rating: ratingElement ? parseFloat(ratingElement.textContent) : 0,
          reviews: reviewsElement ? parseInt(reviewsElement.textContent.replace(/[,.]/g, '')) : 0,
          link: linkElement ? `https://amazon.in${linkElement.getAttribute('href')}` : '',
          store: 'amazon',
        };
      }).filter(item => item.title && item.price > 0);
    });

    return products;
  } catch (error) {
    console.error('Error scraping Amazon:', error);
    return [];
  } finally {
    await browser.close();
  }
}
