import React, { ComponentType, useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { ModuleRoutes } from "@/app/routes/routes";
import Loader from "@/shared/components/Loader/Loader";


const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const { loggedUser, userData, loggingUser, checkUserAuth } = useContext(AuthContext);

    useEffect(() => {
      if (!loggedUser && !loggingUser) {
        
        checkUserAuth();
      }
    }, [loggedUser, loggingUser, checkUserAuth]);

    if (loggingUser ) {
      
      return <Loader />;
    }

    if (!loggedUser || !userData) {
      
      window.location.href = ModuleRoutes.Login;
      return null;
    }
      
      return <WrappedComponent {...props} />;
    }

  return WithAuth;
};

export default withAuth;
