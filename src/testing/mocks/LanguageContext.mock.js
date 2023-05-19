import React from 'react';
  
export const mockLanguages = [
    { id: 1, name: "Croatian" },
    { id: 2, name: "Serbian" },
    { id: 3, name: "Polish" },
  ]

export const mockSelectedLanguages = [mockLanguages[0]];
  
export const LanguageContext = React.createContext({
  languages: mockLanguages,
  selectedLanguages: mockSelectedLanguages,
  updateSelectedLanguages: jest.fn(),
});

export const LanguageProvider = ({ children }) => (
  <LanguageContext.Provider value={{ languages: [], selectedLanguages: [], updateSelectedLanguages: jest.fn() }}>
    {children}
  </LanguageContext.Provider>
);
