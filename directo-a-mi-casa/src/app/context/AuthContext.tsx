import React, { createContext, useState, ReactNode, useEffect } from "react";
import { getUserData } from "../services/auth/authService";
import { toast } from "react-toastify";
import { UserDataResponse } from "../domain/Auth";
import { ModuleRoutes } from "../routes/routes";
import { useNavigate } from "react-router-dom";


 interface AuthState  {
  loggedUser: boolean;
  userData: UserDataResponse | null;
  loggingUser: boolean;
  sessionValidated: boolean;
}

const initialAuthState: AuthState = {
  loggedUser: false,
  userData: null,
  loggingUser: false,
  sessionValidated: false,
};

export interface AuthContextProps extends AuthState {
  loginUser: (token: string) => Promise<void>;
  logoutUser: () => void;
  checkUserAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  ...initialAuthState,
  loginUser: async () => {},
  logoutUser: () => {},
  checkUserAuth: async () => {},
});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>(initialAuthState);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        await checkUserAuth();
      } else {
        setState((prev) => ({ ...prev, sessionValidated: true }));
      }
    };
    initAuth();
  }, []);


  const checkUserAuth = async () => {

    if (state.loggingUser || state.sessionValidated || isFetching) {
      return;
    }

    setIsFetching(true);
    setState((prev) => ({ ...prev, loggingUser: true }));

    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        setState({ ...initialAuthState, sessionValidated: true });
        return;
      }

      const fetchedUserData = await getUserData(accessToken);
      if (fetchedUserData) {
        setState({
          loggedUser: true,
          userData: fetchedUserData,
          loggingUser: false,
          sessionValidated: true,
        });
      } else {
        throw new Error("Error retrieving user data");
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setState((prev) => ({ ...prev, loggingUser: false }));
      setIsFetching(false);
    }
  };

  const handleAuthError = (error: unknown) => {
    setState({ ...initialAuthState, sessionValidated: true });
    localStorage.removeItem("accessToken");

    if (error instanceof Error) {
      if (error.message.includes("Token Expired")) {
        toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        navigate(ModuleRoutes.Login, { replace: true });
      } else {
        toast.error("Ha ocurrido un error de autenticación. Inténtalo nuevamente.", { toastId: "authError" });
      }
    }
  };

  const loginUser = async (token: string) => {
    if (isFetching) return;
    setIsFetching(true);

    localStorage.setItem("accessToken", token);
    try {
      const fetchedUserData = await getUserData(token);
      if (fetchedUserData) {
        setState({
          loggedUser: true,
          userData: fetchedUserData,
          loggingUser: false,
          sessionValidated: true,
        });
        toast.success("Has iniciado sesión exitosamente!", { toastId: "loginSuccess" });
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsFetching(false);
    }
  };


  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    setState(initialAuthState);
    toast.info("Has cerrado sesión.");
    navigate(ModuleRoutes.Home, { replace: true });
  };

  return (
    <AuthContext.Provider
    value={{
      ...state,
      loginUser,
      logoutUser,
      checkUserAuth,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};
