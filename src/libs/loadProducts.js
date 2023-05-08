import loadProductImage from "src/libs/loadProductImage";

const API_URL = 'http://localhost:8080/api/v1/products';

export default async function loadProducts() {
    try {
      const res = await fetch(API_URL);
      let products = await res.json();

      for (const product of products) {
        if (product.imageUrl) {    
          const image = await loadProductImage(product.imageUrl);          
          product.image = image
        }
      }
      return products;
    } catch (error) {
      console.error('Error loading products:', error);
      return [];
    }
  } 