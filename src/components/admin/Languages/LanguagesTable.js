import React, { useState, useEffect } from 'react';
import fetchData from 'src/services/fetchData';
import EditLanguageModal from './EditLanguageModal';
import AddLanguageForm from './AddLanguageForm';
import Modal from '../../common/Modal';

export default function LanguagesTable() {
  const [languages, setLanguages] = useState([]);
  const [isAddLanguageModalOpen, setIsAddLanguageModalOpen] = useState(false);
  const [editingLanguage, setEditingLanguage] = useState(null);

  const handleEdit = (language) => {
    setEditingLanguage(language);
  };

  const handleDelete = (languageId) => {
    onDelete(languageId);
  };

  useEffect(() => {
    getLanguages();
  }, []);

  async function getLanguages() {
    const languages = await fetchData('languages');
    setLanguages(languages);
  }

    return (
      <div>
        <button className="bg-gray-500 text-yellow-300 rounded-md p-2 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 focus:ring-opacity-50"
          onClick={() => setIsAddLanguageModalOpen(true)}>
          Add New Language
        </button>
      <EditLanguageModal
        isOpen={!!editingLanguage}
        onClose={() => setEditingLanguage(null)}
        language={editingLanguage || {}}
        onSave={(updatedLanguage) => {
          onEdit(updatedLanguage);
          setEditingLanguage(null);
        }}
      />
      <table className="min-w-full leading-normal">      
      <thead>
        <tr>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Language Name
          </th>
          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
          {languages.map((language) => (
            <tr key={language.id}>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {language.name}
            </td>
            <td>
                <button onClick={() => handleEdit(language)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                <button onClick={() => handleDelete(language.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isAddLanguageModalOpen}
        onRequestClose={() => setIsAddLanguageModalOpen(false)}
        title="Add New Language">
        <AddLanguageForm
          onSuccess={() => {
            setIsAddLanguageModalOpen(false);
            getLanguages();
          }}
        />
      </Modal>
      </div>
    );
  }
