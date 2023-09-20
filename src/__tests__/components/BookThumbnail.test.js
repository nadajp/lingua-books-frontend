import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/router';
import BookThumbnail from '../../components/BookThumbnail';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
  }));

describe('BookThumbnail', () => {

    // Renders a book thumbnail with image, name, author, price, language and add to cart button
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

    // Clicking on the thumbnail navigates to the book's product page
    it('should navigate to the book\'s product page when the thumbnail is clicked', () => {
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
    
        // Mock next/link component
        jest.mock('next/link', () => ({ children }) => children);
    
        // Mock next/router component
        const useRouter = jest.spyOn(require('next/router'), 'useRouter');
        useRouter.mockImplementation(() => ({
          push: jest.fn()
        }));

           // Act
      render(<BookThumbnail book={book} index={0} />);
      fireEvent.click(screen.getByAltText('Book Name'));
  
      // Assert
      // Check if the router push function is called with the correct path
      expect(useRouter().push).toHaveBeenCalledWith('/products/1');
    });
})
