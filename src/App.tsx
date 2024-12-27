import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { ProductGrid } from './components/ProductGrid';
import { ShoppingBag } from 'lucide-react';
import { useProducts } from './hooks/useProducts';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading, error } = useProducts(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black ">
      <header className="bg-white shadow-sm dark:bg-black border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-blue-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PriceWise</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 dark:text-white">
              Compare Prices Across Multiple Stores
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl dark:text-gray-200">
              Find the best deals on clothes from Amazon, The Souled Store, and more
            </p>
          </div>

          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Searching across stores...</p>
            </div>
          )}

          {error && (
            <div className="text-center text-red-600">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && <ProductGrid products={products} />}
        </div>
      </main>

      <footer className="bg-white border-t mt-12 dark:bg-black dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-200">
            © 2024 PriceWise. made with 💖 PriceWise.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;