import React,{ createContext, useContext, useEffect, useState } from 'react';
import fetchCategories from 'src/services/fetchCategories';

const CategoriesContext = createContext([]);

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetchCategories();
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
