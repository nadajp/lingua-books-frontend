import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import BookThumbnail from '../../components/BookThumbnail';

jest.mock('next/router');

jest.mock('next/link', () => {
  return ({ children }) => children;
});

describe('BookThumbnail', () => {

    it('should render a book thumbnail with all the necessary information', () => {
      // Arrange
      // Mock book data
      const book = {
        id: '1',
        name: 'Book Name',
        author: 'Author Name',
        price: 10,
        image: '/book-image.jpg',
        language: {
          name: 'English'
        }
      };
  
      // Act
      render(<BookThumbnail book={book} index={0} />);
  
      // Assert
      // Check if all the necessary information is rendered
      expect(screen.getByAltText('Book Name')).toBeInTheDocument();
      expect(screen.getByText('Book Name')).toBeInTheDocument();
      expect(screen.getByText('Author Name')).toBeInTheDocument();
      expect(screen.getByText('$10')).toBeInTheDocument();
      expect(screen.getByText('Add to Cart')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });

    it('should navigate to the book\'s product page when the thumbnail is clicked', () => {
        const book = {
          id: '1',
          name: 'Book Name',
          author: 'Author Name',
          price: 10,
          image: '/book-image.jpg',
          language: {
            name: 'English'
          }
        };
                
      const mockPush = jest.fn();
      
      useRouter.mockImplementation(() => ({
        push: mockPush,
      }));

    render(<BookThumbnail book={book} index={0} />);

    fireEvent.click(screen.getByAltText('Book Name').closest('div'));

    expect(mockPush).toHaveBeenCalledWith('/products/1');
    });
})
