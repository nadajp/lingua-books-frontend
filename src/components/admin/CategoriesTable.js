// components/admin/CategoriesTable.js
import React, { useState, useEffect } from 'react';
import AddCategoryForm from './AddCategoryForm';
import Modal from '../common/Modal';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const url = `${apiUrl}/categories`
      console.log('fetching from ' + url)
      const response = await fetch(`${apiUrl}/categories`); // URL to the backend API
      const data = await response.json();
      console.log('fetched categories' + JSON.stringify(data))
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  function renderCategory(category, level = 0) {
    const paddingLeft = 20 * level;
    return (
      <>
        <tr key={category.id}>
          <td className="p-4" style={{ paddingLeft: `${paddingLeft}px` }}>
            {category.name}
          </td>
          <td className="p-4">EDIT</td>
          <td className="p-4">DELETE</td>
        </tr>
        {category.subcategories?.map((subcategory) =>
          renderCategory(subcategory, level + 1)
        )}
      </>
    );
  }
  
  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-600"
        onClick={() => setIsAddCategoryModalOpen(true)}
      >
        Add New Category
      </button>
      <table className="w-full bg-white shadow rounded">
        <thead>
          {/* ... */}
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
            fetchCategories();
          }}
        />
      </Modal>
    </div>
  );
}
