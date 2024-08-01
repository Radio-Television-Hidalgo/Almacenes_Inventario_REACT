import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState('Cargando...'); 

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch('/api/usuario/infoUsuario');
        const data = await response.json();
        setUserType(data.type);
      } catch (error) {
        console.error('Error fetching user type:', error);
        setUserType('error'); 
      }
    };

    fetchUserType();
  }, []);

  return (
    <UserContext.Provider value={{ userType }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserProvider };
