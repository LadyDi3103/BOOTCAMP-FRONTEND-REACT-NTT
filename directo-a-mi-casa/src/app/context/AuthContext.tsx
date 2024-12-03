import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getUserData } from "../services/auth/authService";
import { toast } from "react-toastify";
import { UserDataResponse } from "../domain/Auth";
import { ModuleRoutes } from "../routes/routes";
import { useNavigate } from "react-router-dom";

interface AuthContextProps {
  loggedUser: boolean;
  loginUser: (token: string) => void;
  logoutUser: () => void;
  userData: UserDataResponse | null;
  loggingUser: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  loggedUser: false,
  loginUser: () => {},
  logoutUser: () => {},
  userData: { firstName: "", lastName: "" },
  loggingUser: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState(false);
  const [loggingUser, setLoggingUser] = useState(true);
  const [userData, setUserData] = useState<UserDataResponse | null>(null);
  const navigate = useNavigate();

  const checkUserAuth = async () => {
    try {
      setLoggingUser(true);
      const accessToken = localStorage.getItem("accessToken");
      console.log("Access token retrieved:", accessToken);
  
      if (accessToken) {
        console.log("Calling getUserData with token:", accessToken);
        const userData = await getUserData(accessToken);
        console.log("User data retrieved:", userData);
        if (userData) {
          setUserData(userData);
          setLoggedUser(true);
        } else {
          console.log("getUserData did not return valid user data");
          throw new Error("Error retrieving user data");
        }
      } else {
        console.log("No se encontró un AccessToken, usuario no autenticado");
        throw new Error("No se encontró un AccessToken");
      }
    } catch (error) {
      console.log("Error in checkUserAuth:", error);
      if (error instanceof Error) {
        if (error.message.includes("Token Expired")) {
          localStorage.removeItem("accessToken");
          toast.error("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        } else if (error.message !== "No se encontró un AccessToken") {
          toast.error("Ha ocurrido un error de autenticación. Inténtalo nuevamente.");
        }
        setUserData(null);
        setLoggedUser(false);
      }
    } finally {
      setLoggingUser(false);
      console.log("Logging user status:", loggingUser);
    }
  };
  
  const loginUser = (accessToken: string) => {
    console.log("Login user function called with token:", accessToken);
    localStorage.setItem("accessToken", accessToken);
    console.log("Access token stored:", localStorage.getItem("accessToken")); // Verificar que el token se guarde
    setLoggedUser(true);
    setTimeout(() => {
      navigate(ModuleRoutes.MarketPage);
    }, 0);
  };

  const logoutUser = () => {
    console.log("Logout user function called");
    localStorage.removeItem("accessToken");
    setLoggedUser(false);
    setUserData(null);
    navigate(ModuleRoutes.Login);
  };

  useEffect(() => {
    if (!loggedUser) {
      console.log("checkUserAuth called in useEffect");
      checkUserAuth();
    }
  }, [loggedUser]);

  return (
    <AuthContext.Provider
      value={{ loggedUser, loginUser, logoutUser, loggingUser, userData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
