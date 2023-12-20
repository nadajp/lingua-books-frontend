import React, { useState, useEffect } from 'react';
import AddCategoryForm from './AddCategoryForm';
import Modal from '../../common/Modal';
import fetchData from 'src/services/fetchData';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    const categories = await fetchData('categories');
    setCategories(categories);
  }

  function renderCategory(category, level = 0) {
    const paddingLeft = 20 * level;
    let key = `${category.id}-${level}`;
  
    return (
      <React.Fragment key={key}>
        <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm" style={{ paddingLeft: `${paddingLeft}px` }}>
            {category.name}
          </td>
          <td>
              <button onClick={() => handleEdit(language)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
              <button onClick={() => handleDelete(language.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
          </td>
        </tr>
        {category.subcategories?.map((subcategory) =>
          renderCategory(subcategory, level + 1)
        )}
      </React.Fragment>
    );
  }  
  
  return (
    <div>
      <button className="bg-gray-500 text-yellow-300 rounded-md p-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
          onClick={() => setIsAddCategoryModalOpen(true)}
        >
        Add New Category
      </button>
      <table className="min-w-full leading-normal">      
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Category Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
          {categories.map((category) => renderCategory(category))}
        </tbody>
      </table>
      <Modal
        isOpen={isAddCategoryModalOpen}
        onRequestClose={() => setIsAddCategoryModalOpen(false)}
        title="Add New Category">
        <AddCategoryForm
          onSuccess={() => {
            setIsAddCategoryModalOpen(false);
            getCategories();
          }}
        />
      </Modal>
    </div>
  );
}
