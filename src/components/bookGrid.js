import BookThumbnail from "./bookThumb";
import React, { useState } from 'react';
import LanguageFilter from "./languageFilter";

export default function BookGrid({ books }) {
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [showMoreLanguages, setShowMoreLanguages] = useState(false);
  
    const languages = ['Croatian', 'Serbian', 'Polish', 'Hungarian', 'Russian', 
    'Ukranian','Bulgarian', 'Czech', 'Slovenian', 'Macedonian']

    const onLanguageToggle = (language) => {
      setSelectedLanguages((prevSelectedLanguages) =>
        prevSelectedLanguages.includes(language)
          ? prevSelectedLanguages.filter((l) => l !== language)
          : [...prevSelectedLanguages, language],
      );
    };
  
    const onToggleMoreLanguages = (showMore) => {
      setShowMoreLanguages(showMore);
    };
  
    const filteredBooks = books.filter((book) =>
      selectedLanguages.length === 0 || selectedLanguages.includes(book.language),
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




