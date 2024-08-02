import React, { useContext } from 'react';
import { UserContext } from './ObtenertipoUsuario';
import { Navigate } from 'react-router-dom';

const UserTypeGuard = ({ allowedTypes, children }) => {
  const { userType } = useContext(UserContext);

  if (!allowedTypes.includes(userType)) {
    // Redirige al usuario a una página no autorizada o a la página de inicio
    return <Navigate to="/not-authorized" />;
  }

  return <>{children}</>;
};

export default UserTypeGuard;
