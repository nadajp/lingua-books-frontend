import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

export const RolesContext = createContext();

export const useRoles = () => {
    return useContext(RolesContext);
};

const RolesProvider = ({ user, children }) => {
  const [isSeller, setIsSeller] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const data = { user: user.sub };
      
      axios.post('/api/getRoles', data).then((response) => {
        const rolesData = response?.data?.data || [];
        
        setIsSeller(rolesData.some(item => item.name === "seller"));
        setIsAdmin(rolesData.some(item => item.name === "admin"));
      }).catch(() => {
      }).finally(() => {
        setIsLoading(false); 
      });
    } else {
      setIsLoading(false); 
    }
  }, [user]);

  return (
    <RolesContext.Provider value={{ isSeller, isAdmin, isLoading }}>
      {children}
    </RolesContext.Provider>
  );
};

export default RolesProvider;
