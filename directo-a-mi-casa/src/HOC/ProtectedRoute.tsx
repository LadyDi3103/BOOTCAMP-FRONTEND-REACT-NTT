import { AuthContext } from '@/app/context/AuthContext';
import { ModuleRoutes } from '@/app/routes/routes';
import React, { useState, useEffect, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';


type ProtectedRouteProps = {
    ProtectedComponent: ReactNode;
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ProtectedComponent }) => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);
  
    if (!authContext) {
      throw new Error("AuthContext no está disponible");
    }
  
    const { loggedUser, checkingLoggedUser } = authContext;
    const [requestedPath, setRequestedPath] = useState<string | null>(null);
  
    useEffect(() => {
      if (navigate?.asPath && navigate.asPath.includes('?')) {
        setRequestedPath(navigate.asPath);
      }
    }, [navigate]);
  
    useEffect(() => {
      if (!checkingLoggedUser && !loggedUser) {
        navigate(ModuleRoutes.Home);
      }
    }, [checkingLoggedUser, loggedUser, navigate]);
  
    return loggedUser ? <>{ProtectedComponent}</> : null;
  };
  
  export default ProtectedRoute;
  