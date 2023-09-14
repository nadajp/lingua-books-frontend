import { createContext, useContext } from 'react';
import useFetch from '../../hooks/useFetch';

// Create a user context
const UserContext = createContext();

// User context provider
export const UserProvider = ({ children }) => {
  // Fetch user data using SWR
  const { userData: data, isLoading, error } = useFetch('users'); // Adjust the API endpoint

  return (
    <UserContext.Provider value={{ userData, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};
