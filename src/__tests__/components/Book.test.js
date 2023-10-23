import Book from '../../components/Book';
import { render, screen } from '@testing-library/react';

describe('Book', () => {

    it('should render all book details when book object is provided', () => {
      const book = {
        name: 'Book Name',
        author: 'Author Name',
        price: 10,
        condition: 'New',
        publisher: 'Publisher Name',
        year: 2022,
        format: 'Hardcover',
        length: 200,
        language: { name: 'English' },
        image: '/book-image.jpg'
      };

      render(<Book book={book} />);

      expect(screen.getByAltText('Book Name')).toBeInTheDocument();
      expect(screen.getByText('Book Name')).toBeInTheDocument();
      expect(screen.getByText('Author Name')).toBeInTheDocument();
      expect(screen.getByText('Price: $10')).toBeInTheDocument();
      expect(screen.getByText('Condition: New')).toBeInTheDocument();
      expect(screen.getByText('Publisher: Publisher Name')).toBeInTheDocument();
      expect(screen.getByText('Year of Publishing: 2022')).toBeInTheDocument();
      expect(screen.getByText('Format: Hardcover')).toBeInTheDocument();
      expect(screen.getByText('Length: 200 pages')).toBeInTheDocument();
      expect(screen.getByText('Language: English')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
    });

    it('should display "Add to Cart" button', () => {
      const book = {
        name: 'Book Name',
        author: 'Author Name',
        price: 10,
        condition: 'New',
        publisher: 'Publisher Name',
        year: 2022,
        format: 'Hardcover',
        length: 200,
        language: { name: 'English' },
        image: '/book-image.jpg'
      };

      render(<Book book={book} />);

      expect(screen.getByRole('button', { name: 'Add to Cart' })).toBeInTheDocument();
    });

    it('should render responsive image that fits container', () => {
      const book = {
        name: 'Book Name',
        author: 'Author Name',
        price: 10,
        condition: 'New',
        publisher: 'Publisher Name',
        year: 2022,
        format: 'Hardcover',
        length: 200,
        language: { name: 'English' },
        image: '/book-image.jpg'
      };

      render(<Book book={book} />);

      const image = screen.getByAltText('Book Name');
      expect(image).toBeInTheDocument();
      expect(image).toHaveStyle({ objectFit: 'contain' });
    });
});
