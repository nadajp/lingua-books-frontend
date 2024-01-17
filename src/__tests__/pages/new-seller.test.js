import { render, screen, waitFor } from '@testing-library/react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import userEvent from '@testing-library/user-event';
import NewSellerForm from '../../pages/new-seller';

  const locationData = {
    country_code: 'US',
    area: 'FL',
    city_name: 'Miami'
};

const mockUserData = {
    user: {
        name: 'Test User',
        sub: 'auth0|1234567890',
        nickname: 'John'
    },
    error: null,
    isLoading: false
};

describe('NewSellerForm', () => {
   
    it('should render form with default values and allowed countries', async () => {
        render(
            <UserProvider value={mockUserData}>
                <NewSellerForm locationData={locationData} />
            </UserProvider>);
        
        waitFor(() => {
            expect(screen.getByLabelText('Seller Display Name:')).toHaveValue('John');
            expect(screen.getByLabelText('City:')).toHaveValue('Miami');
            expect(screen.getByLabelText('Select Country')).toHaveValue('US');
            expect(screen.getByLabelText('Select State')).toHaveValue('FL');
        });
    });

    it('should allow user to input display name, city, country and state', async () => {

      render(
        <UserProvider value={mockUserData}>
            <NewSellerForm locationData={locationData} />
        </UserProvider>);

        waitFor (() => {
            const displayNameInput = screen.getByLabelText('Seller Display Name:');
            const cityInput = screen.getByLabelText('City:');
            const countrySelect = screen.getByLabelText('Select Country');
            const stateSelect = screen.getByLabelText('Select State');

            userEvent.type(displayNameInput, 'John Doe');
            userEvent.type(cityInput, 'Toronto');
            userEvent.selectOptions(countrySelect, 'CA');
            userEvent.selectOptions(stateSelect, 'ON');

            expect(displayNameInput).toHaveValue('John Doe');
            expect(cityInput).toHaveValue('Toronto');
            expect(countrySelect).toHaveValue('CA');
            expect(stateSelect).toHaveValue('ON');
        });
    });

    it('should validate user input and display errors if necessary', async () => {
        render(
            <UserProvider value={mockUserData}>
                <NewSellerForm locationData={locationData} />
            </UserProvider>);

        waitFor(() => {
            const displayNameInput = screen.getByLabelText('Seller Display Name:');
            const cityInput = screen.getByLabelText('City:');
            userEvent.type(displayNameInput, '123');
            userEvent.type(cityInput, '123');

            userEvent.click(screen.getByText('Connect With Stripe'));

            expect(screen.getByText('Display name must be between 2 and 50 alphabetic characters.')).toBeInTheDocument();
            expect(screen.getByText('City name must be between 2 and 100 alphabetic characters.')).toBeInTheDocument();
        });
    });

    it('should display loading message while user is being authenticated', () => {
      render(
        <UserProvider value={mockUserData}>
            <NewSellerForm locationData={locationData} />
        </UserProvider>);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display error message if authentication fails', async () => {
        const mockUserData = {
            user: null,
            error: { message: 'Authentication failed' },
            isLoading: false
        };
    
        render(
            <UserProvider value={mockUserData}>
                <NewSellerForm locationData={locationData} />
            </UserProvider>);

        waitFor(() => {
            expect(screen.getByText('Authentication failed')).toBeInTheDocument();
        });
    });

    it('should display error message if Stripe API returns errors', async () => {
      jest.mock('axios', () => ({
        post: jest.fn(() => Promise.resolve({ data: { errors: { message: 'Stripe API error' } } }))
      }));

      render(
        <UserProvider value={mockUserData}>
            <NewSellerForm locationData={locationData} />
        </UserProvider>);

        waitFor(() => {
            userEvent.click(screen.getByText('Connect With Stripe'));
            expect(screen.getByText('Stripe API error')).toBeInTheDocument();
        });
    });
});
