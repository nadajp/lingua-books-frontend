import React, { createContext, useContext } from 'react';
import useFetch from '../hooks/useFetch';

const CategoriesContext = createContext({
  categories: [],
  isLoading: true,
  isError: false,
});

export function useCategories() {
  return useContext(CategoriesContext);
}

export function CategoriesProvider({ children }) {
  const { data: categories, isLoading, isError } = useFetch('categories');

  const contextValue = {
    categories,
    isLoading,
    isError
  };

  return (
    <CategoriesContext.Provider value={contextValue}>
      {children}
    </CategoriesContext.Provider>
  );
}

