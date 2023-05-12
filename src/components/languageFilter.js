import React from 'react';

const LanguageFilter = ({ languages, selectedLanguages, onLanguageToggle, showMoreLanguages, onToggleMore }) => {
  const displayedLanguages = showMoreLanguages ? languages : languages.slice(0, 5);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Languages</h2>
      <div className="space-y-2">
        {displayedLanguages.map((language) => (
          <div key={language.id} className="flex items-center">
              <input
                  type="checkbox"
                  id={language.id}
                  checked={selectedLanguages.some(selectedLang => selectedLang.id === language.id)}
                  onChange={() => onLanguageToggle(language)}
                  className="form-checkbox h-4 w-4 text-blue-600 rounded"
              />
              <label htmlFor={language.id} className="ml-2 text-gray-700">
                  {language.name}
              </label>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onToggleMore(!showMoreLanguages)}
          className="text-blue-600 hover:text-blue-800"
        >
          {showMoreLanguages ? 'Show less...' : 'Show more...'}
        </button>
      </div>
    </div>
  );
};

export default LanguageFilter;
