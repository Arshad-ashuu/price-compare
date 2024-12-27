import { Star } from 'lucide-react';
import { Product } from '../types';
import { storeInfo } from '../data/mockData';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <img
            src={storeInfo[product.store].logo}
            alt={storeInfo[product.store].displayName}
            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
          />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <div className="flex items-center gap-2 mb-2">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">{formatPrice(product.price)}</span>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            View Deal
          </a>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          from {storeInfo[product.store].displayName}
        </div>
      </div>
    </div>
  );
}