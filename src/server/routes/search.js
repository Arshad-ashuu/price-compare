import express from 'express';
import { scrapeAmazon } from '../scrapers/amazon.js';
import { scrapeShoppersStore } from '../scrapers/shoppersStore.js';

import { scrapeSouledStore } from '../scrapers/souledStore.js';
import { sanitizeProducts } from '../utils/productUtils.js';

const router = express.Router();

router.get('/search', async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const [amazonProducts, souledStoreProducts, shoppersStoreProducts] = await Promise.all([
      scrapeAmazon(query),
      scrapeShoppersStore(query),
      scrapeSouledStore(query)
    ]);

    const allProducts = sanitizeProducts([...amazonProducts, ...souledStoreProducts, ...shoppersStoreProducts]);
    res.json(allProducts);
  } catch (error) {
    console.error('Error during scraping:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

export default router;