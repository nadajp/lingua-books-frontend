import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageContext } from '../../contexts/LanguageContext'
import BookGrid from '../../components/BookGrid';

describe('BookGrid', () => {
   
  const mockLanguages = [
    { id: 1, name: "Croatian" },
    { id: 2, name: "Serbian" },
    { id: 3, name: "Polish" },
  ]

const mockSelectedLanguages = [mockLanguages[0]];

const mockBooks = [
  { id: 1, name: "Book 1", image: '/image.png', language: { id: '1', name: "Croatian"} },
  { id: 2, name: "Book 2", image: '/image.png', language: { id: '2', name: "Serbian" } },
  { id: 3, name: "Book 3", image: '/image.png', language: { id: '3', name: "Polish" } },
];
  
  test('renders without error', () => {
    render(
      <LanguageContext.Provider value={{ 
        languages: mockLanguages, 
        selectedLanguages: [mockLanguages[0], mockLanguages[1]], 
        updateSelectedLanguages: jest.fn()   
      }}>
        <BookGrid books={[]} />
      </LanguageContext.Provider>
    );
    expect(screen.getByText('Croatian')).toBeInTheDocument();
    expect(screen.getByText('Go back to Home')).toBeInTheDocument();
  });

  test("should render grid of books", () => {
    render(
      <LanguageContext.Provider value={{
        languages: mockLanguages,
        selectedLanguages: [],
        updateSelectedLanguages: jest.fn()
      }}>
        <BookGrid books={mockBooks} />
      </LanguageContext.Provider>
    );
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });

  test("should filter grid of books based on selected languages", () => {
    render(
      <LanguageContext.Provider value={{
        languages: mockLanguages,
        selectedLanguages: [mockLanguages[0]],
        updateSelectedLanguages: jest.fn()
      }}>
        <BookGrid books={mockBooks} />
      </LanguageContext.Provider>
    );
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });
  
  test('toggles more languages', async () => {
    const value = {
        languages: mockLanguages,
        selectedLanguages: [mockLanguages[0]],
        updateSelectedLanguages: jest.fn()
    }
    render(
      <LanguageContext.Provider value={value}>
        <BookGrid books={mockBooks} />
      </LanguageContext.Provider>
    );

    userEvent.click(screen.getByText('Show more...'));
    expect(value.updateSelectedLanguages).toHaveBeenCalledTimes(0);
  });

  test('deselects currently selected language', () => {
    const selectedLanguage = mockLanguages[0];

    const value = {
      languages: mockLanguages,
      selectedLanguages: [selectedLanguage],
      updateSelectedLanguages: jest.fn()
    };
    render(
      <LanguageContext.Provider value={value}>
        <BookGrid books={mockBooks} />
      </LanguageContext.Provider>
    );

    fireEvent.click(screen.getByRole('checkbox', {name: selectedLanguage.name})); // Adjust the selector based on your implementation

    expect(value.updateSelectedLanguages).toHaveBeenCalledWith((expect.any(Function)));
    expect(value.updateSelectedLanguages).toHaveBeenCalledTimes(1);
    const updatedLanguagesFn = value.updateSelectedLanguages.mock.calls[0][0];
    const updatedSelectedLanguages = updatedLanguagesFn([selectedLanguage]);

    expect(updatedSelectedLanguages).toEqual([]);
  });

  test('selects languages', () => {
    const mockSetSelectedLanguages = jest.fn();

    const value = {
      languages: mockLanguages,
      selectedLanguages: [],
      updateSelectedLanguages: (languages) => mockSetSelectedLanguages(languages)
    };
  
    render(
      <LanguageContext.Provider value={value}>
        <BookGrid books={mockBooks} />
      </LanguageContext.Provider>
    );
  
    fireEvent.click(screen.getByRole('checkbox', { name: 'Polish' }));
  
    expect(mockSetSelectedLanguages).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetSelectedLanguages).toHaveBeenCalledTimes(1);
    const updatedLanguages = mockSetSelectedLanguages.mock.calls[0][0];

    expect(updatedLanguages.length).toBe(1);
  });
  
});