import { render, screen } from '@testing-library/react';
import UserLinks from '../../components/UserLinks';

jest.mock('@auth0/nextjs-auth0/client', () => ({
    useUser: jest.fn(),
}));

jest.mock('../../contexts/RolesContext', () => ({
    useRoles: jest.fn(),
}));

describe('UserLinks', () => {
    it('displays loading when user data is being fetched', () => {
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ isLoading: true });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({});

        render(<UserLinks />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays error message when there is an error', () => {
        const errorMessage = 'Error fetching user';
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ error: { message: errorMessage } });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({});

        render(<UserLinks />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('displays login link when user is not authenticated', () => {
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ user: null });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({});

        render(<UserLinks />);
        expect(screen.getByText('Login/Register')).toBeInTheDocument();
    });

    it('displays seller options for an authenticated seller', () => {
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ user: { name: 'Test User' } });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({ isSeller: true });

        render(<UserLinks />);
        expect(screen.getByText('Sell a book')).toBeInTheDocument();
    });

    it('prompts non-seller authenticated user to become a seller', () => {
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ user: { name: 'Test User' } });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({ isSeller: false });

        render(<UserLinks />);
        expect(screen.getByText('Become a Seller')).toBeInTheDocument();
    });
    it('displays admin panel link for administrators', () => {
        require('@auth0/nextjs-auth0/client').useUser.mockReturnValue({ user: { name: 'Test User' } });
        require('../../contexts/RolesContext').useRoles.mockReturnValue({ isAdmin: true });

        render(<UserLinks />);
        expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    });
});
