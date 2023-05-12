import loadProductImage from "./loadProductImage";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

export default async function loadProducts() {
    try {
      const res = await fetch(API_URL);
      let products = await res.json();

      for (const product of products) {
        if (product.imageUrl) {    
          const image = await loadProductImage(product.imageUrl);          
          product.image = image
        } else {
          product.image = null;
        }
      }
      return products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
  } 