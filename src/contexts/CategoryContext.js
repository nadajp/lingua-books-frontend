import React,{ createContext, useContext, useEffect, useState } from 'react';
import fetchData from '../services/fetchData';

const CategoriesContext = createContext([]);

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchData('categories');
      setCategories(categories);
    }
    getCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={categories}>
      {children}
    </CategoriesContext.Provider>
  );
}
