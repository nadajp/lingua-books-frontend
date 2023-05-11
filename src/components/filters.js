import LanguageFilter from "./languageFilter"

export default function Filters() {
    const languages = ['Croatian', 'Serbian', 'Polish', 'Hungarian', 'Russian', 
                        'Ukranian','Bulgarian', 'Czech', 'Slovenian', 'Macedonian']
    return (
        <div className="relative w-full h-20">
            Filters
            <LanguageFilter languages={languages} />
        </div>
    )
}