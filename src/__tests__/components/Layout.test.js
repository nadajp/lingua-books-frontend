import AppLayout from "src/components/Layout/Layout";
import { render, screen } from "@testing-library/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import RolesProvider from "src/contexts/RolesContext";
import { LanguageContext } from '../../contexts/LanguageContext';
import { mockLanguages } from '../../testing/mocks/LanguageContext.mock';
import { CategoriesProvider } from "src/contexts/CategoryContext";

const mockUserData = {
    user: {
        name: 'Test User',
        sub: 'auth0|1234567890',
        nickname: 'John'
    },
    error: null,
    isLoading: false
};

const mockRolesData = {
    isSeller: true,
    isAdmin: false,
    isLoading: false
}


describe('AppLayout', () => {

    it('should render Header and footer components when AppLayout is rendered', () => {
        render(
            <LanguageContext.Provider value={{ 
                languages: mockLanguages, 
                selectedLanguages: [mockLanguages[0], mockLanguages[1]], 
                updateSelectedLanguages: jest.fn()   
              }}>
                <CategoriesProvider>
                    <UserProvider value={mockUserData}>
                        <RolesProvider user={mockRolesData}>
                            <AppLayout />
                        </RolesProvider>
                    </UserProvider>);
                </CategoriesProvider>
            </LanguageContext.Provider>
        );
        expect(screen.getByText('@2023 Lingua Books. All Rights Reserved.')).toBeInTheDocument();
        expect(screen.getByText('LINGUA BOOKS')).toBeInTheDocument();
    });
});
