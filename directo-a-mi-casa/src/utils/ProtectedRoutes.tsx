import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '@/app/context/AuthContext';
import { ModuleRoutes } from '@/app/routes/routes';

const ProtectedRoutes = () => {
  const { loggedUser, userData } = useContext(AuthContext);

  if (!loggedUser || !userData) {
    return <Navigate to={ModuleRoutes.Login} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;