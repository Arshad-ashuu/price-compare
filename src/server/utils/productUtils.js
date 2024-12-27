export function generateProductId() {
  return Math.random().toString(36).substr(2, 9);
}

export function sanitizeProducts(products) {
  return products.map(product => ({
    ...product,
    id: generateProductId(),
    price: Number(product.price) || 0,
    rating: Number(product.rating) || 0,
    reviews: Number(product.reviews) || 0
  }));
}