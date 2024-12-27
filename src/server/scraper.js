import express from 'express';
import searchRoutes from './routes/search.js';

const app = express();
app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Routes
app.use('/api', searchRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Scraping server running on port ${PORT}`);
});