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
  
    const filteredBooks = books.filter((book) =>
      selectedLanguages.length === 0 || selectedLanguages.map(lang => lang.id).includes(Number(book.language.id)),
  );
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredBooks.map((book, index) => (
                    <BookThumbnail key={book.id} book={book} index={index} />
                ))}
              </div>
            </div>
          </div>
      );
}




