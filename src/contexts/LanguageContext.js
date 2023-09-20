import React, { createContext, useState, useEffect } from 'react';
import fetchData from '../services/fetchData'

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const updateSelectedLanguages = (languages) => {
    setSelectedLanguages(languages);
  };

  useEffect(() => {
    async function getLanguages() {
      const languages = await fetchData('languages');
      setLanguages(languages);
    }
    getLanguages();
  }, []);

  return (
    <LanguageContext.Provider value={{ languages, selectedLanguages, updateSelectedLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
