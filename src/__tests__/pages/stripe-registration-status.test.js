import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render, screen, waitFor } from '@testing-library/react';
import RegistrationSuccess from '../../pages/stripe-registration-status';
import { useRouter } from 'next/router';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Test message", shouldRedirect: true }),
  })
);

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUserData = {
  isLoading: false
};
describe('Registration success', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render component with mock user data and display "Registration Successful!" message', async () => {   
    render(
        <UserProvider value={mockUserData} >
            <RegistrationSuccess />
        </UserProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Registration Successful!')).toBeInTheDocument();
      expect(screen.getByText(/Checking your account status/i)).toBeInTheDocument();
    });
  });
  
  it('should display "Loading..." message while API call is in progress', async () => {
    render(
      <UserProvider value={mockUserData}>
        <RegistrationSuccess />
      </UserProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should redirect to "/add-new-product" after successful API call', async () => {
    const pushMock = jest.fn();
    useRouter.mockReturnValueOnce({ push: pushMock });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Test message", shouldRedirect: true}),
      })
    );
    render(
      <UserProvider value={mockUserData}>
        <RegistrationSuccess />
      </UserProvider>
    );
    waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/add-new-product');
    });
  });
});

describe('Registation failure scenarios', () => {
  it('handles API errors correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('API error'))
    );
    render(
      <UserProvider value={mockUserData} >
          <RegistrationSuccess />
      </UserProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/There was an error checking your account status./i)).toBeInTheDocument();
    });
  });
});
