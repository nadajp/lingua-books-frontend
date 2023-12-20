import React, { useState } from 'react';

export default function AddLanguageForm({ onSuccess }) {
  const [name, setName] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const newLanguage = {
      name: event.target.name.value,
    };
  
    try {
      const response = await fetch('/api/admin/languages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLanguage),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('response' + responseData);
        alert("Language saved successfully!")
        onSuccess();
      } else {
        console.error('Error saving new Language, status:', response.status);
      }
    } catch (error) {
      console.error('Error saving new Language:', error);
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="name" className="text-gray-700 font-semibold">
          Language Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        Add Language
      </button>
    </form>

  );
}
