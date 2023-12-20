import React, { useState, useEffect } from 'react';
import fetchData from 'src/services/fetchData';

export default function AddCategoryForm({ onSuccess }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
      const categories = await fetchData('categories');
      setCategories(categories);
  }
  
  async function handleSubmit(event) {
    event.preventDefault();
    const newCategory = {
      name: event.target.name.value,
      parentCategoryId: event.target.parent?.value || null,
    };
  
    try {
      const response = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('response' + responseData);
        alert("Category saved successfully!")
        onSuccess();
      } else {
        console.error('Error saving new category, status:', response.status);
      }
    } catch (error) {
      console.error('Error saving new category:', error);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="name" className="text-gray-700 font-semibold">
          Category Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="parent" className="text-gray-700 font-semibold">
          Parent Category:
        </label>
        <select
          id="parent"
          value={parentCategoryId}
          onChange={(e) => setParentCategoryId(e.target.value || '')}
          className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none w-full"
        >
          <option value="">None (Top-level)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Add Category
      </button>
    </form>

  );
}
