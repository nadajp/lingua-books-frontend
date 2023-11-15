import { UserProvider } from '@auth0/nextjs-auth0/client';
import { render, screen, waitFor } from '@testing-library/react';
import RegistrationSuccess from '../../pages/stripe-registration-status';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "Test message" }),
  })
);

const mockUserData = {
  isLoading: false
};
describe('RegistrationSuccess', () => {
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
    });
  });
  
  it('displays the status message from API', async () => {
    render(
      <UserProvider value={mockUserData} >
          <RegistrationSuccess />
      </UserProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Test message/i)).toBeInTheDocument();
    });
  });

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
