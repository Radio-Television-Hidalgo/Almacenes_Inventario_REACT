import  { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const fetchUserType = async () => {
      const response = await fetch('/api/usuario/infoUsuario');
      const data = await response.json();
      setUserType(data.type);
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

