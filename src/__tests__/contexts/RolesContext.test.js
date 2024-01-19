import RolesProvider, {RolesContext, useRoles} from '../../contexts/RolesContext';
import { render, waitFor, screen, renderHook } from '@testing-library/react';
import axios from 'axios';
import { useContext } from 'react';

describe('useRoles hook', () => {
  it('should return the context values', () => {
    const testContextValue = {
      isSeller: true,
      isAdmin: false,
      isLoading: false
    };

    const wrapper = ({ children }) => (
      <RolesContext.Provider value={testContextValue}>
        {children}
      </RolesContext.Provider>
    );

    const { result } = renderHook(() => useRoles(), { wrapper });

    expect(result.current.isSeller).toBe(testContextValue.isSeller);
    expect(result.current.isAdmin).toBe(testContextValue.isAdmin);
    expect(result.current.isLoading).toBe(testContextValue.isLoading);
  });
});

jest.mock('axios');

describe('RolesProvider', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should set initial state of isSeller and isAdmin to false', () => {
      const mockUserData = {
        user: null,
        error: null,
        isLoading: false
      };

      render(
        <RolesProvider user={mockUserData.user}>
          <RolesContext.Consumer>
            {value => {
              expect(value.isSeller).toBe(false);
              expect(value.isAdmin).toBe(false);
            }}
          </RolesContext.Consumer>
        </RolesProvider>
      );
    });

    it('should render children components with correct RolesContext.Provider values', async() => {
        const mockUser= {
            name: 'Test User',
            sub: 'auth0|1234567890'
        };

        axios.post.mockResolvedValue({ status: 200, data: { data: [{ name: 'seller' }] } });

        const TestConsumer = () => {
            const { isSeller, isAdmin, isLoading } = useContext(RolesContext);
            if (isLoading) {
                return <div>Loading...</div>;
            }
            return (
                <div>
                    <span data-testid="isSeller">{isSeller.toString()}</span>
                    <span data-testid="isAdmin">{isAdmin.toString()}</span>
                </div>
            );
        };
        render(
            <RolesProvider user={mockUser}>
                <TestConsumer />    
            </RolesProvider>
        );

        waitFor(() => {
            expect(screen.getByText('Loading...')).not.toBeInTheDocument();
        });

        const isSeller = await screen.findByTestId('isSeller');
        const isAdmin = await screen.findByTestId('isAdmin');

        expect(axios.post).toHaveBeenCalledWith('/api/getRoles', { user: mockUser.sub });
        expect(isSeller.textContent).toBe('true');
        expect(isAdmin.textContent).toBe('false');
    });

    it('should set isLoading to false if user is null', async () => {
        const TestConsumer = () => {
            const { isLoading } = useContext(RolesContext);
            if (isLoading) {
                return <div>Loading...</div>;
            }
            return (
                <div>
                    <span data-testid="isLoading">{isLoading.toString()}</span>
                </div>
            );
        };
        render(
            <RolesProvider user={null}>
                <TestConsumer />    
            </RolesProvider>
        );

        waitFor(() => {
            expect(screen.getByText('Loading...')).not.toBeInTheDocument();
        });

        const isLoading = await screen.findByTestId('isLoading');
        expect(isLoading.textContent).toBe('false');
    });

    it('should set isSeller and isAdmin to false when call to getRoles fails', async() => {
        const mockUser= {
            name: 'Test User',
            sub: 'auth0|1234567890'
        };

        axios.post.mockRejectedValue(new Error('External API error'));

        const TestConsumer = () => {
            const { isSeller, isAdmin, isLoading } = useContext(RolesContext);
            if (isLoading) {
                return <div>Loading...</div>;
            }
            return (
                <div>
                    <span data-testid="isSeller">{isSeller.toString()}</span>
                    <span data-testid="isAdmin">{isAdmin.toString()}</span>
                </div>
            );
        };
        render(
            <RolesProvider user={mockUser}>
                <TestConsumer />    
            </RolesProvider>
        );

        waitFor(() => {
            expect(screen.getByText('Loading...')).not.toBeInTheDocument();
        });

        const isSeller = await screen.findByTestId('isSeller');
        const isAdmin = await screen.findByTestId('isAdmin');

        expect(axios.post).toHaveBeenCalledWith('/api/getRoles', { user: mockUser.sub });
        expect(isSeller.textContent).toBe('false');
        expect(isAdmin.textContent).toBe('false');
    });

    it('should set isSeller and isAdmin to false when getRoles returns an empty array', async() => {
        const mockUser= {
            name: 'Test User',
            sub: 'auth0|1234567890'
        };

        axios.post.mockResolvedValue({ status: 200, data: { data: [] } });

        const TestConsumer = () => {
            const { isSeller, isAdmin, isLoading } = useContext(RolesContext);
            if (isLoading) {
                return <div>Loading...</div>;
            }
            return (
                <div>
                    <span data-testid="isSeller">{isSeller.toString()}</span>
                    <span data-testid="isAdmin">{isAdmin.toString()}</span>
                </div>
            );
        };
        render(
            <RolesProvider user={mockUser}>
                <TestConsumer />    
            </RolesProvider>
        );

        waitFor(() => {
            expect(screen.getByText('Loading...')).not.toBeInTheDocument();
        });

        const isSeller = await screen.findByTestId('isSeller');
        const isAdmin = await screen.findByTestId('isAdmin');

        expect(axios.post).toHaveBeenCalledWith('/api/getRoles', { user: mockUser.sub });
        expect(isSeller.textContent).toBe('false');
        expect(isAdmin.textContent).toBe('false');
    });
});
