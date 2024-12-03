import React, { ComponentType, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@/app/context/AuthContext";
import { ModuleRoutes } from "@/app/routes/routes";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { loggedUser, userData, loggingUser } = useContext(AuthContext);

    const isLoggedIn = (): boolean => {
      console.log("isLoggedIn check - loggedUser:", loggedUser, "userData:", userData);
      return loggedUser && !!userData;
    };

    useEffect(() => {
      console.log("withAuth useEffect - loggingUser:", loggingUser, "loggedUser:", loggedUser);
      if (!loggingUser && !loggedUser) {
        console.log("User not logged in, navigating to login");
        navigate(ModuleRoutes.Login); 
      }
    }, [loggingUser, loggedUser, navigate]);

    if (loggingUser) {
      console.log("Logging in progress, showing loading state");
      return <div>Cargando...</div>;
    }

    if (!isLoggedIn()) {
      console.log("User is not logged in or user data is missing, returning null");
      return null;
    }

    console.log("User is logged in, rendering component:", WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth;
