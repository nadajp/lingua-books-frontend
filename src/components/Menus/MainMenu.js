import React, { useState, useContext } from 'react';
import { useCategories } from 'src/contexts/CategoryContext';
import Link from 'next/link';
import { LanguageContext } from "../../contexts/LanguageContext";

export default function MainMenu() {
  const { categories, isLoading, isError } = useCategories();
  const { selectedLanguages } = useContext(LanguageContext);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const generateQueryString = () => {
    const languages = selectedLanguages.map((lang) => lang.id);
    return languages.length > 0 ? `languages=${languages.join(',')}` : '';
  };

  const handleCategoryMouseOver = (category) => {
    setExpandedCategory(category);
  };

  const handleCategoryMouseLeave = () => {
    setExpandedCategory(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading categories.</div>;
  }
  return (
    <nav className="bg-black p-4 text-yellow-200" data-testid="mainmenu" onMouseLeave={handleCategoryMouseLeave}>
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li key={category.id} className="relative z-10">
          <Link key={category.id}
            href={`/${category.slug}?${generateQueryString()}`}
            className="block text-white hover:text-yellow-200"
            >
              <button
                onMouseOver={() => handleCategoryMouseOver(category)}
                className="hover:text-yellow-500"
                onClick={() => handleCategoryMouseLeave(category)}
              >
                {category.name}
              </button>
           </Link>
            {expandedCategory === category && (
              <div
                className="absolute left-0 mt-2 min-w-full p-4 bg-black rounded shadow z-20"
                onMouseLeave={handleCategoryMouseLeave}
              >
                <ul className="space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <Link key={`${category.id}-${subcategory.id}`} 
                        href={`/${category.slug}/${subcategory.slug}?${generateQueryString()}`}
                        className="block text-white hover:text-yellow-200"
                        onClick={() => handleCategoryMouseLeave(category)}
                      >
                      <li key={subcategory.id}>
                        {subcategory.name}
                    </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
