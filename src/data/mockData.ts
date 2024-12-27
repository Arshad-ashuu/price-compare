import { Product, Store, StoreInfo } from '../types';

export const storeInfo: Record<Store, StoreInfo> = {
  amazon: {
    name: 'amazon',
    displayName: 'Amazon',
    logo: 'https://images.unsplash.com/photo-1612599316791-451087c7fe15?w=128&h=128&fit=crop',
  },
  'souled-store': {
    name: 'souled-store',
    displayName: 'The Souled Store',
    logo: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=128&h=128&fit=crop',
  },
  'shoppers-stop': {
    name: 'shoppers-stop',
    displayName: "Shopper's Stop",
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop',
  },
  snitch: {
    name: 'snitch',
    displayName: 'Snitch',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=128&h=128&fit=crop',
  },
};

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Classic White Oxford Shirt',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop',
    store: 'amazon',
    link: '#',
    rating: 4.5,
    reviews: 2345,
  },
  {
    id: '2',
    title: 'Premium White Formal Shirt',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop',
    store: 'souled-store',
    link: '#',
    rating: 4.3,
    reviews: 890,
  },
  {
    id: '3',
    title: 'White Business Shirt',
    price: 1699,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop',
    store: 'shoppers-stop',
    link: '#',
    rating: 4.4,
    reviews: 1256,
  },
  {
    id: '4',
    title: 'Essential White Shirt',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=300&h=400&fit=crop',
    store: 'snitch',
    link: '#',
    rating: 4.2,
    reviews: 567,
  },
];