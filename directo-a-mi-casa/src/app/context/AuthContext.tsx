import React, { createContext, useState, ReactNode, useCallback } from "react";
import { getUserData } from "../services/auth/authService";
import { toast } from "react-toastify";
import { UserDataResponse } from "../domain/Auth";
import { ModuleRoutes } from "../routes/routes";
import { useNavigate } from "react-router-dom";

export interface AuthContextProps {
  loggedUser: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  setLoggingUser: (value: boolean) => void;
  userData: UserDataResponse | null;
  loggingUser: boolean;
  checkUserAuth: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  loggedUser: false,
  loginUser: () => { },
  logoutUser: () => { },
  userData: null,
  loggingUser: false,
  setLoggingUser: () => { },
  checkUserAuth: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState(false);
  const [loggingUser, setLoggingUser] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const navigate = useNavigate();

  const checkUserAuth = useCallback(async () => {

    setLoggingUser(true);
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        const fetchedUserData = await getUserData(accessToken);

        if (fetchedUserData) {
          setUserData(fetchedUserData);
          setLoggedUser(true);

        } else {
          throw new Error("Error retrieving user data");
        }
      } else {
        throw new Error("No se encontró un AccessToken");
      }
    } catch (error) {

      handleAuthError(error);
    } finally {
      setLoggingUser(false);

    }
  }, []);

  const handleAuthError = (error: any) => {
    if (error instanceof Error) {
      if (error.message.includes("Token Expired")) {
        localStorage.removeItem("accessToken");
        toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      } else if (error.message !== "No se encontró un AccessToken" && !isLoggingOut) {
        toast.error("Ha ocurrido un error de autenticación. Inténtalo nuevamente.");
      }
    }
    setUserData(null);
    setLoggedUser(false);
  };

  const loginUser = (token: string) => {

    localStorage.setItem("accessToken", token);
    setLoggedUser(true);
    setUserData(null);
    setLoggingUser(false);
    checkUserAuth();
    toast.success("Has iniciado sesión exitosamente!");
  };


  const logoutUser = () => {
    setIsLoggingOut(true);
    setLoggedUser(false);
    setUserData(null);
    localStorage.removeItem("accessToken");
    toast.info("Has cerrado sesión exitosamente!");
    setIsLoggingOut(false);
    navigate(ModuleRoutes.Home, { replace: true });
  };


  return (
    <AuthContext.Provider
      value={{ loggedUser, checkUserAuth, loggingUser, loginUser, logoutUser, setLoggingUser, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
