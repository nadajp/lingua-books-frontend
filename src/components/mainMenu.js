import React, { useState } from 'react';
import useCategories from '../hooks/useCategories'

export default function MainMenu() {
  const { categories, isLoading, isError } = useCategories();
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryMouseOver = (category) => {
    setExpandedCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    setExpandedCategory(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Return early if there was an error loading the categories
  if (isError) {
    return <div>Error loading categories.</div>;
  }

  return (
    <nav className="bg-black p-4 text-yellow-200">
      <ul className="flex space-x-4">
        {categories.map((category) => (
            <li
                key={category.id}
                className="relative z-10"
            >
            <button
              onMouseOver={() => handleCategoryMouseOver(category)}
              className="hover:text-yellow-500"
            >
              {category.name}
            </button>
            {expandedCategory === category && (
              <div className="absolute left-0 mt-2 min-w-full p-4 bg-black rounded shadow z-20"
                              onMouseLeave={handleCategoryMouseLeave}>
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <li key={subcategory.id}>
                      <a href="#" className="block text-white hover:text-yellow-200">
                        {subcategory.name}
                      </a>
                      
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

