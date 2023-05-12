import BookThumbnail from "./bookThumb";
import React, { useState } from 'react';
import LanguageFilter from "./languageFilter";
import useLanguages from '../hooks/useLanguages'

export default function BookGrid({ books }) {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [showMoreLanguages, setShowMoreLanguages] = useState(false);
    const { languages, isLoading, isError } = useLanguages();
    
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading languages</div>;
  
    console.log(languages, selectedLanguages);
    const onLanguageToggle = (language) => {
      setSelectedLanguages(prev => 
        prev.some(l => l.id === language.id) 
        ? prev.filter(l => l.id !== language.id) 
        : [...prev, language]
      );
    };
    const onToggleMoreLanguages = (showMore) => {
      setShowMoreLanguages(showMore);
    };
  
    console.log(selectedLanguages); // Check what's stored in the selectedLanguages state
    console.log(books[0]?.language); // Check the language property of the first book, if it exists

    const filteredBooks = books.filter((book) =>
      selectedLanguages.length === 0 || selectedLanguages.map(lang => lang.id).includes(Number(book.language.id)),
);
    return (
        <div className="container mx-auto px-4 my-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <LanguageFilter 
                languages={languages}
                selectedLanguages={selectedLanguages}
                onLanguageToggle={onLanguageToggle}
                onToggleMore={onToggleMoreLanguages}
                showMoreLanguages={showMoreLanguages}
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks.map((book, index) => (
                    <BookThumbnail key={book.id} book={book} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
}




