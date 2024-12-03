import React, { ComponentType, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import Loader from "@/shared/components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): React.FC<P> => {
  const WithAuth: React.FC<P> = (props) => {
    const { loggedUser, loggingUser, sessionValidated , checkUserAuth } = useContext(AuthContext);
    const [authChecked, setAuthChecked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const verifyAuth = async () => {
      if (!authChecked && !loggedUser && !sessionValidated) {
        await checkUserAuth();
        setAuthChecked(true);
      }  else if (loggedUser) {
        setAuthChecked(true);
      };
    }
    verifyAuth();
  }, [sessionValidated, authChecked, loggedUser, checkUserAuth]);
  

    useEffect(() => {
      if (authChecked && sessionValidated && !loggedUser) {
        navigate("/login", { replace: true });
      }
    }, [authChecked, sessionValidated, loggedUser, navigate]);

    if (loggingUser || !sessionValidated || !authChecked) {
      return <Loader />;
    }

    if (loggedUser) {
      return <WrappedComponent {...props} />;
    }
    return <Loader />;
  };

  return WithAuth;
};

export default withAuth;
