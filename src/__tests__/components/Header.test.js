import Header from 'src/components/Header';
import { render, screen } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import RolesProvider from 'src/contexts/RolesContext';
import { LanguageContext } from 'src/contexts/LanguageContext';
import { mockLanguages } from 'src/testing/mocks/LanguageContext.mock';
import { CategoriesProvider } from 'src/contexts/CategoryContext';

jest.mock('../../hooks/useFetch');

describe('Header', () => {
    const mockUserData = {
        user: {
            name: 'Test User',
            sub: 'auth0|1234567890'
        },
        error: null,
        isLoading: false
    };

    const mockRolesData = {
        isSeller: true,
        isAdmin: false,
        error: null,
        isLoading: false
    };

    beforeEach(() => {
        require('../../hooks/useFetch').default.mockReturnValue({
            data: [{ id: '1', name: 'Category 1' }],
            isLoading: false,
            isError: false
          });
          
    
        render(
            <LanguageContext.Provider value={{ 
                languages: mockLanguages, 
                selectedLanguages: [mockLanguages[0], mockLanguages[1]], 
                updateSelectedLanguages: jest.fn()   
              }}>
                <CategoriesProvider>
                    <UserProvider value={mockUserData} >
                        <RolesProvider value={mockRolesData} >
                            <Header />
                        </RolesProvider>
                    </UserProvider>
                </CategoriesProvider>
            </LanguageContext.Provider>
          );
    });
    
    it('should render a header with the correct styles and structure', () => {
      
      const header = screen.getByRole('banner');
  
      expect(header).toHaveClass('sticky top-0 bg-black z-10 shadow');
  
      const container = screen.getByRole('banner').firstChild;
      expect(container).toHaveClass('container mx-auto p-6');
    });

    it('should render a logo in the header', () => {
      const logo = screen.getByAltText('Logo');
      expect(logo).toBeInTheDocument();
    });

    it('should render the main menu component', () => {
      const mainMenu = screen.getByTestId('mainmenu');
      expect(mainMenu).toBeInTheDocument();
    });

});
