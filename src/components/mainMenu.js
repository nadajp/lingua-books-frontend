import React, { useState } from 'react';

const MainMenu = ({ categories }) => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryMouseOver = (category) => {
    setExpandedCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    setExpandedCategory(null);
  };

  return (
    <nav className="bg-black p-4 text-yellow-200">
      <ul className="flex space-x-4">
        {categories.map((category) => (
            <li
                key={category.name}
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
                    <li key={subcategory}>
                      <a href="#" className="block text-white hover:text-yellow-200">
                        {subcategory}
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

export default MainMenu;