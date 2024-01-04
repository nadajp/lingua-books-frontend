import BookThumbnail from "./BookThumbnail";
import React, { useState, useContext } from 'react';
import LanguageFilter from "./LanguageFilter/LanguageFilter";
import Link from "next/link";
import { LanguageContext } from "../contexts/LanguageContext";

export default function BookGrid({ books }) {
    const { languages, selectedLanguages, updateSelectedLanguages } = useContext(LanguageContext);
    const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  
    const onLanguageToggle = (language) => {
      const updatedLanguages = (prev => 
        prev.some(l => l.id === language.id) 
        ? prev.filter(l => l.id !== language.id) 
        : [...prev, language]
      );
      updateSelectedLanguages(updatedLanguages);
    };
    
    const onToggleMoreLanguages = (showMore) => {
      setShowMoreLanguages(showMore);
    };
  
    const generateQueryString = () => {
      const languages = selectedLanguages.map((lang) => lang.id);
      return languages.length > 0 ? `languages=${languages.join(',')}` : '';
    };
    console.log('books: ' , books);
    const filteredBooks = books.filter((book) =>
      selectedLanguages.length === 0 || selectedLanguages.map(lang => lang.id).includes(Number(book.language.id)),
    );
    console.log('filteredBooks: ' , filteredBooks);
    return (
        <div className="flex grow mx-auto px-4 my-8">
            <aside className="w-24 px-8 mx-8">
              <LanguageFilter 
                languages={languages}
                selectedLanguages={selectedLanguages}
                onLanguageToggle={onLanguageToggle}
                onToggleMore={onToggleMoreLanguages}
                showMoreLanguages={showMoreLanguages}
              />
            </aside>
            <div className="flex-1 mx-10 px-10">
              <Link href={{ pathname: '/', query: { languages: generateQueryString()} }}>
                Go back to Home
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredBooks.map((book, index) => (
                    <BookThumbnail key={book.id} book={book} index={index} data-testid="book-thumbnail"/>
                ))}
              </div>
            </div>
          </div>
      );
}




