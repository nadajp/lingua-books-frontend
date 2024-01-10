import loadProductImage from "./loadProductImage";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function loadProducts() {
    try {
      const res = await fetch(API_URL);
      let products = await res.json();

      for (const product of products) {
        if (product.imageUrl) {                
          product.image = await loadProductImage(product.imageUrl);    
        } else {
          product.image = '/book-cover-placeholder.png';
        }
      }
      return products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
  } 