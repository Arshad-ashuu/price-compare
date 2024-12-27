export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  store: Store;
  link: string;
  rating: number;
  reviews: number;
}

export type Store = 'amazon' | 'souled-store' | 'shoppers-stop' | 'snitch';

export interface StoreInfo {
  name: Store;
  displayName: string;
  logo: string;
}